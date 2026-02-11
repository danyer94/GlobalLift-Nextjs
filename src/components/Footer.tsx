import type { NavItem } from '../content/siteContent';
import { Logo } from './Logo';

type FooterProps = {
  items: NavItem[];
  note: string;
};

export function Footer({ items, note }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-4">
            <a href="#top">
              <Logo />
            </a>
            <p className="text-sm text-muted-foreground max-w-md">{note}</p>
          </div>
          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors hover:text-secondary ${
                  item.href === '#contact' ? 'font-semibold text-primary' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 h-px bg-border/70" aria-hidden="true" />
        <p className="mt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} Global Lift SRL</p>
      </div>
    </footer>
  );
}
