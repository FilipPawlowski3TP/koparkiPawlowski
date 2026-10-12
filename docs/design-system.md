# Design system — Koparki Pawłowski

## Kierunek artystyczny: „Przekrój"

Rysunek techniczny robót ziemnych na ciepłym papierze. Charakter: solidny, konkretny,
techniczny — bez generycznych gradientów, szkła, identycznych kart i animacji. Motyw
przewodni: linie wymiarowe, kreskowanie gruntu, etykiety monospace, numerowane sekcje,
stopka jako „tabliczka rysunkowa".

## Paleta

| Token | HEX | Zastosowanie |
|---|---|---|
| `--paper` | `#f4efe6` | tło główne (ciepły papier) |
| `--paper-deep` | `#ebe3d4` | sekcje alternatywne |
| `--ink` | `#211c17` | tekst główny, sekcje ciemne, przyciski ghost |
| `--ink-soft` | `#5d554a` | tekst pomocniczy (kontrast AA na papierze) |
| `--line` | `#c9bfae` | linie i obramowania |
| `--line-strong` | `#a89b86` | obramowania mocniejsze |
| `--clay` | `#ab4d26` | akcent: CTA, linie wymiarowe, focus (kontrast AA z tekstem papierowym) |
| `--clay-dark` | `#8f3f1f` | hover, linki tekstowe, etykiety |
| `--clay-tint` | `#f0e0d3` | tło akcentowe (hover wierszy) |

Kontrast: wszystkie pary tekst/tło ≥ 4.5:1 (AA) — zweryfikowane axe-core, 0 naruszeń.

## Typografia

- **Archivo Variable** (self-hosted, fontsource) — nagłówki (700, tracking ujemny) i tekst.
- **Monospace systemowy** (ui-monospace) — etykiety sekcji, numery, linie wymiarowe,
  przyciski (uppercase, tracking +0.08em).
- Skala plynna (clamp): `--step--1` … `--step-5`; H1 ≈ 2.45–3.9rem, tekst 1.02–1.15rem.
- Interlinia tekstu: 1.65; nagłówków: 1.12.

## Skala odstępów i siatka

- Odstępy: 0.35 / 0.7 / 1.15 / 1.8 / 2.8 / 4.2 / 6.2 rem (`--sp-1…7`).
- Kontener: max 74rem, margines boczny 1.125rem.
- Układy: `grid-2` (1:1 od 56rem), `grid-2--wide-left` (1.25:1), `steps` (4 kolumny od 56rem),
  `fact-bar` (3 kolumny od 48rem), `service-list` (wiersze 3.5rem | 1fr | auto).

## Komponenty

- **Przyciski**: `.btn` (ink), `.btn--primary` (clay), `.btn--ghost` (obrys) — prostokątne,
  2px obrys, font mono uppercase, hover: przesunięcie 1px + zmiana koloru.
- **Lista usług**: wiersze oddzielone liniami (bez kart), numer + nazwa + opis + strzałka;
  hover: tło clay-tint + wsunięcie.
- **FAQ**: natywne `<details>/<summary>`, znak +/–, bez JavaScriptu.
- **Formularz**: etykiety mono uppercase, pola z obrysem 1px, błędy pod polami,
  komunikaty sukcesu/błędu w ramce, honeypot ukryty.
- **Rysunki techniczne**: inline SVG (przekrój wykopu, schematy usług) — kreskowanie gruntu
  `#b3a68e`, linie wymiarowe clay, etykiety mono. Ilustracje poglądowe, NIE fotografie
  realizacji.
- **Nawigacja**: sticky header z dolną linią; mobile — hamburger (aria-expanded) + stały
  dolny pasek telefoniczny.

## Breakpointy

- `< 48rem` — mobile: jedna kolumna, dolny pasek tel, hamburger.
- `48–56rem` — tablet: fact-bar 3 kolumny, nadal hamburger.
- `≥ 56rem` — desktop: grid-2, pełna nawigacja, steps 4 kolumny.

## Animacje

- Wyłącznie stany hover/focus (150 ms), bez animacji wejściowych.
- Pełne poszanowanie `prefers-reduced-motion` (globalne wyzerowanie czasów).

## Materiały — braki i lista do wykonania

Brak autentycznych zdjęć firmy. Miejsca na zdjęcia (po ich dostarczeniu):
1. Minikoparka przy pracy (hero / strona „O firmie") — poziom, dobre światło.
2. Wykop pod fundament z widoczną geometrią (podstrona fundamentów).
3. Wykop liniowy z rurą (podstrona instalacji).
4. Koryto pod kostkę przed/prace brukarskie (podstrona korytowania).
5. Wyrównany teren „przed/po" (podstrona niwelacji).
6. Zdjęcie maszyny z operatorem (budowanie zaufania).

Zasady: prawdziwe zdjęcia firmy, bez stocku udającego realizacje, bez generatywnych
imitacji fotografii. Zoptymalizowane (WebP/AVIF), opisowe nazwy plików, alt tylko gdy
obraz niesie informację.
