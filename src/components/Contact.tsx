import { ArrowRight, Check } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { FormEvent, HTMLAttributes } from 'react';
import type { ContactCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { MotionSection } from './MotionSection';

type ContactProps = {
  copy: ContactCopy;
  trustCues: string[];
};

type FieldConfig = {
  id: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  required: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  colSpan?: string;
};

const fieldConfig: FieldConfig[] = [
  { id: 'name', type: 'text', required: true },
  { id: 'company', type: 'text', required: true },
  { id: 'email', type: 'email', required: true, inputMode: 'email' },
  { id: 'phone', type: 'tel', required: true, inputMode: 'tel' },
  { id: 'service', type: 'text', required: true },
  { id: 'product', type: 'text', required: false },
  { id: 'message', type: 'textarea', required: true, colSpan: 'sm:col-span-2' },
];

export function Contact({ copy, trustCues }: ContactProps) {
  const cinematicStyle = {
    '--cinema-image': `url(${withBasePath('/images/generated/contact-global-map-lights.webp')})`,
    '--cinema-position': 'center 44%',
  } as CSSProperties;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.reset();
  };

  return (
    <MotionSection
      id="contact"
      className="section section-base cinema-surface"
      decorVariant="aurora"
      parallaxStrength={20}
      style={cinematicStyle}
    >
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.1fr]">
          <div className="space-y-6">
            <p className="badge">{copy.label}</p>
            <h2 className="section-title font-display">{copy.heading}</h2>
            <p className="section-lead">{copy.description}</p>
            <div className="panel-solid p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">{copy.label}</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {trustCues.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="icon-dot">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="panel p-8 shadow-lift">
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" aria-describedby="contact-helper">
              {fieldConfig.map((field, index) => {
                const label = copy.form.fields[index] ?? '';

                return (
                  <div key={field.id} className={field.colSpan ?? ''}>
                    <label htmlFor={field.id} className="text-sm text-muted-foreground">
                      {label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea id={field.id} name={field.id} rows={4} required={field.required} className="field-input" />
                    ) : (
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        inputMode={field.inputMode}
                        required={field.required}
                        className="field-input"
                      />
                    )}
                  </div>
                );
              })}
              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-contact w-full">
                  {copy.form.submitLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p id="contact-helper" className="mt-3 text-xs text-muted-foreground">
                  {copy.form.micro}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
