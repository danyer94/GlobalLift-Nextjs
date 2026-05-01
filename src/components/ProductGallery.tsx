import { useCallback, useEffect, useReducer } from "react";
import { createPortal } from "react-dom";
import { CaretLeft, CaretRight, ArrowsOutSimple, X } from "@phosphor-icons/react";
import Image from "next/image";
import type { ProductsGalleryCopy } from "../content/siteContent";
import { withBasePath } from "../utils/basePath";

type ProductGalleryProps = {
  heading: string;
  galleryCopy: ProductsGalleryCopy;
};

type ProductSlide = {
  key: string;
  src: string;
  fallbackSrc: string;
};

type GalleryState = {
  currentIndex: number;
  isViewerOpen: boolean;
  isCarouselPaused: boolean;
  hoveredIndex: number | null;
  fallbackMap: Record<string, boolean>;
};

type GalleryAction =
  | { type: "next" }
  | { type: "previous" }
  | { type: "goTo"; index: number }
  | { type: "openViewer" }
  | { type: "closeViewer" }
  | { type: "setPaused"; paused: boolean }
  | { type: "setHovered"; index: number | null }
  | { type: "imageError"; slideKey: string };

const PRODUCT_IMAGES: ProductSlide[] = [
  {
    key: "products-charcoal-premium",
    src: "images/generated/products/products-charcoal-premium.webp",
    fallbackSrc: "images/generated/products/products-charcoal-premium.png",
  },
  {
    key: "products-fruits-variety",
    src: "images/generated/products/products-fruits-variety.webp",
    fallbackSrc: "images/generated/products/products-fruits-variety.png",
  },
  {
    key: "products-mango-export",
    src: "images/generated/products/products-mango-export.webp",
    fallbackSrc: "images/generated/products/products-mango-export.png",
  },
  {
    key: "products-peppers-tomatoes",
    src: "images/generated/products/products-peppers-tomatoes.webp",
    fallbackSrc: "images/generated/products/products-peppers-tomatoes.png",
  },
  {
    key: "products-mixed-catalog",
    src: "images/generated/products/products-mixed-catalog.webp",
    fallbackSrc: "images/generated/products/products-mixed-catalog.png",
  },
  {
    key: "products-charcoal-bulk",
    src: "images/generated/products/products-charcoal-bulk.webp",
    fallbackSrc: "images/generated/products/products-charcoal-bulk.png",
  },
  {
    key: "products-vegetables-variety",
    src: "images/generated/products/products-vegetables-variety.webp",
    fallbackSrc: "images/generated/products/products-vegetables-variety.png",
  },
  {
    key: "products-avocado-export",
    src: "images/generated/products/products-avocado-export.webp",
    fallbackSrc: "images/generated/products/products-avocado-export.png",
  },
];

const TOTAL_SLIDES = PRODUCT_IMAGES.length;

const initialGalleryState: GalleryState = {
  currentIndex: 0,
  isViewerOpen: false,
  isCarouselPaused: false,
  hoveredIndex: null,
  fallbackMap: {},
};

const galleryReducer = (state: GalleryState, action: GalleryAction): GalleryState => {
  switch (action.type) {
    case "next":
      return { ...state, currentIndex: (state.currentIndex + 1) % TOTAL_SLIDES };
    case "previous":
      return { ...state, currentIndex: (state.currentIndex - 1 + TOTAL_SLIDES) % TOTAL_SLIDES };
    case "goTo":
      return { ...state, currentIndex: action.index };
    case "openViewer":
      return { ...state, isViewerOpen: true };
    case "closeViewer":
      return { ...state, isViewerOpen: false };
    case "setPaused":
      return { ...state, isCarouselPaused: action.paused };
    case "setHovered":
      return { ...state, hoveredIndex: action.index };
    case "imageError":
      return state.fallbackMap[action.slideKey]
        ? state
        : { ...state, fallbackMap: { ...state.fallbackMap, [action.slideKey]: true } };
    default:
      return state;
  }
};

