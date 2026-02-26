'use client';

import { createContext, useContext, type ReactNode } from 'react';

const FontClassContext = createContext<{ monoClassName: string } | null>(null);

export function FontClassProvider({
  monoClassName,
  children,
}: {
  monoClassName: string;
  children: ReactNode;
}) {
  return (
    <FontClassContext.Provider value={{ monoClassName }}>
      {children}
    </FontClassContext.Provider>
  );
}

export function useFontClass(): string | undefined {
  const ctx = useContext(FontClassContext);
  return ctx?.monoClassName;
}
