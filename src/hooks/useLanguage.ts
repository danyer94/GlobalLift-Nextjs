import { useEffect, useState } from 'react';
import { type Language } from '../content/siteContent';

type UseLanguageOptions = {
  storageKey: string;
  defaultLanguage?: Language;
};

export function useLanguage({
  storageKey,
  defaultLanguage = 'es',
}: UseLanguageOptions) {
  // Keep first render deterministic between server and client.
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const queryLanguage = params.get('lang')?.toLowerCase();
    if (queryLanguage === 'es' || queryLanguage === 'en') {
      setLanguage(queryLanguage);
      return;
    }

    const storedLanguage = window.localStorage.getItem(storageKey);
    if (storedLanguage === 'es' || storedLanguage === 'en') {
      setLanguage(storedLanguage);
      return;
    }

    const browserLanguage = window.navigator.language?.toLowerCase() ?? '';
    if (browserLanguage.startsWith('es')) {
      setLanguage('es');
      return;
    }

    setLanguage('en');
  }, [storageKey]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, language);
    }
  }, [language, storageKey]);

  return { language, setLanguage } as const;
}
