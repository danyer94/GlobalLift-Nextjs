import { createContext, useContext, type ReactNode } from 'react';
import { type MotionValue, useScroll } from 'framer-motion';

const ScrollContext = createContext<MotionValue<number> | null>(null);

type ScrollProviderProps = {
  children: ReactNode;
};

export function ScrollProvider({ children }: ScrollProviderProps) {
  const { scrollYProgress } = useScroll();

  return <ScrollContext.Provider value={scrollYProgress}>{children}</ScrollContext.Provider>;
}

export function useScrollProgress(): MotionValue<number> {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error('useScrollProgress must be used within ScrollProvider');
  }

  return context;
}
