import { useEffect, useState } from 'react';
import { About } from './components/About';
import { Boat } from './components/Boat';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ImageRevealSection } from './components/ImageRevealSection';
import { Navigation } from './components/Navigation';
import { Process } from './components/Process';
import { Products } from './components/Products';
import { SEO } from './components/SEO';
import { Services } from './components/Services';
import { Why } from './components/Why';
import { siteContent, type Language } from './content/siteContent';
import { withBasePath } from './utils/basePath';
import { ScrollProvider } from './utils/scroll';

const STORAGE_KEY = 'globallift-language';
const CINEMA_PRESET = 'immersive';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'es';
  }

  const params = new URLSearchParams(window.location.search);
  const paramLanguage = params.get('lang')?.toLowerCase();
  if (paramLanguage === 'es' || paramLanguage === 'en') {
    return paramLanguage;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'es' || stored === 'en') {
    return stored;
  }

  const browserLang = window.navigator.language?.toLowerCase() ?? '';
  return browserLang.startsWith('es') ? 'es' : 'en';
};

function App() {
  const [language, setLanguage] = useState<Language>('es');
  const content = siteContent[language];

  useEffect(() => {
    setLanguage(getInitialLanguage());
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.setAttribute('data-cinema', CINEMA_PRESET);
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language);
    }
  }, [language]);

  return (
    <div id="top" className="bg-background text-foreground antialiased">
      <SEO
        language={language}
        title={content.seo.title}
        description={content.seo.description}
      />
      <Navigation
        items={content.navItems}
        copy={content.navigation}
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
          <Contact copy={content.contact} trustCues={content.hero.trustCues} />
        </main>
      </ScrollProvider>
      <Footer items={content.navItems} note={content.about.oneLine} />
    </div>
  );
}

export default App;
