import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ImageRevealSectionProps {
  image1: string;
  image2: string;
  title1: string;
  title2: string;
  subtitle1: string;
  subtitle2: string;
}

export function ImageRevealSection({
  image1,
  image2,
  title1,
  title2,
  subtitle1,
  subtitle2,
}: ImageRevealSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // We use useScroll directly on this container to get progress relative to its view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress into useful animation values
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  const opacity1 = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.4], [0, -50]);
  
  const opacity2 = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.6, 1], [50, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[170vh] bg-background sm:min-h-[200vh] lg:h-[235vh] lg:min-h-0"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Base Layer (Image 1) */}
        <div className="absolute inset-0 z-0">
          <img
            src={image1}
            alt={title1}
            className="w-full h-full object-cover brightness-[0.85]"
            loading="lazy"
            decoding="async"
            width={1536}
            height={1024}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/25" />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{
              opacity: reduceMotion ? 1 : opacity1,
              y: reduceMotion ? 0 : y1,
            }}
          >
            <span className="badge badge-contrast mb-4">
              Global Lift
            </span>
            <h2 className="mb-4 text-3xl font-display font-semibold text-primary-foreground drop-shadow-lg md:text-6xl">
              {title1}
            </h2>
            <p className="max-w-2xl text-base font-medium text-primary-foreground/90 drop-shadow-md md:text-xl">
              {subtitle1}
            </p>
          </motion.div>
        </div>

        {/* Reveal Layer (Image 2) */}
        <motion.div
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
          style={{
            clipPath: reduceMotion ? "inset(0% 0% 0% 0%)" : clipPath,
            willChange: 'clip-path'
          }}
        >
          <img
            src={image2}
            alt={title2}
            className="w-full h-full object-cover brightness-[0.85]"
            loading="lazy"
            decoding="async"
            width={1536}
            height={1024}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/25" />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{
              opacity: reduceMotion ? 1 : opacity2,
              y: reduceMotion ? 0 : y2,
            }}
          >
            <span className="badge badge-contrast mb-4">
              Global Lift
            </span>
            <h2 className="mb-4 text-3xl font-display font-semibold text-primary-foreground drop-shadow-lg md:text-6xl">
              {title2}
            </h2>
            <p className="max-w-2xl text-base font-medium text-primary-foreground/90 drop-shadow-md md:text-xl">
              {subtitle2}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
          <div className="relative h-12 w-[1px] overflow-hidden bg-primary-foreground/30">
            <motion.div
              className="absolute top-0 left-0 w-full origin-top bg-primary-foreground"
              style={{ height: '100%', scaleY: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
