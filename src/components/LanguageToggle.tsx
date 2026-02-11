import type { Language } from '../content/siteContent';

type LanguageToggleProps = {
  value: Language;
  onChange: (value: Language) => void;
};

const options: Array<{ value: Language; short: string }> = [
  { value: 'es', short: 'ES' },
  { value: 'en', short: 'EN' },
];

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  const indicatorClass = value === 'en' ? 'translate-x-full' : 'translate-x-0';
  const orderedValues: Language[] = ['es', 'en'];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    const currentIndex = orderedValues.indexOf(value);
    const nextIndex =
      event.key === 'ArrowRight'
        ? Math.min(currentIndex + 1, orderedValues.length - 1)
        : Math.max(currentIndex - 1, 0);
    onChange(orderedValues[nextIndex]);
  };

  return (
    <div
      className="relative grid w-[6.125rem] shrink-0 grid-cols-2 items-center overflow-hidden rounded-full border border-border bg-graphite/70 p-1 text-xs font-semibold shadow-soft backdrop-blur"
      role="radiogroup"
      aria-label="Language selector"
      onKeyDown={handleKeyDown}
    >
      <span
        className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full border border-border bg-card shadow-soft transition-transform duration-300 ${indicatorClass}`}
        aria-hidden="true"
      />
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 transition-colors ${
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground focus-visible:text-foreground'
            }`}
            aria-label={option.value === 'es' ? 'Switch to Spanish' : 'Switch to English'}
          >
            <span className="text-[0.6rem] uppercase tracking-[0.32em]">{option.short}</span>
          </button>
        );
      })}
    </div>
  );
}
