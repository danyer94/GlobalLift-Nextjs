import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Language, NavItem } from '../content/siteContent';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';

type NavigationProps = {
  items: NavItem[];
  language: Language;
  onLanguageChange: (value: Language) => void;
};

export function Navigation({
  items,
  language,
  onLanguageChange,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroZone, setIsHeroZone] = useState(false);

  const headerItems = items.filter((item) => item.href !== '#nosotros-valores');
  const mobileMenuCopy = useMemo(
    () =>
      language === 'es'
        ? {
            open: 'Abrir menu',
            close: 'Cerrar menu',
            title: 'Menu',
            navLabel: 'Navegacion movil',
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

  useEffect(() => {
    const heroSection = document.querySelector<HTMLElement>('.hero-aurora');

    if (!heroSection) {
      setIsHeroZone(false);
      return;
    }

    const createObserver = () => {
      const navOffset = window.innerWidth >= 768 ? 106 : 74;
      return new IntersectionObserver(
        ([entry]) => {
          setIsHeroZone(entry.isIntersecting);
        },
        {
          threshold: 0,
          rootMargin: `-${navOffset}px 0px 0px 0px`,
        },
      );
    };

    let observer = createObserver();
    observer.observe(heroSection);

    const rebindObserver = () => {
      observer.disconnect();
      observer = createObserver();
      observer.observe(heroSection);
    };

    window.addEventListener('resize', rebindObserver);
    window.addEventListener('orientationchange', rebindObserver);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', rebindObserver);
      window.removeEventListener('orientationchange', rebindObserver);
    };
  }, []);

  const navToneClass = isHeroZone ? 'nav-hero-blend' : 'nav-liquid-glass';
  const navLinksShellClass = isHeroZone
    ? 'nav-links-shell nav-links-shell--hero'
    : 'nav-links-shell nav-links-shell--glass';
  const desktopLinkClass = isHeroZone
    ? 'nav-link nav-link--hero'
    : 'nav-link nav-link--glass';
  const controlsClass = isHeroZone
    ? 'nav-controls nav-controls--hero'
    : 'nav-controls nav-controls--glass';
  const logoClass = isHeroZone ? 'nav-logo nav-logo--hero' : 'nav-logo';
  const mobileMenuButtonClass = isHeroZone
    ? 'nav-mobile-trigger nav-mobile-trigger--hero md:hidden'
    : 'nav-mobile-trigger nav-mobile-trigger--glass md:hidden';

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${navToneClass}`}
        aria-label="Primary"
      >
        <div className="container">
          <div className="relative flex h-16 items-center justify-between py-4 md:h-24">
            <a
              href="#top"
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2"
            >
              <Logo className={logoClass} />
            </a>

            <div
              className={`absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-3 whitespace-nowrap md:flex ${navLinksShellClass}`}
            >
              {headerItems.map((item) => (
                <a key={item.label} href={item.href} className={desktopLinkClass}>
                  {item.label}
                </a>
              ))}
            </div>

            <div
              className={`ml-auto flex shrink-0 items-center gap-2 sm:gap-3 ${controlsClass}`}
            >
              <LanguageToggle
                value={language}
                onChange={onLanguageChange}
                variant={isHeroZone ? 'hero' : 'glass'}
              />
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className={mobileMenuButtonClass}
                aria-label={mobileMenuCopy.open}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-drawer"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
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
