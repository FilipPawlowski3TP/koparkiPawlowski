// Dane serwisu — jedno źródło prawdy dla treści, kontaktu i danych strukturalnych.
// Dane kontaktowe potwierdzone przez właściciela (źródło: docs/audyt.md + plandzialania.md).
export const site = {
  name: 'Koparki Pawłowski',
  tagline: 'Usługi minikoparką — Wrocław i okolice',
  description:
    'Koparki Pawłowski — usługi minikoparką do 2 ton z operatorem we Wrocławiu i okolicach. Kopanie fundamentów, wykopy pod kanalizacje i instalacje, korytowanie, równanie terenu.',
  url: 'https://www.koparkapawlowski.pl',

  // Kontakt
  phoneDisplay: '792 611 777',
  phoneHref: '+48792611777',
  email: 'piotrpawlowski1979@gmail.com',

  // Godziny otwarcia (potwierdzone)
  hours: [
    { days: 'Poniedziałek – piątek', hours: '7:30 – 20:30' },
    { days: 'Sobota', hours: '8:00 – 18:30' },
    { days: 'Niedziela', hours: 'nieczynne' }
  ],

  // Obszar działania (potwierdzony)
  area: 'Wrocław i okolice'
};

// Dane strukturalne schema.org (tylko potwierdzone pola)
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phoneHref,
  description: site.description,
  areaServed: {
    '@type': 'City',
    name: 'Wrocław'
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Wrocław',
    addressCountry: 'PL'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:30',
      closes: '20:30'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '18:30'
    }
  ]
};
