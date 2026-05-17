import type { Language } from '@/content/siteContent';
import { buildJsonLd } from '@/lib/seo';

type JsonLdProps = {
  language: Language;
};

export function JsonLd({ language }: JsonLdProps) {
  const jsonLd = buildJsonLd(language);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
