'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="bg-background text-foreground">
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-xl text-center space-y-4">
            <h1 className="text-3xl font-semibold">Error crítico</h1>
            <p className="text-muted-foreground">
              Se produjo un error al renderizar la aplicación.
            </p>
            <button type="button" onClick={reset} className="btn btn-contact">
              Reintentar
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
