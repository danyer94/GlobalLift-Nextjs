import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import Image from 'next/image';
import type { ProductsGalleryCopy } from '../content/siteContent';
import { withBasePath } from '../utils/basePath';

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
    key: 'products-charcoal-premium',
    src: 'images/generated/products/products-charcoal-premium.webp',
    fallbackSrc: 'images/generated/products/products-charcoal-premium.png',
  },
  {
    key: 'products-charcoal-bulk',
    src: 'images/generated/products/products-charcoal-bulk.webp',
    fallbackSrc: 'images/generated/products/products-charcoal-bulk.png',
  },
  {
    key: 'products-fruits-variety',
    src: 'images/generated/products/products-fruits-variety.webp',
    fallbackSrc: 'images/generated/products/products-fruits-variety.png',
  },
  {
    key: 'products-vegetables-variety',
    src: 'images/generated/products/products-vegetables-variety.webp',
    fallbackSrc: 'images/generated/products/products-vegetables-variety.png',
  },
  {
    key: 'products-avocado-export',
    src: 'images/generated/products/products-avocado-export.webp',
    fallbackSrc: 'images/generated/products/products-avocado-export.png',
  },
  {
    key: 'products-mango-export',
    src: 'images/generated/products/products-mango-export.webp',
    fallbackSrc: 'images/generated/products/products-mango-export.png',
  },
  {
    key: 'products-peppers-tomatoes',
    src: 'images/generated/products/products-peppers-tomatoes.webp',
    fallbackSrc: 'images/generated/products/products-peppers-tomatoes.png',
  },
  {
    key: 'products-mixed-catalog',
    src: 'images/generated/products/products-mixed-catalog.webp',
    fallbackSrc: 'images/generated/products/products-mixed-catalog.png',
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
      const relativePath = fallbackMap[slide.key] ? slide.fallbackSrc : slide.src;
      return withBasePath(relativePath);
    },
    [fallbackMap],
  );

  const handleImageError = useCallback((slideKey: string) => {
    setFallbackMap((prev) => (prev[slideKey] ? prev : { ...prev, [slideKey]: true }));
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
      if (event.key === 'Escape') {
        setIsViewerOpen(false);
      } else if (event.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % total);
      } else if (event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isViewerOpen, total]);

  return (
    <div className="mt-20 md:mt-24 w-full max-w-5xl mx-auto">
      <div
        className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft sm:aspect-[21/9]"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
        onTouchStart={() => setIsCarouselPaused(true)}
        onTouchEnd={() => setIsCarouselPaused(false)}
      >
        {PRODUCT_IMAGES.map((slide, index) => {
          const shouldRender = index === currentIndex || index === prevIndex || index === nextIndex;

          if (!shouldRender) {
            return null;
          }

          const slideTitle = getSlideTitle(slide.key);

          return (
            <div
              key={slide.key}
              className={`media-crossfade absolute inset-0 ${
                index === currentIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={getImageSrc(slide)}
                alt={`${heading} - ${slideTitle}`}
                className="h-full w-full object-cover"
                fill
                sizes="(min-width: 640px) 80vw, 100vw"
                priority={index === currentIndex && currentIndex === 0}
                onError={() => handleImageError(slide.key)}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/45 via-primary/10 to-transparent" />
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
          className="icon-button-overlay absolute left-4 top-1/2 z-20 -translate-y-1/2 opacity-95 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          aria-label={galleryCopy.controls.previousSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="icon-button-overlay absolute right-4 top-1/2 z-20 -translate-y-1/2 opacity-95 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          aria-label={galleryCopy.controls.nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <button
          onClick={openViewer}
          className="icon-button-overlay absolute bottom-6 right-6 z-20"
          aria-label={galleryCopy.controls.openViewer}
        >
          <Maximize2 className="h-6 w-6" />
        </button>

        <div className="absolute bottom-6 left-6 z-20">
          <span className="rounded-full border border-primary-foreground/25 bg-primary/80 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg backdrop-blur-md">
            {getSlideTitle(currentSlide.key)}
          </span>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        {PRODUCT_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 bg-secondary shadow-[0_0_0_4px_rgb(var(--secondary)_/_0.18)]'
                : 'w-2.5 bg-secondary/25 hover:bg-secondary/45'
            }`}
            aria-label={`${galleryCopy.controls.goToSlide} ${index + 1}`}
          />
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
                style={{ maxHeight: '78vh', width: '100%', height: 'auto' }}
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
