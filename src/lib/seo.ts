import type { Metadata } from 'next';
import { siteContent, type Language } from '@/content/siteContent';

export const SITE_URL = 'https://globallift.do';
export const OG_IMAGE_PATH = '/images/og/og-image.jpg';

export function resolveLanguage(langParam?: string | null): Language {
  return langParam?.toLowerCase() === 'en' ? 'en' : 'es';
}

export function getLanguagePath(language: Language): string {
  return language === 'en' ? '/en' : '/';
}

export function getAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function getCanonicalUrl(language: Language): string {
  return getAbsoluteUrl(getLanguagePath(language));
}

export function getHtmlLang(language: Language): string {
  return language === 'en' ? 'en-US' : 'es-DO';
}

export function buildPageMetadata(language: Language): Metadata {
  const seo = siteContent[language].seo;
  const canonical = getCanonicalUrl(language);
  const ogImageUrl = getAbsoluteUrl(OG_IMAGE_PATH);

  return {
    title: {
      absolute: seo.title,
    },
    description: seo.description,
    alternates: {
      canonical,
      languages: {
        'es-DO': getCanonicalUrl('es'),
        'en-US': getCanonicalUrl('en'),
        'x-default': `${SITE_URL}/`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: seo.title,
      description: seo.description,
      siteName: 'Global Lift',
      locale: language === 'es' ? 'es_DO' : 'en_US',
      alternateLocale: language === 'es' ? ['en_US'] : ['es_DO'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Global Lift',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [ogImageUrl],
    },
  };
}

export function buildJsonLd(language: Language) {
  const seo = siteContent[language].seo;
  const canonical = getCanonicalUrl(language);
  const sameAs = siteContent[language].footer.socialLinks.map((link) => link.href);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Global Lift',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo/Global-Lift.png`,
        },
        description: seo.description,
        sameAs,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'DO',
          addressLocality:
            language === 'es' ? 'República Dominicana' : 'Dominican Republic',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Global Lift',
        inLanguage: language === 'es' ? 'es-DO' : 'en-US',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: language === 'es' ? 'es-DO' : 'en-US',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
    ],
  };
}
