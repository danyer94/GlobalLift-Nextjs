import Image from "next/image";
import type { KeyboardEvent } from "react";
import type { Language } from "../content/siteContent";
import { withBasePath } from "../utils/basePath";

type LanguageToggleProps = {
  value: Language;
  onChange: (value: Language) => void;
};

type LanguageOption = {
  value: Language;
  label: string;
  flagAlt: string;
  flagSrc: string;
  buttonLabel: string;
};

const LANGUAGE_ORDER: Language[] = ["es", "en"];

const LANGUAGE_OPTIONS: Record<Language, LanguageOption> = {
  es: {
    value: "es",
    label: "ES",
    flagAlt: "Bandera de Espa\u00f1a",
    flagSrc: withBasePath("/icons/flags/es.svg"),
    buttonLabel: "Switch language to English",
  },
  en: {
    value: "en",
    label: "EN",
    flagAlt: "United States flag",
    flagSrc: withBasePath("/icons/flags/us.svg"),
    buttonLabel: "Cambiar idioma a espa\u00f1ol",
  },
};

function getNextLanguage(current: Language): Language {
  const currentIndex = LANGUAGE_ORDER.indexOf(current);
  return LANGUAGE_ORDER[(currentIndex + 1) % LANGUAGE_ORDER.length];
}

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  const activeOption = LANGUAGE_OPTIONS[value];
  const isEnglish = value === "en";

  const handleToggle = () => {
    onChange(getNextLanguage(value));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const currentIndex = LANGUAGE_ORDER.indexOf(value);
    const nextIndex =
      (currentIndex + step + LANGUAGE_ORDER.length) % LANGUAGE_ORDER.length;
    onChange(LANGUAGE_ORDER[nextIndex]);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className="language-glass-toggle"
      aria-pressed={isEnglish}
      title={activeOption.buttonLabel}
    >
      <span
        aria-hidden="true"
        className={`language-glass-toggle-thumb ${
          isEnglish ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <span className="relative z-10 grid w-full grid-cols-2 items-center text-[0.65rem] font-[750] leading-none tracking-tight">
        {LANGUAGE_ORDER.map((language) => {
          const option = LANGUAGE_OPTIONS[language];
          const isActive = language === value;

          return (
            <span
              key={option.value}
              className={`language-glass-toggle-option ${
                isActive
                  ? "language-glass-toggle-option--active"
                  : "language-glass-toggle-option--inactive"
              }`}
            >
              <span className="inline-flex h-[1.15rem] w-[1.15rem] shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/10 shadow-sm">
                <Image
                  src={option.flagSrc}
                  alt={option.flagAlt}
                  width={24}
                  height={24}
                  className="h-full w-full object-cover scale-[1.25]"
                />
              </span>
              <span>{option.label}</span>
            </span>
          );
        })}
      </span>

      <span className="sr-only">{activeOption.buttonLabel}</span>
    </button>
  );
}
