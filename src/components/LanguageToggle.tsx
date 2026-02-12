import type { KeyboardEvent } from 'react';
import type { Language } from '../content/siteContent';

type LanguageToggleProps = {
  value: Language;
  onChange: (value: Language) => void;
};

type LanguageOption = {
  value: Language;
  label: string;
  borderClass: string;
  buttonLabel: string;
};

const options: LanguageOption[] = [
  {
    value: 'es',
    label: 'Espa�ol',
    borderClass: 'border-[#f47a20]',
    buttonLabel: 'Switch language to English',
  },
  {
    value: 'en',
    label: 'English',
    borderClass: 'border-[#27486b]',
    buttonLabel: 'Cambiar idioma a espa�ol',
  },
];

const order: Language[] = ['es', 'en'];

const flagBackgrounds: Record<Language, string> = {
  es: 'linear-gradient(to bottom, #c60b1e 0 33.333%, #ffc400 33.333% 66.666%, #c60b1e 66.666% 100%)',
  en: 'repeating-linear-gradient(to bottom, #b22234 0 8%, #ffffff 8% 16%)',
};

const cantonBackground =
  'radial-gradient(circle at 20% 20%, #ffffff 0 7%, transparent 7.5%), radial-gradient(circle at 48% 20%, #ffffff 0 7%, transparent 7.5%), radial-gradient(circle at 76% 20%, #ffffff 0 7%, transparent 7.5%), radial-gradient(circle at 34% 42%, #ffffff 0 7%, transparent 7.5%), radial-gradient(circle at 62% 42%, #ffffff 0 7%, transparent 7.5%), radial-gradient(circle at 20% 64%, #ffffff 0 7%, transparent 7.5%), radial-gradient(circle at 48% 64%, #ffffff 0 7%, transparent 7.5%), radial-gradient(circle at 76% 64%, #ffffff 0 7%, transparent 7.5%), #3c3b6e';

function getNextLanguage(value: Language): Language {
  const currentIndex = order.indexOf(value);
  const nextIndex = (currentIndex + 1) % order.length;
  return order[nextIndex];
}

function Flag({ language }: { language: Language }) {
  return (
    <span
      className="relative inline-flex h-11 w-11 shrink-0 overflow-hidden rounded-full border-[3px] border-white shadow-[0_8px_16px_rgba(15,23,42,0.18)]"
      aria-hidden="true"
      style={{ background: flagBackgrounds[language] }}
    >
      {language === 'es' ? (
        <span className="absolute left-[30%] top-1/2 h-3.5 w-2 -translate-y-1/2 rounded-sm bg-[#9b111e]/70 ring-1 ring-[#f1d38b]" />
      ) : (
        <span
          className="absolute left-0 top-0 h-[55%] w-[55%]"
          style={{ background: cantonBackground }}
        />
      )}
    </span>
  );
}

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  const activeOption = options.find((option) => option.value === value) ?? options[0];

  const handleToggle = () => {
    onChange(getNextLanguage(value));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const currentIndex = order.indexOf(value);
    const nextIndex = (currentIndex + step + order.length) % order.length;
    onChange(order[nextIndex]);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`inline-flex h-14 min-w-[12rem] items-center gap-4 rounded-full border-[3px] bg-white/95 pl-2.5 pr-6 shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.17)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 ${activeOption.borderClass}`}
      aria-label={activeOption.buttonLabel}
      title={activeOption.buttonLabel}
    >
      <Flag language={activeOption.value} />
      <span className="font-display text-[2rem] font-semibold leading-none tracking-[-0.03em] text-[#00308f]">
        {activeOption.label}
      </span>
    </button>
  );
}