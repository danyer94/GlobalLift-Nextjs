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
  fallbackMap: Record<string, boolean>;
};

type GalleryAction =
  | { type: "next" }
  | { type: "previous" }
  | { type: "goTo"; index: number }
  | { type: "openViewer" }
  | { type: "closeViewer" }
  | { type: "setPaused"; paused: boolean }
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
  "--carousel-reflection-opacity": string;
  "--carousel-reflection-blur": string;
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
  {
    key: "products-pineapple-export",
    src: "images/generated/products/products-pineapple-export.webp",
    fallbackSrc: "images/generated/products/products-pineapple-export.png",
  },
  {
    key: "products-cocoa-export",
    src: "images/generated/products/products-cocoa-export.webp",
    fallbackSrc: "images/generated/products/products-cocoa-export.png",
  },
  {
    key: "products-coffee-export",
    src: "images/generated/products/products-coffee-export.webp",
    fallbackSrc: "images/generated/products/products-coffee-export.png",
  },
  {
    key: "products-bananas-export",
    src: "images/generated/products/products-bananas-export.webp",
    fallbackSrc: "images/generated/products/products-bananas-export.png",
  },
  {
    key: "products-coconuts-export",
    src: "images/generated/products/products-coconuts-export.webp",
    fallbackSrc: "images/generated/products/products-coconuts-export.png",
  },
  {
    key: "products-limes-export",
    src: "images/generated/products/products-limes-export.webp",
    fallbackSrc: "images/generated/products/products-limes-export.png",
  },
  {
    key: "products-coconut-oil-export",
    src: "images/generated/products/products-coconut-oil-export.webp",
    fallbackSrc: "images/generated/products/products-coconut-oil-export.png",
  },
  {
    key: "products-oregano-export",
    src: "images/generated/products/products-oregano-export.webp",
    fallbackSrc: "images/generated/products/products-oregano-export.png",
  },
  {
    key: "products-cassava-export",
    src: "images/generated/products/products-cassava-export.webp",
    fallbackSrc: "images/generated/products/products-cassava-export.png",
  },
  {
    key: "products-honey-export",
    src: "images/generated/products/products-honey-export.webp",
    fallbackSrc: "images/generated/products/products-honey-export.png",
  },
];

const TOTAL_SLIDES = PRODUCT_IMAGES.length;

const initialGalleryState: GalleryState = {
  currentIndex: 0,
  isViewerOpen: false,
  isCarouselPaused: false,
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
  const travel = isActive ? 0 : direction * (54 + (depth - 1) * 25);
  const mobileTravel = isActive ? 0 : direction * (36 + (depth - 1) * 14);
  const scale = Math.max(0.34, 1 - depth * 0.13);
  const rotate = isActive ? 0 : direction * -1 * Math.min(78, 46 + depth * 7);
  const y = depth * 8;
  const z = depth * -128;
  const opacity = 1;
  const blur = depth <= 1 ? 0 : (depth - 1) * 0.55;
  const brightness = Math.max(0.52, 1 - depth * 0.09);
  const saturation = Math.max(0.72, 1 - depth * 0.04);
  const reflectionOpacity = Math.max(0.06, 0.32 - depth * 0.06);
  const reflectionBlur = 0.8 + depth * 0.32;

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
    "--carousel-reflection-opacity": `${reflectionOpacity}`,
    "--carousel-reflection-blur": `${reflectionBlur}px`,
    zIndex: 100 - depth * 8,
  };
};

