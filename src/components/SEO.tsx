import Head from 'next/head';
import type { Language } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';

interface SEOProps {
  language: Language;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  alternateUrls?: {
    es: string;
    en: string;
  };
}

const defaultSEO = {
  es: {
    title: 'Global Lift SRL | Importación, Exportación y Logística',
    description:
      'Soluciones B2B de importación, exportación, logística y comercialización. Conectamos mercados con República Dominicana con cumplimiento y transparencia.',
    keywords:
      'importación República Dominicana, exportación, logística B2B, comercialización internacional, comercio exterior, supply chain, import export RD',
    ogLocale: 'es_DO',
    geoPlacename: 'República Dominicana',
  },
  en: {
    title: 'Global Lift SRL | Import, Export & Logistics',
    description:
      'B2B import, export, logistics, and trade facilitation. Connecting markets with the Dominican Republic through compliance and transparency.',
    keywords:
      'Dominican Republic import, export, B2B logistics, international trade, supply chain, trade facilitation DR',
    ogLocale: 'en_US',
    geoPlacename: 'Dominican Republic',
  },
};

const siteUrl = 'https://globallift.do';
const defaultOgImage = withBasePath('/logo/Global-Lift.png');

export function SEO({
  language,
  title,
  description,
  keywords,
  ogImage = defaultOgImage,
  canonicalUrl = siteUrl,
  alternateUrls,
}: SEOProps) {
  const seo = defaultSEO[language];
  const finalTitle = title || seo.title;
  const finalDescription = description || seo.description;
  const finalKeywords = keywords || seo.keywords;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Global Lift SRL',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo/Global-Lift.png`,
        },
        description:
          language === 'es'
            ? 'Soluciones B2B de importación, exportación, logística y comercialización en República Dominicana'
            : 'B2B import, export, logistics, and trade facilitation in the Dominican Republic',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'DO',
          addressLocality:
            language === 'es' ? 'República Dominicana' : 'Dominican Republic',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['Spanish', 'English'],
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: canonicalUrl,
        name: finalTitle,
        description: finalDescription,
        inLanguage: language === 'es' ? 'es-DO' : 'en-US',
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        about: {
          '@id': `${siteUrl}/#organization`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Global Lift SRL',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        inLanguage: [
          {
            '@type': 'Language',
            name: 'Spanish',
            alternateName: 'es',
          },
          {
            '@type': 'Language',
            name: 'English',
            alternateName: 'en',
          },
        ],
      },
    ],
  };

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="language" content={language} />
      <meta name="geo.region" content="DO" />
      <meta name="geo.placename" content={seo.geoPlacename} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="es" href={alternateUrls?.es || `${siteUrl}/`} />
      <link rel="alternate" hrefLang="en" href={alternateUrls?.en || `${siteUrl}/?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content={seo.ogLocale} />
      <meta property="og:site_name" content="Global Lift SRL" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
    </Head>
  );
}
