import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Language, NavItem, NavigationCopy } from '../content/siteContent';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';

type NavigationProps = {
  items: NavItem[];
  copy: NavigationCopy;
  language: Language;
  onLanguageChange: (value: Language) => void;
};

export function Navigation({ items, copy, language, onLanguageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerItems = items.filter((item) => item.href !== '#nosotros-valores');
  const mobileMenuCopy = useMemo(
    () =>
      language === 'es'
        ? {
            open: 'Abrir menú',
            close: 'Cerrar menú',
            title: 'Menú',
            navLabel: 'Navegación móvil',
          }
        : {
            open: 'Open menu',
            close: 'Close menu',
            title: 'Menu',
            navLabel: 'Mobile navigation',
          },
    [language],
  );

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnDesktopBreakpoint = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    closeOnDesktopBreakpoint();
    window.addEventListener('resize', closeOnDesktopBreakpoint);
    window.addEventListener('orientationchange', closeOnDesktopBreakpoint);

    return () => {
      window.removeEventListener('resize', closeOnDesktopBreakpoint);
      window.removeEventListener('orientationchange', closeOnDesktopBreakpoint);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full nav-blur" aria-label="Primary">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <a href="#top">
              <Logo />
            </a>

            <div className="hidden items-center gap-6 md:flex lg:gap-8">
              {headerItems.map((item) => (
                <a key={item.label} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-secondary">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <LanguageToggle value={language} onChange={onLanguageChange} />
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/80 text-primary transition-colors hover:border-secondary/40 hover:text-secondary md:hidden"
                aria-label={mobileMenuCopy.open}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-drawer"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <a href="#contact" className="btn btn-contact hidden lg:inline-flex">
                {copy.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[70] md:hidden ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-primary/30 backdrop-blur-sm transition-opacity ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label={mobileMenuCopy.close}
          onClick={() => setIsMenuOpen(false)}
        />

        <aside
          id="mobile-nav-drawer"
          className={`absolute inset-y-0 right-0 z-[71] flex h-full w-[min(88vw,420px)] flex-col border-l border-border/80 bg-background/96 p-5 text-foreground shadow-[-22px_0_64px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-[108%]'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={mobileMenuCopy.navLabel}
        >
          <div className="mb-6 flex items-center justify-between border-b border-border/70 pb-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {mobileMenuCopy.title}
            </p>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-card text-primary transition-colors hover:border-secondary/40 hover:text-secondary"
              aria-label={mobileMenuCopy.close}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/80 bg-card/70">
            {headerItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-4 text-base font-semibold text-primary transition-colors hover:bg-secondary/8 hover:text-secondary ${
                  index < headerItems.length - 1 ? 'border-b border-border/75' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