export function ProductGallery({ heading, galleryCopy }: ProductGalleryProps) {
  const [{ currentIndex, isViewerOpen, isCarouselPaused, fallbackMap }, dispatch] = useReducer(
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
        }}
        onTouchStart={() => { dispatch({ type: "setPaused", paused: true }); }}
        onTouchEnd={() => {
          dispatch({ type: "setPaused", paused: false });
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
          <div className="product-3d-floor" aria-hidden="true" />
          <div className="product-3d-floor-light" aria-hidden="true" />

          {PRODUCT_IMAGES.map((slide, index) => {
            const offset = getCircularOffset(index, currentIndex, total);
            const isActive = offset === 0;
            const slideTitle = getSlideTitle(slide.key);
            const imageSrc = getImageSrc(slide);

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
              >
                <span className="product-3d-reflection" aria-hidden="true">
                  <Image
                    src={imageSrc}
                    alt=""
                    className="product-3d-reflection-image"
                    fill
                    sizes="(min-width: 1280px) 520px, (min-width: 768px) 44vw, 76vw"
                    onError={() => handleImageError(slide.key)}
                  />
                  <span className="product-3d-reflection-mask" />
                </span>

                <span className="product-3d-frame">
                  <span className="product-3d-card-glow" aria-hidden="true" />
                  <Image
                    src={imageSrc}
                    alt={`${heading} - ${slideTitle}`}
                    className="product-3d-image"
                    fill
                    sizes="(min-width: 1280px) 760px, (min-width: 768px) 64vw, 92vw"
                    onError={() => handleImageError(slide.key)}
                  />
                  <span className="product-3d-card-sheen" aria-hidden="true" />
                  <span className="product-3d-card-vignette" aria-hidden="true" />
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={openViewer}
            className="product-3d-expand"
            aria-label={galleryCopy.controls.openViewer}
          >
            <ArrowsOutSimple className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="product-3d-meta" aria-live="polite">
          <span className="product-3d-meta-count">
            {String(currentIndex + 1).padStart(2, "0")} / {total}
          </span>
          <span className="product-3d-meta-divider" aria-hidden="true" />
          <span className="product-3d-meta-title">{currentTitle}</span>
          {currentMetadata ? (
            <>
              <span className="product-3d-meta-divider" aria-hidden="true" />
              <span className="product-3d-meta-detail">
                {currentMetadata.category} · {currentMetadata.origin}
              </span>
            </>
          ) : null}
          {currentMetadata?.badge ? (
            <span className="product-3d-meta-badge">{currentMetadata.badge}</span>
          ) : null}
        </div>

        <div className="product-3d-control-deck" aria-label={galleryCopy.controls.goToSlide}>
          <button
            type="button"
            onClick={prevSlide}
            className="product-3d-control-arrow"
            aria-label={galleryCopy.controls.previousSlide}
          >
            <CaretLeft className="size-4" aria-hidden="true" />
          </button>

          <div className="product-3d-dots" role="tablist" aria-label={galleryCopy.controls.goToSlide}>
            {(() => {
              const MAX_VISIBLE = 7;
              if (total <= MAX_VISIBLE) {
                return PRODUCT_IMAGES.map((slide, index) => {
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
                });
              }

              const half = Math.floor(MAX_VISIBLE / 2);
              let windowStart = currentIndex - half;
              let windowEnd = currentIndex + half;

              if (windowStart < 0) {
                windowStart = 0;
                windowEnd = MAX_VISIBLE - 1;
              }
              if (windowEnd >= total) {
                windowEnd = total - 1;
                windowStart = total - MAX_VISIBLE;
              }

              return PRODUCT_IMAGES.slice(windowStart, windowEnd + 1).map((slide, i) => {
                const realIndex = windowStart + i;
                const isActive = realIndex === currentIndex;
                const isEdge = i === 0 || i === (windowEnd - windowStart);
                const isNearEdge = i === 1 || i === (windowEnd - windowStart - 1);
                const scaleClass = isEdge && !isActive
                  ? "product-3d-dot--small"
                  : isNearEdge && !isActive
                    ? "product-3d-dot--medium"
                    : "";

                return (
                  <button
                    key={slide.key}
                    type="button"
                    onClick={() => goToSlide(realIndex)}
                    className={`product-3d-dot ${isActive ? "product-3d-dot--active" : ""} ${scaleClass}`}
                    aria-label={`${galleryCopy.controls.goToSlide} ${realIndex + 1}`}
                    aria-selected={isActive}
                    role="tab"
                  >
                    <span aria-hidden="true" />
                  </button>
                );
              });
            })()}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="product-3d-control-arrow"
            aria-label={galleryCopy.controls.nextSlide}
          >
            <CaretRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {isViewerOpen &&
        createPortal(
          <div
            className="product-viewer-modal"
            role="dialog"
            aria-modal="true"
            aria-label={currentTitle}
          >
            {/* Background close trigger */}
            <button
              type="button"
              className="absolute inset-0 cursor-default bg-transparent"
              aria-label={galleryCopy.controls.closeViewer}
              onClick={closeViewer}
            />

            {/* Viewport close button */}
            <button
              type="button"
              onClick={closeViewer}
              className="product-viewer-action product-viewer-close"
              aria-label={galleryCopy.controls.closeViewer}
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            {/* Image viewport container */}
            <div className="relative z-10 flex w-screen h-screen items-center justify-center overflow-hidden">
              
              {/* Subtle backlight glow reflecting carousel colors */}
              <div className="product-viewer-backlight" aria-hidden="true" />

              {/* Navigation Left (Previous) */}
              <button
                type="button"
                onClick={prevSlide}
                className="product-viewer-action product-viewer-prev"
                aria-label={galleryCopy.controls.previousImage}
              >
                <CaretLeft className="size-5" aria-hidden="true" />
              </button>

              {/* Fullscreen image without corner radius */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={getImageSrc(currentSlide)}
                  alt={`${heading} - ${currentTitle}`}
                  className="w-full h-full object-contain"
                  width={1920}
                  height={1080}
                  sizes="100vw"
                  style={{ width: "100vw", height: "100vh", objectFit: "contain" }}
                  onError={() => handleImageError(currentSlide.key)}
                />
              </div>

              {/* Navigation Right (Next) */}
              <button
                type="button"
                onClick={nextSlide}
                className="product-viewer-action product-viewer-next"
                aria-label={galleryCopy.controls.nextImage}
              >
                <CaretRight className="size-5" aria-hidden="true" />
              </button>
            </div>

            {/* Bottom meta information deck */}
            <div className="product-viewer-meta">
              <p className="text-sm font-semibold tracking-wide">
                {currentTitle}
              </p>
              <p className="font-mono text-xs text-graphite/60">
                {currentIndex + 1} / {total}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
