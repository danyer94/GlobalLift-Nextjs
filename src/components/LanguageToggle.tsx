import Image from 'next/image';
import type { KeyboardEvent } from 'react';
import type { Language } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';

type LanguageToggleProps = {
  value: Language;
  onChange: (value: Language) => void;
};

type LanguageOption = {
  value: Language;
  label: string;
  flagAlt: string;
  flagSrc: string;
  borderClass: string;
  buttonLabel: string;
};

const LANGUAGE_ORDER: Language[] = ['es', 'en'];

const LANGUAGE_OPTIONS: Record<Language, LanguageOption> = {
  es: {
    value: 'es',
    label: 'Español',
    flagAlt: 'Bandera de España',
    flagSrc: withBasePath('/icons/flags/es.svg'),
    borderClass: 'border-[#f47a20]',
    buttonLabel: 'Switch language to English',
  },
  en: {
    value: 'en',
    label: 'English',
    flagAlt: 'United States flag',
    flagSrc: withBasePath('/icons/flags/us.svg'),
    borderClass: 'border-[#27486b]',
    buttonLabel: 'Cambiar idioma a español',
  },
};

function getNextLanguage(current: Language): Language {
  const currentIndex = LANGUAGE_ORDER.indexOf(current);
  return LANGUAGE_ORDER[(currentIndex + 1) % LANGUAGE_ORDER.length];
}

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  const activeOption = LANGUAGE_OPTIONS[value];

  const handleToggle = () => {
    onChange(getNextLanguage(value));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const currentIndex = LANGUAGE_ORDER.indexOf(value);
    const nextIndex = (currentIndex + step + LANGUAGE_ORDER.length) % LANGUAGE_ORDER.length;
    onChange(LANGUAGE_ORDER[nextIndex]);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`inline-flex h-12 min-w-[10.5rem] items-center gap-3 rounded-full border-[3px] bg-white/95 pl-2 pr-4 shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.17)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 ${activeOption.borderClass}`}
      aria-label={activeOption.buttonLabel}
      title={activeOption.buttonLabel}
    >
      <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
        <Image
          src={activeOption.flagSrc}
          alt={activeOption.flagAlt}
          width={36}
          height={36}
          className="h-full w-full object-cover"
        />
      </span>
      <span className="font-display text-sm font-medium leading-none tracking-tight text-[#00308f] md:text-lg">
        {activeOption.label}
      </span>
    </button>
  );
}
