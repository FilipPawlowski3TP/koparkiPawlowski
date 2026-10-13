# Testy — Koparki Pawłowski

Data testów: 2026-10-13 (iteracja 1 i 2). Środowisko: Windows 11, Node 26.7, build Astro 5.x,
przeglądarka Chromium (CDP), runtime Cloudflare (`wrangler dev`). Wszystkie wyniki poniżej
pochodzą z faktycznie wykonanych testów.

## 1. Build

- `npm run build` — **11 stron + sitemap-index.xml**, bez błędów (1.87 s / 0.81 s).
- Weryfikacja struktury HTML (dist): każda strona ma dokładnie 1× `<h1>`, 1× canonical,
  1× meta description, 1× `<title>` — potwierdzone dla 11/11 plików.

## 2. Funkcjonalność (przeglądarka, http://127.0.0.1:4321)

| Test | Wynik |
|---|---|
| Wszystkie 14 URL-i zwraca HTTP 200 (strony, sitemap, robots, favicon) | PASS |
| Linki `tel:` — 6 wystąpień na stronie głównej, format `tel:+48792611777` | PASS |
| FAQ (`details/summary`) otwiera się po kliknięciu | PASS |
| Menu mobilne (hamburger): otwieranie/zamykanie, aria-expanded | PASS |
| Mobilny pasek „Zadzwoń" widoczny na mobile, ukryty na desktopie | PASS |
| Brak poziomego przewijania na mobile (390 px): overflow = 0 | PASS |
| Formularz: pusty submit blokuje wysyłkę, 3 komunikaty błędów (telefon, opis, zgoda) | PASS |
| Formularz: poprawne dane → komunikat statusu (brak endpointu w preview = komunikat błędu) | PASS |
| Strona 404 dla nieistniejącego adresu (nagłówek + CTA) | PASS |
| Fokus klawiatury: kolejność logiczna (skip-link → logo → nav → CTA), outline 3 px | PASS |

## 3. Endpoint formularza `/api/kontakt`

Testy logiki funkcji (Node harness, 6 przypadków) + runtime Cloudflare Pages
(`wrangler pages dev`, 5 żądań HTTP):

