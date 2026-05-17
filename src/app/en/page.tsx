import type { Metadata } from 'next';
import App from '@/App';
import { JsonLd } from '@/components/JsonLd';
import { buildPageMetadata } from '@/lib/seo';

const language = 'en';

export function generateMetadata(): Metadata {
  return buildPageMetadata(language);
}

export default function EnglishHomePage() {
  return (
    <>
      <JsonLd language={language} />
      <App initialLanguage={language} />
    </>
  );
}
