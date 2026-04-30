import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
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

export function ProductGallery({ heading, galleryCopy }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [fallbackMap, setFallbackMap] = useState<Record<string, boolean>>({});
  const total = PRODUCT_IMAGES.length;
  const autoPlayInterval = 5000;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  const currentSlide = PRODUCT_IMAGES[currentIndex];

  const getSlideTitle = useCallback(
    (slideKey: string) => galleryCopy.slideTitles[slideKey] ?? slideKey,
    [galleryCopy.slideTitles],
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
    setFallbackMap((prev) =>
      prev[slideKey] ? prev : { ...prev, [slideKey]: true },
    );
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
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
        setIsViewerOpen(false);
      } else if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % total);
      } else if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isViewerOpen, total]);

  return (
    <div className="mt-20 w-full max-w-6xl mx-auto md:mt-24">
      <div
        className="group relative"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
        onTouchStart={() => setIsCarouselPaused(true)}
        onTouchEnd={() => setIsCarouselPaused(false)}
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
                </div>
              );
            })}

            <div
              className="absolute inset-0 z-[15] cursor-zoom-in"
              onDoubleClick={openViewer}
              aria-hidden="true"
            />

            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/75 text-foreground shadow-[0_18px_45px_rgb(var(--primary)_/_0.18)] backdrop-blur-md transition duration-300 hover:-translate-x-0.5 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary sm:-left-5 md:-left-7 md:h-12 md:w-12"
              aria-label={galleryCopy.controls.previousSlide}
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/75 text-foreground shadow-[0_18px_45px_rgb(var(--primary)_/_0.18)] backdrop-blur-md transition duration-300 hover:translate-x-0.5 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary sm:-right-5 md:-right-7 md:h-12 md:w-12"
              aria-label={galleryCopy.controls.nextSlide}
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <button
              onClick={openViewer}
              className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground shadow-[0_18px_45px_rgb(var(--primary)_/_0.16)] backdrop-blur-md transition duration-300 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary sm:right-5 sm:top-5"
              aria-label={galleryCopy.controls.openViewer}
            >
              <span className="hidden sm:inline">{galleryCopy.controls.openViewer}</span>
              <Maximize2 className="h-4 w-4" />
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
            onClick={closeViewer}
          >
            <div
              className="relative w-full max-w-5xl rounded-2xl border border-border/70 bg-card/95 p-3 shadow-lift sm:p-4"
              onClick={(event) => event.stopPropagation()}
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
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
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
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
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
