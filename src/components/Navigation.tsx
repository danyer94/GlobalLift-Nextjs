import { ArrowRight, List, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Language, NavItem } from "../content/siteContent";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";

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
	const [activeHref, setActiveHref] = useState<string | null>(null);
	const [scrollProgress, setScrollProgress] = useState(0);
	const menuTriggerRef = useRef<HTMLButtonElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const mobileMenuPanelRef = useRef<HTMLElement>(null);
	const wasMenuOpenRef = useRef(false);

	const headerItems = useMemo(
		() => items.filter((item) => item.href !== "#nosotros-valores"),
		[items],
	);
	const mobileMenuItems = useMemo(
		() => headerItems.filter((item) => item.href !== "#contact"),
		[headerItems],
	);
	const contactItem = useMemo(
		() => headerItems.find((item) => item.href === "#contact"),
		[headerItems],
	);
	const mobileMenuCopy = useMemo(
		() =>
			language === "es"
				? {
						open: "Abrir menu",
						close: "Cerrar menu",
						title: "Menú",
						navLabel: "Navegacion movil",
						cta: "Solicitar propuesta",
					}
				: {
						open: "Open menu",
						close: "Close menu",
						title: "Menu",
						navLabel: "Mobile navigation",
						cta: "Request proposal",
					},
		[language],
	);

	const closeMobileMenu = useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	const openMobileMenu = useCallback(() => {
		setIsMenuOpen(true);
	}, []);

	useEffect(() => {
		if (isMenuOpen) {
			const focusFrame = window.requestAnimationFrame(() => {
				closeButtonRef.current?.focus();
			});

			wasMenuOpenRef.current = true;
			return () => window.cancelAnimationFrame(focusFrame);
		}

		if (wasMenuOpenRef.current) {
			menuTriggerRef.current?.focus();
			wasMenuOpenRef.current = false;
		}
	}, [isMenuOpen]);

	useEffect(() => {
		if (!isMenuOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeMobileMenu();
				return;
			}

			if (event.key !== "Tab") return;

			const panel = mobileMenuPanelRef.current;
			if (!panel) return;

			const focusableElements = Array.from(
				panel.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
				),
			).filter((element) => !element.hasAttribute("disabled"));

			const firstFocusable = focusableElements[0];
			const lastFocusable = focusableElements[focusableElements.length - 1];

			if (!firstFocusable || !lastFocusable) return;

			if (event.shiftKey && document.activeElement === firstFocusable) {
				event.preventDefault();
				lastFocusable.focus();
				return;
			}

			if (!event.shiftKey && document.activeElement === lastFocusable) {
				event.preventDefault();
				firstFocusable.focus();
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [closeMobileMenu, isMenuOpen]);

	useEffect(() => {
		if (!isMenuOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isMenuOpen]);

	useEffect(() => {
		if (!isMenuOpen) return;

		const closeOnDesktopBreakpoint = () => {
			if (window.innerWidth >= 768) {
				closeMobileMenu();
			}
		};

		closeOnDesktopBreakpoint();
		window.addEventListener("resize", closeOnDesktopBreakpoint);
		window.addEventListener("orientationchange", closeOnDesktopBreakpoint);

		return () => {
			window.removeEventListener("resize", closeOnDesktopBreakpoint);
			window.removeEventListener("orientationchange", closeOnDesktopBreakpoint);
		};
	}, [closeMobileMenu, isMenuOpen]);

	useEffect(() => {
		const heroSection = document.querySelector<HTMLElement>(".hero-aurora");

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

		window.addEventListener("resize", rebindObserver);
		window.addEventListener("orientationchange", rebindObserver);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", rebindObserver);
			window.removeEventListener("orientationchange", rebindObserver);
		};
	}, []);


	useEffect(() => {
		const sections: HTMLElement[] = [];
		for (const item of headerItems) {
			const id = item.href.replace("#", "");
			if (!id) continue;
			const section = document.getElementById(id);
			if (section) {
				sections.push(section);
			}
		}

		if (!sections.length) return;

		const setNearestSection = () => {
			const navOffset = window.innerWidth >= 768 ? 128 : 88;
			const viewportAnchor = navOffset + window.innerHeight * 0.28;
			let nearest: HTMLElement | null = null;

			for (const section of sections) {
				const rect = section.getBoundingClientRect();
				if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
					nearest = section;
					break;
				}
			}

			if (!nearest) {
				nearest = sections.find((section) => {
					const rect = section.getBoundingClientRect();
					return rect.top >= navOffset;
				}) ?? sections[sections.length - 1] ?? null;
			}

			if (nearest) {
				setActiveHref(`#${nearest.id}`);
			}
		};

		setNearestSection();
		window.addEventListener("scroll", setNearestSection, { passive: true });
		window.addEventListener("resize", setNearestSection);
		window.addEventListener("orientationchange", setNearestSection);

		return () => {
			window.removeEventListener("scroll", setNearestSection);
			window.removeEventListener("resize", setNearestSection);
			window.removeEventListener("orientationchange", setNearestSection);
		};
	}, [headerItems]);

	useEffect(() => {
		const updateScrollProgress = () => {
			const scrollableHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress =
				scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
			setScrollProgress(Math.min(1, Math.max(0, progress)));
		};

		updateScrollProgress();
		window.addEventListener("scroll", updateScrollProgress, { passive: true });
		window.addEventListener("resize", updateScrollProgress);
		window.addEventListener("orientationchange", updateScrollProgress);

		return () => {
			window.removeEventListener("scroll", updateScrollProgress);
			window.removeEventListener("resize", updateScrollProgress);
			window.removeEventListener("orientationchange", updateScrollProgress);
		};
	}, []);

	const navToneClass = isHeroZone ? "nav-hero-blend" : "nav-liquid-glass";
	const navLinksShellClass = isHeroZone
		? "nav-links-shell nav-links-shell--hero"
		: "nav-links-shell nav-links-shell--glass";
	const desktopLinkClass = isHeroZone
		? "nav-link nav-link--hero"
		: "nav-link nav-link--glass";
	const controlsClass = isHeroZone
		? "nav-controls nav-controls--hero"
		: "nav-controls nav-controls--glass";
	const logoClass = isHeroZone ? "nav-logo nav-logo--hero" : "nav-logo";
	const mobileMenuButtonClass = isHeroZone
		? "nav-mobile-trigger nav-mobile-trigger--hero md:hidden"
		: "nav-mobile-trigger nav-mobile-trigger--glass md:hidden";

	return (
		<>
			<nav
				className={`fixed top-0 z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${navToneClass}`}
				aria-label="Primary"
				style={{ "--nav-progress": `${scrollProgress * 100}%` } as CSSProperties}
			>
				<div className="container">
					<div className="relative flex h-16 items-center justify-between py-4 md:h-24">
						<a
							href="#top"
							className="absolute left-0 top-1/2 z-20 -translate-y-1/2"
						>
							<Logo
								className={logoClass}
								variant={isHeroZone ? "hero" : "default"}
							/>
						</a>

						<div
							className={`absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-3 whitespace-nowrap md:flex ${navLinksShellClass}`}
						>
							{headerItems.map((item) => (
								<a
									key={item.label}
									href={item.href}
									className={`${desktopLinkClass} ${
										activeHref === item.href ? "nav-link--active" : ""
									}`}
									aria-current={activeHref === item.href ? "page" : undefined}
								>
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
								variant={isHeroZone ? "hero" : "glass"}
							/>
							<button
								ref={menuTriggerRef}
								type="button"
								onClick={openMobileMenu}
								className={mobileMenuButtonClass}
								aria-label={mobileMenuCopy.open}
								aria-expanded={isMenuOpen}
								aria-controls="mobile-nav-drawer"
							>
								<List className="size-5" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
			</nav>

			<div
				className={`mobile-menu-root fixed inset-0 z-[70] md:hidden ${
					isMenuOpen
						? "mobile-menu-root--open pointer-events-auto"
						: "pointer-events-none"
				}`}
				aria-hidden={!isMenuOpen}
			>
				<button
					type="button"
					className="mobile-menu-backdrop absolute inset-0"
					aria-label={mobileMenuCopy.close}
					onClick={closeMobileMenu}
					tabIndex={-1}
				/>

				<aside
					ref={mobileMenuPanelRef}
					id="mobile-nav-drawer"
					className="mobile-menu-panel absolute inset-y-0 right-0 z-[71] flex h-full w-[min(91vw,430px)] flex-col overflow-x-hidden overflow-y-auto p-5 text-foreground"
					role="dialog"
					aria-modal="true"
					aria-label={mobileMenuCopy.navLabel}
				>
					<div
						className="mobile-menu-orb mobile-menu-orb--one"
						aria-hidden="true"
					/>
					<div
						className="mobile-menu-orb mobile-menu-orb--two"
						aria-hidden="true"
					/>

					<div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/30 pb-5">
						<div className="space-y-3">
							<Logo className="nav-logo" variant="default" />
							<h2 className="mobile-menu-title">{mobileMenuCopy.title}</h2>
						</div>
						<button
							ref={closeButtonRef}
							type="button"
							onClick={closeMobileMenu}
							className="mobile-menu-close"
							aria-label={mobileMenuCopy.close}
							tabIndex={isMenuOpen ? 0 : -1}
						>
							<X className="size-5" aria-hidden="true" />
						</button>
					</div>

					<div className="relative z-10 mt-6 flex flex-1 flex-col justify-between gap-6">
						<div
							className="mobile-menu-links"
							aria-label={mobileMenuCopy.navLabel}
						>
							{mobileMenuItems.map((item, index) => (
								<a
									key={item.label}
									href={item.href}
									onClick={closeMobileMenu}
									className="mobile-menu-link"
									style={{ "--item-index": index } as CSSProperties}
									tabIndex={isMenuOpen ? 0 : -1}
								>
									<span className="mobile-menu-link-index">
										{String(index + 1).padStart(2, "0")}
									</span>
									<span>{item.label}</span>
									<ArrowRight
										className="mobile-menu-link-icon size-4"
										aria-hidden="true"
									/>
								</a>
							))}
						</div>

						<a
							href="#contact"
							onClick={closeMobileMenu}
							className="mobile-menu-cta"
							tabIndex={isMenuOpen ? 0 : -1}
						>
							{contactItem ? mobileMenuCopy.cta : "Contact"}
							<ArrowRight className="size-4" aria-hidden="true" />
						</a>
					</div>
				</aside>
			</div>
		</>
	);
}
