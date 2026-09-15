import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80">
      <div className="shell flex flex-col gap-4 py-8 text-base text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl leading-relaxed">
          Explainer público. Los totales salen de la ley. El error sale de
          restar INDEC menos el supuesto del presupuesto. Si no está cargado,
          se lee dato pendiente.
        </p>
        <Link
          href="/fuentes"
          className="tap shrink-0 text-foreground underline-offset-4 md:hover:underline"
        >
          Fuentes
        </Link>
      </div>
    </footer>
  );
}
