import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps, useReducedMotion, useTransform } from 'framer-motion';
import { useScrollProgress } from '../utils/scroll';

type DecorVariant = 'aurora' | 'grid' | 'tide' | 'none';

type MotionSectionProps = HTMLMotionProps<'section'> & {
  children: ReactNode;
  background?: ReactNode;
  decorVariant?: DecorVariant;
  parallaxStrength?: number;
  reveal?: boolean;
};

const revealVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const revealTransition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const MotionSection = forwardRef<HTMLElement, MotionSectionProps>(function MotionSection(
  { children, background, className, decorVariant = 'aurora', parallaxStrength = 40, reveal = true, ...props },
  ref,
) {
  const scrollYProgress = useScrollProgress();
  const reduceMotion = useReducedMotion();
  const shouldReveal = reveal && !reduceMotion;
  const offset = reduceMotion ? 0 : parallaxStrength;
  const parallax = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.section
      ref={ref}
      className={`motion-section ${className ?? ''}`}
      initial={shouldReveal ? 'hidden' : false}
      whileInView={shouldReveal ? 'visible' : undefined}
      viewport={shouldReveal ? { once: true, amount: 0.12 } : undefined}
      transition={shouldReveal ? revealTransition : undefined}
      variants={shouldReveal ? revealVariants : undefined}
      {...props}
    >
      {decorVariant !== 'none' && (
        <motion.div
          aria-hidden="true"
          className={`motion-decor motion-decor--${decorVariant}`}
          style={{ y: reduceMotion ? 0 : parallax, willChange: 'transform' }}
        />
      )}
      {background}
      <div className="motion-content">{children}</div>
    </motion.section>
  );
});

MotionSection.displayName = 'MotionSection';
