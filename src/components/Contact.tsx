import { ArrowRight, Globe2, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { useState, type CSSProperties, type FormEvent, type HTMLAttributes } from 'react';
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

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  product: string;
  message: string;
  website: string;
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
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitState('submitting');

    const formData = new FormData(form);
    const payload: ContactPayload = {
      name: String(formData.get('name') ?? ''),
      company: String(formData.get('company') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      service: String(formData.get('service') ?? ''),
      product: String(formData.get('product') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
    };

    try {
      const response = await fetch(withBasePath('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      setSubmitState('success');
      form.reset();
    } catch {
      setSubmitState('error');
    }
  };

  const statusMessage =
    submitState === 'submitting'
      ? copy.form.status.submitting
      : submitState === 'success'
        ? copy.form.status.success
        : submitState === 'error'
          ? copy.form.status.error
          : null;

  const statusClassName =
    submitState === 'error' ? 'mt-3 text-sm text-red-600' : 'mt-3 text-sm text-emerald-700';

  const handleFormChange = () => {
    if (submitState === 'success' || submitState === 'error') {
      setSubmitState('idle');
    }
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
            <form
              onSubmit={handleSubmit}
              onChange={handleFormChange}
              className="grid gap-4 sm:grid-cols-2"
              aria-describedby="contact-helper"
            >
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
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
                <button type="submit" className="btn btn-contact w-full" disabled={submitState === 'submitting'}>
                  {submitState === 'submitting' ? copy.form.submittingLabel : copy.form.submitLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                {statusMessage ? (
                  <p role="status" aria-live="polite" className={statusClassName}>
                    {statusMessage}
                  </p>
                ) : null}
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
