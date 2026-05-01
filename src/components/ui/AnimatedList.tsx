'use client';

import { LazyMotion, domAnimation, m, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';
import { fadeInUp, staggerContainer } from '../../utils/motion';

/**
 * Wrapper that applies staggered fade-in-up animation to its children.
 * Each direct child animates in sequence when entering the viewport.
 *
 * Usage:
 *   <AnimatedList>
 *     {items.map(item => <MotionItem key={item.id} {...item} />)}
 *   </AnimatedList>
 */
export const AnimatedList = forwardRef<HTMLDivElement, HTMLMotionProps<'div'> & {
  children: ReactNode;
  className?: string;
}>(function AnimatedList({ children, className, ...props }, ref) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        className={className}
        variants={reduceMotion ? undefined : staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        {...props}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
});

/**
 * Semantic ordered-list wrapper for staggered animated lists.
 * Use this when children are list items — HTML semantics matter, loco.
 */
export const AnimatedOl = forwardRef<HTMLOListElement, HTMLMotionProps<'ol'> & {
  children: ReactNode;
  className?: string;
}>(function AnimatedOl({ children, className, ...props }, ref) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <m.ol
        ref={ref}
        className={className}
        variants={reduceMotion ? undefined : staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        {...props}
      >
        {children}
      </m.ol>
    </LazyMotion>
  );
});

/**
 * Individual animated list item — wrap each child of AnimatedList with this.
 * Automatically staggers from the parent container.
 *
 * Usage:
 *   <AnimatedList>
 *     {items.map(item => (
 *       <MotionItem key={item.id}>
 *         <Card>{item.content}</Card>
 *       </MotionItem>
 *     ))}
 *   </AnimatedList>
 */
export const MotionItem = forwardRef<HTMLDivElement, HTMLMotionProps<'div'> & {
  children: ReactNode;
  className?: string;
}>(function MotionItem({ children, className, ...props }, ref) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      ref={ref}
      className={className}
      variants={reduceMotion ? undefined : fadeInUp}
      {...props}
    >
      {children}
    </m.div>
  );
});

/**
 * Semantic animated list item. Pair with AnimatedOl/ul wrappers.
 */
export const MotionLi = forwardRef<HTMLLIElement, HTMLMotionProps<'li'> & {
  children: ReactNode;
  className?: string;
}>(function MotionLi({ children, className, ...props }, ref) {
  const reduceMotion = useReducedMotion();

  return (
    <m.li
      ref={ref}
      className={className}
      variants={reduceMotion ? undefined : fadeInUp}
      {...props}
    >
      {children}
    </m.li>
  );
});
