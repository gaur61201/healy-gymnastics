import type { Metadata } from 'next';
import { Bebas_Neue, Cormorant_Garamond, DM_Sans, Noto_Kufi_Arabic, Cairo } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-kufi',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Healy Gymnastics Academy | Kuwait\'s #1 Gymnastics Academy Since 2013',
  description: 'Elite gymnastics training for children aged 3–16 in Kuwait. FIG-certified coaches. Programs include recreational, competitive, rhythmic, and boys artistic gymnastics. Book your free trial today.',
  keywords: 'gymnastics Kuwait, gymnastics academy Kuwait, kids gymnastics Kuwait, rhythmic gymnastics Kuwait, competitive gymnastics Kuwait, Salmiya gymnastics, HGA Kuwait',
  authors: [{ name: 'Healy Gymnastics Academy' }],
  creator: 'Healy Gymnastics Academy',
  publisher: 'Healy Gymnastics Academy',
  metadataBase: new URL('https://www.healygym.com'),
  alternates: {
    canonical: 'https://www.healygym.com',
    languages: {
      'en': 'https://www.healygym.com/en',
      'ar': 'https://www.healygym.com/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_KW',
    url: 'https://www.healygym.com',
    siteName: 'Healy Gymnastics Academy',
    title: 'Healy Gymnastics Academy | Kuwait\'s #1 Gymnastics Academy Since 2013',
    description: 'Elite gymnastics training for children aged 3–16 in Kuwait. FIG-certified coaches. Book your free trial today.',
    images: [
      {
        url: '/images/logo.png',
        width: 400,
        height: 400,
        alt: 'Healy Gymnastics Academy Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healy Gymnastics Academy | Kuwait\'s #1 Gymnastics Academy',
    description: 'Elite gymnastics training for children aged 3–16 in Kuwait. FIG-certified coaches.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: 'Healy Gymnastics Academy',
  alternateName: 'HGA Kuwait',
  description: "Kuwait's #1 Gymnastics Academy Since 2013. Elite gymnastics training for children aged 3–16.",
  url: 'https://www.healygym.com',
  telephone: '+96551703013',
  email: 'info@healygym.com',
  image: 'https://www.healygym.com/images/logo.png',
  logo: 'https://www.healygym.com/images/logo.png',
  foundingDate: '2013',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Al Salmiya',
    addressLocality: 'Kuwait City',
    addressRegion: 'Al Asimah',
    addressCountry: 'KW',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '29.33234',
    longitude: '48.07557',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '15:00',
      closes: '21:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'KWD',
  paymentAccepted: 'Cash, Credit Card',
  sameAs: [
    'https://www.instagram.com/healygymnasticsacademy',
    'https://www.healygym.com',
  ],
  hasMap: 'https://goo.gl/maps/salmiya-kuwait',
  sport: 'Gymnastics',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'FIG-Certified Coaches', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioned', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parking Available', value: true },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${bebasNeue.variable} ${cormorantGaramond.variable} ${dmSans.variable} ${notoKufiArabic.variable} ${cairo.variable}`}
    >
      <head>
        <link rel="canonical" href="https://www.healygym.com" />
        <meta name="theme-color" content="#080808" />
        <meta name="msapplication-TileColor" content="#080808" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={isRTL ? 'font-cairo' : 'font-dm-sans'}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
