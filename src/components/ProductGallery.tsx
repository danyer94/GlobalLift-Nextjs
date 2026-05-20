import { useCallback, useEffect, useReducer, type CSSProperties } from "react";
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

type CarouselCardStyle = CSSProperties & {
  "--carousel-x": string;
  "--carousel-x-mobile": string;
  "--carousel-y": string;
  "--carousel-z": string;
  "--carousel-rotate": string;
  "--carousel-scale": string;
  "--carousel-opacity": string;
  "--carousel-blur": string;
  "--carousel-brightness": string;
  "--carousel-saturation": string;
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

const TOTAL_SLIDES = PRODUCT_IMAGES.length;
const MAX_VISIBLE_DEPTH = 4;

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

const getCircularOffset = (index: number, currentIndex: number, total: number) => {
  let offset = index - currentIndex;

  if (offset > total / 2) {
    offset -= total;
  }

  if (offset < -total / 2) {
    offset += total;
  }

  return offset;
};

const getCarouselCardStyle = (offset: number): CarouselCardStyle => {
  const depth = Math.abs(offset);
  const direction = Math.sign(offset);
  const isActive = offset === 0;
  const travel = isActive ? 0 : direction * (68 + (depth - 1) * 14);
  const mobileTravel = isActive ? 0 : direction * (42 + (depth - 1) * 9);
  const scale = Math.max(0.38, 1 - depth * 0.16);
  const rotate = isActive ? 0 : direction * -1 * Math.min(74, 52 + depth * 8);
  const y = depth * 13;
  const z = depth * -145;
  const opacity = depth === 0 ? 1 : Math.max(0.13, 0.9 - depth * 0.18);
  const blur = depth <= 1 ? 0 : (depth - 1) * 0.9;
  const brightness = Math.max(0.48, 1 - depth * 0.11);
  const saturation = Math.max(0.72, 1 - depth * 0.05);

  return {
    "--carousel-x": `${travel}%`,
    "--carousel-x-mobile": `${mobileTravel}%`,
    "--carousel-y": `${y}px`,
    "--carousel-z": `${z}px`,
    "--carousel-rotate": `${rotate}deg`,
    "--carousel-scale": `${scale}`,
    "--carousel-opacity": `${opacity}`,
    "--carousel-blur": `${blur}px`,
    "--carousel-brightness": `${brightness}`,
    "--carousel-saturation": `${saturation}`,
    zIndex: 100 - depth * 12,
  };
};

export function ProductGallery({ heading, galleryCopy }: ProductGalleryProps) {
  const [{ currentIndex, isViewerOpen, isCarouselPaused, hoveredIndex, fallbackMap }, dispatch] = useReducer(
    galleryReducer,
    initialGalleryState,
  );
  const total = TOTAL_SLIDES;
  const autoPlayInterval = 5200;
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

  const currentTitle = getSlideTitle(currentSlide.key);
  const currentMetadata = getSlideMetadata(currentSlide.key);

  return (
    <div className="mt-20 w-full max-w-7xl mx-auto md:mt-24">
      <div
        className="product-3d-shell group relative"
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
        <div className="product-3d-orb product-3d-orb--cyan" aria-hidden="true" />
        <div className="product-3d-orb product-3d-orb--blue" aria-hidden="true" />

        <div
          className="product-3d-stage"
          data-gallery-stage="product-3d-carousel"
          aria-roledescription="carousel"
          aria-label={heading}
        >
          <div className="product-3d-horizon" aria-hidden="true" />
          <div className="product-3d-rail" aria-hidden="true" />

          {PRODUCT_IMAGES.map((slide, index) => {
            const offset = getCircularOffset(index, currentIndex, total);
            const depth = Math.abs(offset);

            if (depth > MAX_VISIBLE_DEPTH) {
              return null;
            }

            const isActive = offset === 0;
            const slideTitle = getSlideTitle(slide.key);
            const slideMetadata = getSlideMetadata(slide.key);
            const isMetadataVisible =
              hoveredIndex !== null ? hoveredIndex === index : isCarouselPaused && isActive;

            return (
              <button
                key={slide.key}
                type="button"
                className={`product-3d-card ${isActive ? "product-3d-card--active" : "product-3d-card--depth"}`}
                style={getCarouselCardStyle(offset)}
                data-carousel-card="true"
                data-carousel-active={isActive ? "true" : "false"}
                data-carousel-offset={offset}
                aria-label={isActive ? `${galleryCopy.controls.openViewer}: ${slideTitle}` : `${galleryCopy.controls.goToSlide} ${index + 1}: ${slideTitle}`}
                aria-current={isActive ? "true" : undefined}
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  if (isActive) {
                    openViewer();
                  } else {
                    goToSlide(index);
                  }
                }}
                onMouseEnter={() => { dispatch({ type: "setHovered", index }); }}
                onMouseLeave={() => { dispatch({ type: "setHovered", index: null }); }}
              >
                <span className="product-3d-card-glow" aria-hidden="true" />
                <Image
                  src={getImageSrc(slide)}
                  alt={`${heading} - ${slideTitle}`}
                  className="product-3d-image"
                  fill
                  sizes="(min-width: 1280px) 880px, (min-width: 768px) 72vw, 92vw"
                  onError={() => handleImageError(slide.key)}
                />
                <span className="product-3d-card-sheen" aria-hidden="true" />
                <span className="product-3d-card-vignette" aria-hidden="true" />

                <span
                  className={`product-3d-meta ${isMetadataVisible || isActive ? "product-3d-meta--visible" : ""}`}
                >
                  <span className="product-3d-meta-row">
                    {slideMetadata?.badge && (
                      <span className="product-3d-badge">{slideMetadata.badge}</span>
                    )}
                    <span className="product-3d-count">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="product-3d-title">{slideTitle}</span>
                  <span className="product-3d-subtitle">
                    {slideMetadata?.category ?? slideTitle}
                    {slideMetadata?.origin ? ` / ${slideMetadata.origin}` : ""}
                  </span>
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={prevSlide}
            className="product-3d-nav product-3d-nav--prev"
            aria-label={galleryCopy.controls.previousSlide}
          >
            <CaretLeft className="size-5 md:size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="product-3d-nav product-3d-nav--next"
            aria-label={galleryCopy.controls.nextSlide}
          >
            <CaretRight className="size-5 md:size-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={openViewer}
            className="product-3d-expand"
            aria-label={galleryCopy.controls.openViewer}
          >
            <span className="hidden sm:inline">{galleryCopy.controls.openViewer}</span>
            <ArrowsOutSimple className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="product-3d-control-deck" aria-label={galleryCopy.controls.goToSlide}>
          <div className="product-3d-current-copy">
            <p>{heading}</p>
            <h3>{currentTitle}</h3>
            <span>
              {currentMetadata?.category ?? currentTitle}
              {currentMetadata?.origin ? ` / ${currentMetadata.origin}` : ""}
            </span>
          </div>

          <div className="product-3d-dots" role="tablist" aria-label={galleryCopy.controls.goToSlide}>
            {PRODUCT_IMAGES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.key}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`product-3d-dot ${isActive ? "product-3d-dot--active" : ""}`}
                  aria-label={`${galleryCopy.controls.goToSlide} ${index + 1}`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <span aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <p className="product-3d-index" aria-live="polite">
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>

      {isViewerOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[220] flex items-center justify-center bg-primary/55 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={currentTitle}
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
                className="icon-button-overlay absolute right-4 top-4 z-20 size-10"
                aria-label={galleryCopy.controls.closeViewer}
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={prevSlide}
                className="icon-button-overlay absolute left-4 top-1/2 z-20 -translate-y-1/2 size-11"
                aria-label={galleryCopy.controls.previousImage}
              >
                <CaretLeft className="size-5" aria-hidden="true" />
              </button>

              <Image
                src={getImageSrc(currentSlide)}
                alt={`${heading} - ${currentTitle}`}
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
                className="icon-button-overlay absolute right-4 top-1/2 z-20 -translate-y-1/2 size-11"
                aria-label={galleryCopy.controls.nextImage}
              >
                <CaretRight className="size-5" aria-hidden="true" />
              </button>

              <p className="mt-3 text-center text-sm font-semibold text-foreground">
                {currentTitle}
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
