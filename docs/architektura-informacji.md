# Architektura informacji — Koparki Pawłowski

## Struktura URL-i

```
/                              Strona główna (H1: oferta + Wrocław)
/uslugi/                       Katalog usług (H1: fraza „usługi minikoparką")
/uslugi/wykopy-pod-fundamenty/       Kopanie fundamentów
/uslugi/wykopy-pod-instalacje/       Wykopy pod kanalizacje i instalacje
/uslugi/korytowanie-pod-kostke/      Korytowanie
/uslugi/niwelacja-terenu/            Równanie i niwelacja terenu
/obszar-dzialania/             Gdzie pracujemy + godziny
/o-firmie/                     Profil firmy i zasady realizacji
/kontakt/                      Telefon, e-mail, godziny, formularz
/polityka-prywatnosci/         Polityka prywatności
404                            Strona błędu z CTA
```

Format adresów: katalogowy (`/uslugi/x/`) — czytelny, stabilny, bez rozszerzeń.

## Cel i intencja każdej strony

| Strona | Cel biznesowy | Intencja użytkownika | Główne CTA |
|---|---|---|---|
| `/` | pierwszy kontakt, telefon | „czy ta firma robi to, czego potrzebuję?" | Zadzwoń / Zobacz usługi |
| `/uslugi/` | dopasowanie usługi | „która usługa?" | linki do podstron + telefon |
| podstrony usług | wycena telefoniczna | „jak to wygląda i ile trwa?" | Zadzwoń / Wyślij zapytanie |
| `/obszar-dzialania/` | kwalifikacja leada | „czy dojeżdżają do mnie?" | Zapytaj o dojazd |
| `/o-firmie/` | zaufanie | „kim są?" | telefon |
| `/kontakt/` | konwersja | „jak się skontaktować?" | tel:, e-mail, formularz |
| `/polityka-prywatnosci/` | zgodność | „co z moimi danymi?" | — |

## Nawigacja

- Góra (desktop): logo → Usługi, Obszar działania, O firmie, Kontakt + przycisk telefonu.
- Mobile: hamburger + stały dolny pasek „Zadzwoń 792 611 777" (nie zasłania treści —
  body ma dolny margines).
- Stopka: dane firmy, kontakt, godziny, linki do wszystkich podstron (title block).
- Breadcrumb tekstowy na podstronach usług („Usługi / 0X").

## Ścieżka użytkownika (zgodnie ze specyfikacją, pkt 7.1)

1. Trafia z Google (strona główna / podstrona usługi).
2. W hero widzi: co robimy, jakim sprzętem, gdzie (Wrocław i okolice).
3. Lista usług potwierdza zakres; „oraz wszelkie prace ziemne" obsługuje nietypowe zlecenia.
4. Sekcja „Jak pracujemy" + FAQ budują zaufanie bez fikcyjnych obietnic.
5. Telefon (klikalny `tel:`) dostępny w headerze, hero, sekcjach, stopce i pasku mobilnym.
6. Formularz — ścieżka drugorzędna dla osób preferujących pisemny kontakt.

## Decyzje treściowe

- Bez podstrony „Realizacje" — brak autentycznych zdjęć (patrz: lista materiałów w
  docs/design-system.md). Strona pojawi się po zebraniu prawdziwych materiałów.
- Bez bloga — patrz docs/strategia-seo.md.
- Bez cennika — brak zatwierdzonych stawek; pytanie „ile kosztuje?" obsłużone w FAQ
  (wycena po rozmowie).
