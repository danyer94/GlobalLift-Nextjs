'use client';

import { useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { About } from './components/About';
import { Boat } from './components/Boat';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ImageRevealSection } from './components/ImageRevealSection';
import { Navigation } from './components/Navigation';
import { Process } from './components/Process';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { Why } from './components/Why';
import { siteContent, type Language } from './content/siteContent';
import { getHtmlLang, getLanguagePath } from './lib/seo';
import { withBasePath } from './utils/basePath';
import { ScrollProvider } from './utils/scroll';

const CINEMA_PRESET = 'immersive';
const LANGUAGE_STORAGE_KEY = 'globallift-language';

type AppProps = {
  initialLanguage: Language;
};

function App({ initialLanguage }: AppProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const language = initialLanguage;
  const content = siteContent[language];

  const setLanguage = useCallback(
    (next: Language) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      }

      const nextPath = getLanguagePath(next);
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      const currentPath = pathname ?? '/';

      if (currentPath !== nextPath) {
        replace(`${nextPath}${hash}`, { scroll: false });
      }
    },
    [pathname, replace],
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-cinema', CINEMA_PRESET);
  }, []);

  useEffect(() => {
    document.documentElement.lang = getHtmlLang(language);
  }, [language]);

  return (
    <div id="top" className="bg-background text-foreground antialiased">
      <Navigation
        items={content.navItems}
        language={language}
        onLanguageChange={setLanguage}
      />

      <ScrollProvider>
        <Boat />
        <main id="main-content">
          <Hero copy={content.hero} />
          <About copy={content.about} values={content.values} commitment={content.commitment} />
          <ImageRevealSection
            image1={withBasePath('/images/generated/reveal-export-orchard.webp')}
            title1={content.revealSection.title1}
            subtitle1={content.revealSection.subtitle1}
            image2={withBasePath('/images/generated/reveal-air-cargo.webp')}
            title2={content.revealSection.title2}
            subtitle2={content.revealSection.subtitle2}
          />
          <Services copy={content.services} />
          <Products copy={content.products} />
          <Process copy={content.process} />
          <Why copy={content.why} />
          <Contact copy={content.contact} />
        </main>
      </ScrollProvider>
      <Footer
        items={content.navItems}
        note={content.about.oneLine}
        copy={content.footer}
        contactInfo={content.contact.companyInfo}
      />
    </div>
  );
}

export default App;
