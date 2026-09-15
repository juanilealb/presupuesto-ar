import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="shell flex flex-col gap-4 py-8 text-base text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl leading-relaxed">
          Totales del artículo 1. Macros del mensaje. Error = INDEC menos el
          supuesto. Si no está cargado, se lee dato pendiente. MIT.
        </p>
        <nav aria-label="Pie" className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/comparar" className="tap text-foreground md:hover:underline">
            Comparar
          </Link>
          <Link href="/pronostico" className="tap text-foreground md:hover:underline">
            Pronóstico
          </Link>
          <Link href="/fuentes" className="tap text-foreground md:hover:underline">
            Fuentes
          </Link>
        </nav>
      </div>
    </footer>
  );
}
