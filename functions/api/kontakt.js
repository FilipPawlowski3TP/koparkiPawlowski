// Cloudflare Pages Function — endpoint formularza kontaktowego.
// Wysyłka e-mail przez Resend (https://resend.com), wymaga zmiennych środowiskowych:
//   RESEND_API_KEY  — klucz API Resend
//   CONTACT_TO      — adres odbiorcy (domyślnie: piotrpawlowski1979@gmail.com)
//   CONTACT_FROM    — nadawca z zweryfikowanej domeny (domyślnie: Formularz <noreply@koparkapawlowski.pl>)
//
// Zabezpieczenia: walidacja po stronie serwera, pułapka na boty (pole "firma"),
// pułapka czasowa (formularz wysłany szybciej niż 3 s od załadowania = bot),
// limity długości pól.

const DEFAULT_TO = 'piotrpawlowski1979@gmail.com';
const DEFAULT_FROM = 'Formularz kontaktowy <noreply@koparkapawlowski.pl>';

const PHONE_RE = /^[+0-9][0-9 .\-()]{5,19}$/;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/\r/g, '').trim().slice(0, max);
}

export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch {
    return json(400, { ok: false, error: 'Nieprawidłowy format danych.' });
  }

  // Pułapka na boty — pole niewidoczne dla ludzi musi być puste.
  if (clean(body.firma, 200) !== '') {
    return json(200, { ok: true });
  }

  // Pułapka czasowa — formularz musi "odleżeć" minimum 3 sekundy.
  const t = Number(body.t);
  if (!Number.isFinite(t) || Date.now() - t < 3000 || Date.now() - t > 6 * 60 * 60 * 1000) {
    return json(400, { ok: false, error: 'Formularz wysłany zbyt szybko. Odśwież stronę i spróbuj ponownie.' });
  }

  // Walidacja
  const phone = clean(body.phone, 30);
  const name = clean(body.name, 100);
  const location = clean(body.location, 200);
  const message = clean(body.message, 2000);
  const consent = body.consent === true;

  const problems = [];
  if (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 9) problems.push('telefon');
  if (message.length < 10) problems.push('opis prac');
  if (!consent) problems.push('zgoda');
  if (problems.length > 0) {
    return json(400, { ok: false, error: 'Uzupełnij wymagane pola: ' + problems.join(', ') + '.' });
  }

  const apiKey = context.env?.RESEND_API_KEY;
  const to = context.env?.CONTACT_TO || DEFAULT_TO;
  const from = context.env?.CONTACT_FROM || DEFAULT_FROM;

  if (!apiKey) {
    // Brak skonfigurowanej wysyłki — uczciwy komunikat zamiast cichej straty zapytań.
    return json(503, { ok: false, error: 'unavailable' });
  }

  const text = [
    'Nowe zapytanie ze strony koparkapawlowski.pl',
    '',
    'Telefon: ' + phone,
    'Imię: ' + (name || '—'),
    'Lokalizacja prac: ' + (location || '—'),
    '',
    'Opis prac:',
    message
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: 'Zapytanie ze strony — ' + (location || 'Wrocław i okolice'),
        text
      })
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('Resend error', res.status, detail.slice(0, 300));
      return json(502, { ok: false, error: 'Nie udało się wysłać wiadomości.' });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error('Contact endpoint error', err);
    return json(502, { ok: false, error: 'Nie udało się wysłać wiadomości.' });
  }
}