export function ProductGallery({ heading, galleryCopy }: ProductGalleryProps) {
  const [{ currentIndex, isViewerOpen, isCarouselPaused, hoveredIndex, fallbackMap }, dispatch] = useReducer(
    galleryReducer,
    initialGalleryState,
  );
  const total = TOTAL_SLIDES;
  const autoPlayInterval = 5000;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  const currentSlide = PRODUCT_IMAGES[currentIndex];

  const getSlideTitle = useCallback(
    (slideKey: string) => galleryCopy.slideTitles[slideKey] ?? slideKey,
    [galleryCopy.slideTitles],
  );

  const getSlideMetadata = useCallback(
    (slideKey: string) => galleryCopy.slideMetadata[slideKey],
    [galleryCopy.slideMetadata],
  );

  const getImageSrc = useCallback(
    (slide: ProductSlide) => {
      const relativePath = fallbackMap[slide.key]
        ? slide.fallbackSrc
        : slide.src;
      return withBasePath(relativePath);
    },
    [fallbackMap],
  );

  const handleImageError = useCallback((slideKey: string) => {
    dispatch({ type: "imageError", slideKey });
  }, []);

  const nextSlide = useCallback(() => {
    dispatch({ type: "next" });
  }, []);

  const prevSlide = useCallback(() => {
    dispatch({ type: "previous" });
  }, []);

  const goToSlide = useCallback((index: number) => {
    dispatch({ type: "goTo", index });
  }, []);

  const openViewer = useCallback(() => {
    dispatch({ type: "openViewer" });
  }, []);

  const closeViewer = useCallback(() => {
    dispatch({ type: "closeViewer" });
  }, []);

  useEffect(() => {
    if (isViewerOpen || isCarouselPaused) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isViewerOpen, isCarouselPaused, nextSlide]);

  useEffect(() => {
    if (!isViewerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch({ type: "closeViewer" });
      } else if (event.key === "ArrowRight") {
        dispatch({ type: "next" });
      } else if (event.key === "ArrowLeft") {
        dispatch({ type: "previous" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isViewerOpen]);

  return (
    <div className="mt-20 w-full max-w-6xl mx-auto md:mt-24">
      <div
        className="group relative"
        onMouseEnter={() => { dispatch({ type: "setPaused", paused: true }); }}
        onMouseLeave={() => {
          dispatch({ type: "setPaused", paused: false });
          dispatch({ type: "setHovered", index: null });
        }}
        onTouchStart={() => { dispatch({ type: "setPaused", paused: true }); }}
        onTouchEnd={() => {
          dispatch({ type: "setPaused", paused: false });
          dispatch({ type: "setHovered", index: null });
        }}
      >
        <div
          className="pointer-events-none absolute -inset-x-4 top-8 h-[72%] rounded-[3rem] bg-[radial-gradient(circle_at_50%_40%,rgb(var(--secondary)_/_0.22),transparent_62%)] blur-3xl md:-inset-x-10"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="relative aspect-[3/2] w-full">
            {PRODUCT_IMAGES.map((slide, index) => {
              const shouldRender =
                index === currentIndex ||
                index === prevIndex ||
                index === nextIndex;

              if (!shouldRender) {
                return null;
              }

              const slideTitle = getSlideTitle(slide.key);
              const slideMetadata = getSlideMetadata(slide.key);

              return (
                <div
                  key={slide.key}
                  className={`media-crossfade absolute inset-0 ${
                    index === currentIndex
                      ? "opacity-100 z-10 pointer-events-auto"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={getImageSrc(slide)}
                    alt={`${heading} - ${slideTitle}`}
                    className="h-full w-full rounded-[1.75rem] object-contain shadow-[0_30px_90px_rgb(var(--primary)_/_0.22)]"
                    fill
                    sizes="(min-width: 1024px) 960px, (min-width: 640px) 86vw, 100vw"
                    priority={index === currentIndex && currentIndex === 0}
                    onError={() => handleImageError(slide.key)}
                  />
                  {/* Hover metadata overlay */}
                  <div
                    className={`absolute inset-x-0 bottom-0 z-[14] flex translate-y-0 items-end gap-3 rounded-b-[1.75rem] px-6 pb-6 opacity-100 transition-[opacity,transform] duration-300 ${
                      (hoveredIndex !== null ? hoveredIndex === index : isCarouselPaused && index === currentIndex)
                        ? "sm:translate-y-0 sm:opacity-100"
                        : "sm:pointer-events-none sm:translate-y-2 sm:opacity-0"
                    }`}
                    style={{
                      background: "linear-gradient(to top, rgb(var(--primary) / 0.72) 0%, transparent 100%)",
                    }}
                  >
                    {slideMetadata?.badge && (
                      <span className="rounded-full border border-white/30 bg-white/16 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                        {slideMetadata.badge}
                      </span>
                    )}
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-semibold text-white">{slideMetadata?.category ?? slideTitle}</p>
                      {slideMetadata?.origin ? (
                        <p className="text-xs text-white/70">{slideMetadata.origin}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/75 text-foreground shadow-[0_18px_45px_rgb(var(--primary)_/_0.18)] backdrop-blur-md transition duration-300 hover:-translate-x-0.5 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary sm:-left-5 md:-left-7 md:h-12 md:w-12"
              aria-label={galleryCopy.controls.previousSlide}
            >
              <CaretLeft className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/75 text-foreground shadow-[0_18px_45px_rgb(var(--primary)_/_0.18)] backdrop-blur-md transition duration-300 hover:translate-x-0.5 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary sm:-right-5 md:-right-7 md:h-12 md:w-12"
              aria-label={galleryCopy.controls.nextSlide}
            >
              <CaretRight className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
            </button>

            <button
              onClick={openViewer}
              className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground shadow-[0_18px_45px_rgb(var(--primary)_/_0.16)] backdrop-blur-md transition duration-300 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary sm:right-5 sm:top-5"
              aria-label={galleryCopy.controls.openViewer}
            >
              <span className="hidden sm:inline">{galleryCopy.controls.openViewer}</span>
              <ArrowsOutSimple className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative z-20 mx-auto mt-6 flex max-w-5xl flex-col gap-4 border-t border-border/60 pt-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-muted-foreground">
              {heading}
            </p>
            <h3 className="font-display text-2xl font-semibold leading-tight text-foreground md:text-3xl">
              {getSlideTitle(currentSlide.key)}
            </h3>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-5xl gap-3 overflow-x-auto pb-3">
        {PRODUCT_IMAGES.map((slide, index) => (
          <button
            key={slide.key}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => { dispatch({ type: "setHovered", index }); }}
            onMouseLeave={() => { dispatch({ type: "setHovered", index: null }); }}
            className={`relative h-20 min-w-28 overflow-hidden rounded-2xl border transition duration-300 sm:h-24 sm:min-w-36 ${
              index === currentIndex
                ? "border-secondary shadow-[0_0_0_4px_rgb(var(--secondary)_/_0.16)]"
                : "border-border/70 opacity-55 hover:border-secondary/60 hover:opacity-100"
            }`}
            aria-label={`${galleryCopy.controls.goToSlide} ${index + 1}`}
          >
            <Image
              src={getImageSrc(slide)}
              alt=""
              className="h-full w-full object-cover"
              fill
              sizes="144px"
              onError={() => handleImageError(slide.key)}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-1 ${
                index === currentIndex ? "bg-secondary" : "bg-transparent"
              }`}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      {isViewerOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[220] flex items-center justify-center bg-primary/55 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={getSlideTitle(currentSlide.key)}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              aria-label={galleryCopy.controls.closeViewer}
              onClick={closeViewer}
            />
            <div
              className="relative z-10 w-full max-w-5xl rounded-2xl border border-border/70 bg-card/95 p-3 shadow-lift sm:p-4"
            >
              <button
                type="button"
                onClick={closeViewer}
                className="icon-button-overlay absolute right-4 top-4 z-20 h-10 w-10"
                aria-label={galleryCopy.controls.closeViewer}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={prevSlide}
                className="icon-button-overlay absolute left-4 top-1/2 z-20 -translate-y-1/2 h-11 w-11"
                aria-label={galleryCopy.controls.previousImage}
              >
                <CaretLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <Image
                src={getImageSrc(currentSlide)}
                alt={`${heading} - ${getSlideTitle(currentSlide.key)}`}
                className="max-h-[78vh] w-full rounded-xl bg-background/70 object-contain"
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 960px, 100vw"
                style={{ maxHeight: "78vh", width: "100%", height: "auto" }}
                onError={() => handleImageError(currentSlide.key)}
              />

              <button
                type="button"
                onClick={nextSlide}
                className="icon-button-overlay absolute right-4 top-1/2 z-20 -translate-y-1/2 h-11 w-11"
                aria-label={galleryCopy.controls.nextImage}
              >
                <CaretRight className="h-5 w-5" aria-hidden="true" />
              </button>

              <p className="mt-3 text-center text-sm font-semibold text-foreground">
                {getSlideTitle(currentSlide.key)}
              </p>
              <p className="text-center text-xs text-muted-foreground">
                {currentIndex + 1} / {total}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
