import { LinkedinLogo, InstagramLogo, EnvelopeSimple, PhoneCall, MapPin } from '@phosphor-icons/react';
import type { ContactCopy, FooterCopy, FooterSocialLink, NavItem } from '../content/siteContent';
import { Logo } from './Logo';

type FooterProps = {
  items: NavItem[];
  note: string;
  copy: FooterCopy;
  contactInfo: ContactCopy['companyInfo'];
};

const socialIconByType = {
  linkedin: LinkedinLogo,
  instagram: InstagramLogo,
} satisfies Record<FooterSocialLink['type'], typeof LinkedinLogo>;

const getPhoneHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;

export function Footer({ items, note, copy, contactInfo }: FooterProps) {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      {/* Top gradient accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr,1fr,1fr] lg:gap-10">
          {/* Brand column */}
          <div className="space-y-6">
            <a href="#top" className="inline-block" aria-label={copy.backToTopLabel}>
              <Logo variant="default" />
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{note}</p>

            {/* Mini map — Dominican Republic */}
            <div className="relative h-28 w-40 overflow-hidden rounded-xl border border-border/60 bg-card/50 shadow-card">
              <svg
                viewBox="0 0 200 280"
                className="h-full w-full"
                aria-label={copy.mapLabel}
                role="img"
              >
                {/* Simplified DR outline */}
                <path
                  d="M70 20 L130 15 L155 50 L165 90 L155 140 L145 180 L125 220 L105 260 L85 270 L65 260 L55 220 L45 170 L50 120 L60 70 Z"
                  fill="rgb(var(--secondary) / 0.12)"
                  stroke="rgb(var(--secondary) / 0.35)"
                  strokeWidth="1.5"
                />
                {/* Santo Domingo dot */}
                <circle cx="95" cy="140" r="5" fill="rgb(var(--secondary))" opacity="0.9" />
                <circle cx="95" cy="140" r="10" fill="rgb(var(--secondary) / 0.2)" />
                {/* Label */}
                <text
                  x="105"
                  y="136"
                  fontSize="9"
                  fill="rgb(var(--muted-foreground))"
                  fontFamily="var(--font-jetbrains-mono), monospace"
                >
                  SDQ
                </text>
              </svg>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {copy.socialLinks.map((social) => {
                const Icon = socialIconByType[social.type];

                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-card text-muted-foreground shadow-card transition-[border-color,box-shadow,color,transform] duration-200 hover:-translate-y-0.5 hover:border-secondary/50 hover:text-secondary hover:shadow-premium"
                    aria-label={social.ariaLabel}
                  >
                    <Icon className="h-4 w-4" weight="regular" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation column */}
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {copy.navigationLabel}
            </p>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-secondary"
                  >
                    <span className="h-px w-4 bg-border transition-[background-color,width] duration-200 group-hover:w-6 group-hover:bg-secondary" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products column */}
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {copy.productsLabel}
            </p>
            <ul className="space-y-3">
              {copy.productLinks.map((product) => (
                <li key={product.label}>
                  <a
                    href={product.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-secondary"
                  >
                    <span className="h-px w-4 bg-border transition-[background-color,width] duration-200 group-hover:w-6 group-hover:bg-secondary" />
                    {product.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {copy.contactLabel}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card text-muted-foreground shadow-card">
                  <MapPin className="h-3.5 w-3.5" weight="regular" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{contactInfo.addressLabel}</p>
                  <p className="text-sm leading-snug text-foreground">{contactInfo.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card text-muted-foreground shadow-card">
                  <EnvelopeSimple className="h-3.5 w-3.5" weight="regular" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{contactInfo.emailLabel}</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-foreground transition-colors hover:text-secondary"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card text-muted-foreground shadow-card">
                  <PhoneCall className="h-3.5 w-3.5" weight="regular" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{contactInfo.phoneLabel}</p>
                  <a
                    href={getPhoneHref(contactInfo.phone)}
                    className="text-sm text-foreground transition-colors hover:text-secondary"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Global Lift. {copy.rights}
          </p>
          {copy.legalLinks.length > 0 ? (
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              {copy.legalLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition-colors hover:text-secondary">
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
