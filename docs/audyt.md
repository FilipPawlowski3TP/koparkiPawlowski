# AUDYT — Koparki Pawłowski

Data researchu: 2026-10-13 (CEST). Źródła: koparkapawlowski.pl (web_extract), Bing (przeglądarka), wyszukiwarka web (Firecrawl/Exa: Google-like SERP), strony konkurentów (minikoparkawro.pl, wiltech-robotyziemne.pl, pakop.pl i in.), dokumentacja hostingu.

## 1. Potwierdzone informacje o firmie (FAKT — ze starej strony)

- Nazwa: Koparki Pawłowski.
- Oferta wg starej strony: **usługi minikoparką do 2 ton wraz z operatorem**, teren: Wrocław i okolice.
- Wymienione prace: kopanie fundamentów, wykopy pod kanalizacje, równanie terenu, korytowanie, „oraz wszelkie prace ziemne".
- Kontakt: e-mail piotrpawlowski1979@gmail.com. **Brak numeru telefonu na stronie.**
- Godziny: Pn–Pt 7:30–20:30, Sob 8:00–18:30, Ndz nieczynne.
- Adres siedziby: nie podano. Nie wiadomo, czy firma przyjmuje klientów stacjonarnie.

## 2. Stan starej strony (OBSERWACJA)

- Platforma: **Google Sites** (obrazy serwowane z googleusercontent), jedna strona pod adresem `https://www.koparkapawlowski.pl/strona-główna`.
- Brak `sitemap.xml` i `robots.txt` (HTTP 404) — Google Sites ich nie udostępnia.
- `site:koparkapawlowski.pl` w dostępnej wyszukiwarce: 0 wyników. Zapytanie „koparkapawlowski" i „koparki pawłowski" w Bing: 0 trafień dla firmy (same wyniki ogólne/branżowe).
- **Wniosek (OBSERWACJA z ograniczeniem):** stara strona ma bliskie zeru widoczności w badanych indeksach. Ograniczenie: Google i Bing mogły nie zaindeksować strony, mimo że istnieje; potwierdzenie wymaga dostępu do Google Search Console właściciela (brak).
- Wartość SEO do zachowania: niska, ale **domenę i tak trzeba migrować ostrożnie** (przekierowania 301 ze starych URL-i, zachowanie domeny koparkapawlowski.pl).

## 3. Rynek i konkurencja (Wrocław, minikoparka / roboty ziemne)

Charakter SERP (dla fraz „usługi koparką Wrocław", „usługi minikoparką Wrocław", „prace ziemne Wrocław"):
- Agregatory: OLX, Oferteo, Panoramafirm, Favore, wypozycz.online.
- Lokalne firmy z własnymi stronami: wiltech-robotyziemne.pl (minikoparki + koparka Hitachi 17 t, osobne podstrony usług, blog), pakop.pl (od 1997, duży park maszynowy, przyłącza wod-kan), minikoparkawro.pl, koparki-digger.com.pl, martrans-wroc.pl, wynajemkoparek.eu (Irpol), koparki365.pl (ogólnopolskie).

Benchmark — minikoparkawro.pl (najbliższy profil: minikoparka z operatorem, Wrocław):
- stawka **od 130 zł/h netto** podana na stronie, maszyna Yanmar SV18/V19;
- telefon jako główne CTA (klikalny tel:), WhatsApp, formularz wyceny z honeypotem;
- 16 opinii Google w widgetach Trustindex, polityka prywatności, banner cookies;
- realne zdjęcia maszyny i realizacji.

Rynkowe widełki stawek (za agregatorami i porównywarkami, nie są to dane firmy): minikoparka z operatorem **120–160 zł/h netto** (wypozycz.online: 120 zł/h; minikoparkawro.pl: od 130 zł/h; cenniki regionalne ~150–300 zł/h), koparko-ładowarka ~230–250 zł/h (kb.pl). HIPOTEZA: konkurenci zdobywają zapytania przez cennik orientacyjny i opinie Google — warto to odwzorować, jeśli właściciel potwierdzi stawki.

## 4. Braki danych wymagające odpowiedzi właściciela (P0/P1)

1. Numer telefonu kontaktowego (strona nastawiona na telefony nie ma numeru!) — P0.
2. Potwierdzony zakres usług i sprzęt (marka/waga minikoparki, osprzęt) — P0.
3. Konkretny obszar działania (miejscowości / promień km) — P1.
4. Ceny: czy publikować orientacyjny cennik (stawka godzinowa, min. zlecenie, dojazd) — P1.
5. Dane firmy do stopki i danych strukturalnych: NIP/pełna nazwa, czy istnieje adres siedziby (service-area business w GBP), potwierdzenie godzin otwarcia — P1.
6. Prawdziwe zdjęcia (maszyna, realizacje) i logo — P1 (priorytet dla art direction i autentyczności).
7. Dostępy: Google Search Console / Analytics starej strony, konto Google do Profilu Firmy w Google, rejestrator domeny (DNS) — P1.

## 5. Ryzyka migracji

- Niska widoczność = niskie ryzyko utraty ruchu, ale: brak danych z GSC = nieznana historia (oznaczone jako NIEZWERYFIKOWANE).
- Konieczne: przekierowania 301 ze starych URL-i Google Sites, zachowanie domeny, brak indeksowania środowiska staging.
- Profil Firmy w Google (jeśli istnieje) musi wskazywać nową stronę — weryfikacja po stronie właściciela.

## 6. Rekomendowane działania

- P0: zebrać numer telefonu i potwierdzony zakres usług (blokuje treści i konwersję).
- P1: nowy serwis statyczny (patrz docs/), migracja domeny z przekierowaniami, wdrożenie GBP (service-area), konfiguracja pomiaru kliknięć tel:.
- P2: cennik orientacyjny, sekcja realizacji ze zdjęciami, FAQ.
- P3: blog/poradnik (tylko przy realistycznym planie publikacji).
