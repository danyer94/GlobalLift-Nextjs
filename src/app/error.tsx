'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-semibold">Algo salió mal</h1>
        <p className="text-muted-foreground">
          Ocurrió un error inesperado al cargar la página.
        </p>
        <button type="button" onClick={reset} className="btn btn-contact">
          Reintentar
        </button>
      </div>
    </div>
  );
}
