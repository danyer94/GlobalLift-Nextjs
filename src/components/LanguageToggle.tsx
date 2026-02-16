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
      className="relative inline-flex h-12 w-[9rem] items-center rounded-full border border-border/70 bg-muted/55 p-1 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-pressed={isEnglish}
      title={activeOption.buttonLabel}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full border border-border/60 bg-background shadow-[0_6px_18px_rgba(15,23,42,0.16)] transition-transform duration-300 ease-out ${
          isEnglish ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <span className="relative z-10 grid w-full grid-cols-2 items-center text-xs font-semibold leading-none tracking-tight">
        {LANGUAGE_ORDER.map((language) => {
          const option = LANGUAGE_OPTIONS[language];
          const isActive = language === value;

          return (
            <span
              key={option.value}
              className={`inline-flex items-center justify-center gap-1.5 transition-all duration-300 ${
                isActive
                  ? "scale-100 text-primary"
                  : "scale-[0.9] text-muted-foreground"
              }`}
            >
              <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border/50">
                <Image
                  src={option.flagSrc}
                  alt={option.flagAlt}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
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