| Przypadek | Oczekiwanie | Wynik |
|---|---|---|
| Nieprawidłowy JSON | 400 | PASS (400, komunikat) |
| Honeypot wypełniony | 200 bez zdradzania bota | PASS (200 {"ok":true}) |
| Pułapka czasowa (< 3 s / data z przyszłości) | 400 | PASS (400 „zbyt szybko") |
| Walidacja: zły telefon, krótki opis, brak zgody | 400 z listą pól | PASS |
| Brak `RESEND_API_KEY` | 503 (uczciwy brak wysyłki) | PASS (503 „unavailable") — runtime Pages |
| Realne wywołanie API Resend (fałszywy klucz) | integracja wykonana, błąd obsłużony | PASS (Resend zwrócił 401 „API key is invalid", funkcja zwróciła 502 z komunikatem) |
| GET na endpoint | brak obsługi | PASS (404) |

**NIEZWERYFIKOWANE**: dostarczenie e-maila do skrzynki odbiorczej — wymaga prawdziwego
`RESEND_API_KEY` (konfiguracja po stronie właściciela, krok w docs/deployment.md).

## 4. Runtime Cloudflare Pages (`wrangler pages dev`)

- `_redirects`: `/strona-glowna` → **301** → `/` — PASS.
- `_headers`: CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy
  obecne w odpowiedzi — PASS.
- Ścisłe CSP (`script-src 'self'`) + działający JS: menu i formularz działają, 0 naruszeń
  CSP w konsoli — PASS (po wymuszeniu zewnętrznych skryptów/stylów w konfiguracji Astro —
  wykryty i naprawiony problem inline `<script>`/`<style>` blokowanych przez CSP).

## 5. Dostępność (axe-core 4.10.2, wszystkie 10 stron + 404)

- Pierwszy audyt: 6 naruszeń `color-contrast` (przyciski terakota: 4.28–3.44 < 4.5) →
  naprawione (przyciemnienie `--clay`, poprawa specyficzności stylu nagłówka).
- Po poprawkach: **0 naruszeń na wszystkich stronach**.

## 6. Wydajność (Performance API — laboratoryjnie, localhost, bez throttlingu)

Lighthouse CLI niedostępny w środowisku (brak uruchamialnego headless Chrome/Edge,
zabezpieczony port CDP) — zamiast tego pomiary Navigation/Resource Timing i
PerformanceObserver w prawdziwej przeglądarce:

| Metryka | `/` | `/kontakt/` | Cel CWV |
|---|---|---|---|
| TTFB | 3 ms | 3 ms | — |
| FCP | 144 ms | 44 ms | — |
| LCP | 144 ms | 44 ms | ≤ 2,5 s |
| CLS | 0.001 | 0 | ≤ 0,1 |
| Żądania | 5 | 4 | — |
| Transfer | 77 KB | 5 KB | — |

Uwaga: pomiary lokalne bez opóźnień sieci — potwierdzają niską wagę strony (1 font
self-hosted, 0 obrazów rastrowych, brak frameworka JS). Rzeczywiste wyniki terenowe
(CrUX) będą dostępne po wdrożeniu; **nie deklaruję spełnienia progów CWV na podstawie
samego testu laboratoryjnego**.

## 7. Weryfikacja wizualna (zrzuty + analiza obrazu)

- Desktop (1264 px, pełna strona) i mobile (390 × 844): layout spójny, bez nachodzeń,
  ucięć i pustych sekcji; rysunki techniczne czytelne; hierarchia typograficzna wyraźna.
- Poprawki po wizualnej kontroli: mocniejszy kontrast kreskowania w rysunkach (czytelność
  na małych ekranach).

## 8. Czego nie testowano / braki

- **Wysyłka e-maila end-to-end** — wymaga klucza Resend (patrz wyżej); po konfiguracji
  klucza na produkcji do ponownej weryfikacji.
- **Lighthouse** — narzędzie niedostępne w środowisku (zastąpiono pomiarami Performance API).
- **Testy na fizycznych urządzeniach** — emulacja viewportów (390/768/1264 px), nie realne
  telefony.
- **Dane terenowe CWV, indeksacja Google, pozycje** — wymagają wdrożenia i Search Console.
- **Responsywność ekranów 320 px** — sprawdzona szerokość 390 px; 320 px do kontroli po
  wdrożeniu (układ jednokolumnowy, brak elementów o stałej szerokości — ryzyko niskie).

## 9. Iteracja 2 — zdjęcia realizacji + router formularza dla wdrożenia Workers (2026-10-13)

**Diagnoza produkcji:** `POST /api/kontakt` na żywo zwracał 404 — strona jest wdrożona jako
Cloudflare Worker (Workers Builds), który ignoruje katalog `functions/`. Dodano adapter
`worker/index.js` + `wrangler.jsonc` (wspólna logika z `functions/api/kontakt.js`).

| Test | Wynik |
|---|---|
| `wrangler dev` (ten sam runtime co produkcja): GET `/` | PASS (200) |
| GET `/realizacje/` | PASS (200) |
| GET `/api/kontakt` | PASS (405 JSON „Metoda niedozwolona.") |
| POST `/api/kontakt` — honeypot | PASS (200 {"ok":true}) |
| POST `/api/kontakt` — poprawne dane bez klucza | PASS (503 „unavailable" — logika działa) |
| GET nieistniejący adres | PASS (404 ze stroną błędu) |
| Build: 12 stron (nowa `/realizacje/`) | PASS |
| Zdjęcia: 9 plików WebP + og:image, lazy loading | PASS (9/9 ładuje się po scrollu) |
| Wizualnie: galeria + strona główna (desktop, pełna strona) | PASS — spójne z paletą, brak usterek układu |
| axe-core: /realizacje/, /, 2 podstrony usług | PASS (0 naruszeń) |
| `interest-cohort` w Permissions-Policy (ostrzeżenie w konsoli) | NAPRAWIONE — usunięty przestarzały feature |

**NIEZWERYFIKOWANE:** dostarczenie e-maila po ustawieniu `RESEND_API_KEY` na produkcji
(do testu po wdrożeniu — formularz musi zwrócić {"ok":true} i wiadomość musi dotrzeć
na skrzynkę).
