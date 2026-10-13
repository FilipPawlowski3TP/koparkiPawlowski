# Deployment — Koparki Pawłowski

Stan: **wdrożone produkcyjnie** (Cloudflare Workers z Git, domena podpięta, Resend
skonfigurowany). Poniżej pełna procedura i uwagi utrzymaniowe.

## Wybrany hosting: Cloudflare Pages (plan Free)

| Kryterum | Cloudflare Pages | Vercel | Netlify |
|---|---|---|---|
| Koszt (strona firmowa) | 0 zł | Hobby zabroniony komercyjnie (ToS); Pro $20/mies. | 0 zł (kredyty) |
| Pasmo / zapytania | nielimitowane | 100 GB/mies. (Hobby) | licznik kredytów; brak kredytów = **wyłączenie strony** |
| Funkcje serwerowe (formularz) | Pages Functions (Workers) | Serverless | Functions |
| Przekierowania / nagłówki | `_redirects`, `_headers` | tak | tak |
| Analityka bez cookies | Cloudflare Web Analytics (free) | — | — |
| Zależność od dostawcy | niska (statyczny HTML) | niska | niska |

Wybór uzasadniony: brak opłat i limitów ruchu, brak zakazu komercyjnego, natywne wsparcie
dla statycznego wyjścia Astro + Functions dla formularza. W razie potrzeby migracji —
produkt to statyczny HTML, działa na każdym hostingu.

## Struktura repozytorium

```
plandzialania.md      — nadrzędna specyfikacja (status na końcu)
docs/                 — audyt, strategia SEO, architektura, design system, deployment, testy
src/                  — Astro: strony, komponenty, style, dane serwisu (site.config.mjs)
functions/api/        — Cloudflare Pages Function: endpoint formularza
public/               — robots.txt, _redirects, _headers, favicon.svg
dist/                 — build produkcyjny (generowany, nie commitowany)
```

## Uwaga: typ wdrożenia — Workers vs Pages (WAŻNE)

Strona działa jako **Cloudflare Worker z zasobami statycznymi** (Workers Builds z Git,
adres `koparkipawlowski.*.workers.dev` + domena własna). W takim wdrożeniu katalog
`functions/` (konwencja Cloudflare Pages) **nie jest używany** — dlatego dodano:

- `worker/index.js` — router: `/api/kontakt` (POST) → wspólna logika z
  `functions/api/kontakt.js`, wszystko inne → zasoby statyczne (`dist/`);
- `wrangler.jsonc` — konfiguracja wdrożenia (main + assets + obsługa 404).

Dzięki temu ten sam kod działa w obu scenariuszach: przy wdrożeniu Pages katalog
`functions/` działa sam z siebie, przy wdrożeniu Workers router z `worker/index.js`.

Zmienne środowiskowe (Workers: Settings → **Runtime variables and secrets → Production**):
`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`. **Po zmianie zmiennych wykonaj nowe
wdrożenie** (Deploy → Retry/Redeploy) — zmienne są wiązane przy wdrożeniu.

Weryfikacja po wdrożeniu: `POST /api/kontakt` z poprawnymi danymi powinien zwrócić
JSON `{"ok":true}` i dostarczyć e-mail (przy braku klucza — 503; przy błędzie Resend — 502).

## Procedura wdrożenia krok po kroku (od zera)

1. **Konto Cloudflare** (wymaga właściciel — darmowe): https://dash.cloudflare.com/sign-up
2. **Repozytorium Git** (np. GitHub, prywatne) — wypchnąć zawartość projektu.
3. **Cloudflare Pages → Create project → Connect to Git** — wskazać repozytorium.
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Functions: Cloudflare automatycznie wykrywa katalog `functions/` w repozytorium.
4. **Domena** — w projekcie Pages: Custom domains → `koparkapawlowski.pl` i
   `www.koparkapawlowski.pl`. Jeśli domena jest w DNS Cloudflare — rekordy tworzą się
   automatycznie. Jeśli jest u innego rejestratora — właściciel zmienia NS na Cloudflare
   LUB dodaje rekordy CNAME wskazujące na `koparkapawlowski.pl` wg instrukcji w panelu
   (zmiana DNS = działanie właściciela, uzgodnione przed wykonaniem).
5. **HTTPS** — włączany automatycznie (Universal SSL).
6. **Zmienne środowiskowe** (Project → Settings → Environment variables):
   - `RESEND_API_KEY` — klucz API z https://resend.com (plan Free: 3000 e-maili/mies.)
   - `CONTACT_TO` = `piotrpawlowski1979@gmail.com`
   - `CONTACT_FROM` = `Formularz kontaktowy <noreply@koparkapawlowski.pl>`
   - Uwaga: w Resend trzeba zweryfikować domenę (rekordy DNS) dla adresu nadawcy.
7. **Weryfikacja po wdrożeniu** (checklista poniżej).
8. **Google Search Console** — dodać domenę, przesłać `sitemap-index.xml`.
9. **Profil Firmy w Google** — założyć/uzupełnić, podpiąć stronę (patrz docs/strategia-seo.md).

## Migracja ze starej strony (Google Sites)

- Stara strona nie ma `sitemap.xml`/`robots.txt` i bliskiej zeru widoczności (docs/audyt.md),
  więc ryzyko utraty ruchu jest niskie, ale:
- Plik `public/_redirects` kieruje `/strona-główna` (i warianty) → `/` (301).
- **Przed przełączeniem DNS**: wyeksportować/odnotować zawartość starej strony (archiwum),
  sprawdzić w Google Search Console starej usługi (jeśli istnieje), czy są zaindeksowane
  URL-e wymagające przekierowań.
- Przełączenie DNS = ostatni krok, po pełnej weryfikacji nowej strony.

## Checklista po wdrożeniu

- [ ] `https://www.koparkapawlowski.pl/` ładuje się z poprawnym certyfikatem
- [ ] Przekierowanie `http→https` i `bez www → www` (lub odwrotnie — przyjęte: www)
- [ ] `/strona-główna` → 301 → `/`
- [ ] `/sitemap-index.xml` i `/robots.txt` dostępne
- [ ] Formularz: test end-to-end z realnym RESEND_API_KEY (wiadomość dochodzi na skrzynkę)
- [ ] Kliknięcie telefonu otwiera wybieranie numeru na telefonie
- [ ] Search Console: zweryfikowana, sitemap przesłany
- [ ] Strona 404 wyświetla się dla nieistniejących adresów

## Aktualizacje i rollback

- Aktualizacja: `git push` → automatyczny build i deploy w Cloudflare Pages.
- Rollback: Cloudflare Pages → Deployments → przy wybranym wdrożeniu „Rollback to this
  deployment" (poprzednie wersje przechowywane).
- Każde wdrożenie ma własny adres podglądu (`*.pages.dev`) do testów przed produkcją.

## Utrzymanie

- Zależności: `npm outdated` raz na kwartał, aktualizacje Astro przez `npm update`.
- Logi: Cloudflare Pages → Functions (logi endpointu formularza).
- Kopie zapasowe: repozytorium Git jest źródłem prawdy; statyczny build odtwarzalny zawsze
  przez `npm run build`.
- Monitoring: Cloudflare Web Analytics (po włączeniu) + ewentualnie zewnętrzny uptime
  monitor (opcjonalnie).

## Przewidywane koszty

- Hosting: **0 zł** (Cloudflare Pages Free).
- Domena: koszt rejestracji/odnowienia zależny od rejestratora (typowo 50–120 zł/rok).
- Resend Free: 3000 e-maili/mies. — wystarczające.
- Opcjonalnie: żadnych wymaganych usług płatnych.
