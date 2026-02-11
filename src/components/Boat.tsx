import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { withBasePath } from '../utils/basePath';
import { useScrollProgress } from '../utils/scroll';

type BoatProps = {
  className?: string;
};

export function Boat({ className }: BoatProps) {
  const scrollYProgress = useScrollProgress();
  const reduceMotion = useReducedMotion();
  const travel = useTransform(scrollYProgress, [0, 1], [24, 520]);
  const y = useSpring(travel, { stiffness: 100, damping: 30, mass: 1 });
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
      className={`boat fixed right-6 top-[12vh] z-40 hidden md:block pointer-events-none ${className ?? ''}`}
      style={{
        y: reduceMotion ? 0 : y,
        rotate: reduceMotion ? heading.get() : headingRotation,
        willChange: 'transform',
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 4, 0],
            }
      }
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
        <img
          src={boatPhotoSrc}
          alt=""
          className="boat-photo"
          loading="lazy"
          decoding="async"
          width={640}
          height={360}
        />
      </div>
    </motion.div>
  );
}
