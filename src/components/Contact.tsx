import { ArrowRight, Globe2, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { FormEvent, HTMLAttributes } from 'react';
import type { ContactCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';
import { MotionSection } from './MotionSection';

type ContactProps = {
  copy: ContactCopy;
};

type FieldConfig = {
  id: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  required: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  colSpan?: string;
};

type CompanyInfoItem = {
  id: 'country' | 'address' | 'email' | 'phone';
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
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

export function Contact({ copy }: ContactProps) {
  const cinematicStyle = {
    '--cinema-image': `url(${withBasePath('/images/generated/contact-global-map-lights.webp')})`,
    '--cinema-position': 'center 44%',
  } as CSSProperties;

  const companyInfoItems: CompanyInfoItem[] = [
    {
      id: 'country',
      label: copy.companyInfo.countryLabel,
      value: copy.companyInfo.country,
      icon: Globe2,
    },
    {
      id: 'address',
      label: copy.companyInfo.addressLabel,
      value: copy.companyInfo.address,
      icon: MapPin,
    },
    {
      id: 'email',
      label: copy.companyInfo.emailLabel,
      value: copy.companyInfo.email,
      href: `mailto:${copy.companyInfo.email}`,
      icon: Mail,
    },
    {
      id: 'phone',
      label: copy.companyInfo.phoneLabel,
      value: copy.companyInfo.phone,
      href: `tel:${copy.companyInfo.phone}`,
      icon: Phone,
    },
  ];

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
            <h2 className="section-title font-display">{copy.heading}</h2>
            <p className="section-lead">{copy.description}</p>
            <div className="contact-company-panel">
              <div className="contact-company-head">
                <p className="contact-company-kicker">{copy.label}</p>
                <span className="contact-company-country">Global Lift</span>
              </div>
              <ul className="contact-company-grid">
                {companyInfoItems.map((item) => (
                  <li key={item.id} className="contact-company-item">
                    <span className="contact-company-icon">
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="contact-company-label">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="contact-company-value contact-company-link">
                          {item.value}
                        </a>
                      ) : (
                        <p className="contact-company-value">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="contact-form-panel p-8">
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" aria-describedby="contact-helper">
              {fieldConfig.map((field, index) => {
                const label = copy.form.fields[index] ?? '';

                return (
                  <div key={field.id} className={field.colSpan ?? ''}>
                    <label htmlFor={field.id} className="contact-form-label">
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
