import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import { withBasePath } from '../utils/basePath';
import { useScrollProgress } from '../utils/scroll';

type BoatProps = {
  className?: string;
};

export function Boat({ className }: BoatProps) {
  const BOAT_FALLBACK_HEIGHT = 136;
  const HEADER_FALLBACK_HEIGHT = 110;
  const HEADER_CLEARANCE = 12;
  const TRACK_PADDING = 1;
  const SCROLL_GAP = -50;

  const scrollYProgress = useScrollProgress();
  const reduceMotion = useReducedMotion();
  const boatRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [boatHeight, setBoatHeight] = useState(BOAT_FALLBACK_HEIGHT);
  const [headerHeight, setHeaderHeight] = useState(HEADER_FALLBACK_HEIGHT);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      setViewportHeight(window.innerHeight);
      setScrollbarWidth(Math.max(0, window.innerWidth - document.documentElement.clientWidth));
      const measuredBoatHeight = boatRef.current?.getBoundingClientRect().height ?? BOAT_FALLBACK_HEIGHT;
      setBoatHeight(Math.max(1, Math.round(measuredBoatHeight)));
      const primaryNav = document.querySelector('nav[aria-label="Primary"]');
      const measuredHeaderHeight =
        primaryNav instanceof HTMLElement ? Math.max(0, Math.round(primaryNav.getBoundingClientRect().bottom)) : HEADER_FALLBACK_HEIGHT;
      setHeaderHeight(Math.max(0, measuredHeaderHeight));
    };

    measure();
    const frame = window.requestAnimationFrame(measure);
    window.addEventListener('resize', measure);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const laneStart = headerHeight + HEADER_CLEARANCE + TRACK_PADDING;
  const laneEnd = Math.max(laneStart, viewportHeight - boatHeight - TRACK_PADDING);
  const travel = useTransform(scrollYProgress, [0, 1], [laneStart, laneEnd]);
  const heading = useMotionValue(90);
  const headingRotation = useSpring(heading, {
    stiffness: 220,
    damping: 22,
    mass: 0.5,
  });
  const lastProgressRef = useRef(scrollYProgress.get());
  const boatPhotoSrc = withBasePath('/images/barco-removebg.png');

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const previous = lastProgressRef.current;
    const delta = latest - previous;
    const movementThreshold = 0.0005;

    if (Math.abs(delta) >= movementThreshold) {
      heading.set(delta > 0 ? 90 : 270);
    }

    lastProgressRef.current = latest;
  });

  return (
    <motion.div
      ref={boatRef}
      className={`boat fixed top-0 z-30 hidden xl:block pointer-events-none ${className ?? ''}`}
      style={{
        right: scrollbarWidth + SCROLL_GAP,
        y: reduceMotion ? laneStart : travel,
        rotate: reduceMotion ? heading.get() : headingRotation,
        willChange: 'transform',
      }}
      animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 4.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
      aria-hidden="true"
    >
      <div className="boat-shell">
        <Image
          src={boatPhotoSrc}
          alt=""
          className="boat-photo"
          width={640}
          height={360}
          sizes="(min-width: 1280px) 136px, 0px"
        />
      </div>
    </motion.div>
  );
}
