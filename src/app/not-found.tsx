export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-semibold">Página no encontrada</h1>
        <p className="text-muted-foreground">
          La ruta que buscas no existe o fue movida.
        </p>
        <a href="/" className="btn btn-contact inline-flex">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
