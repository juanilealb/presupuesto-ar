import { ipcForDeflator, year2023, year2026 } from "@/data";

export const metadata = {
  title: "Fuentes",
  description: "De dónde sale cada número y cómo se deflacta 2023–2026.",
};

export default function FuentesPage() {
  const links = [...year2023.sources, ...year2026.sources];

  return (
    <article className="flex max-w-3xl flex-col gap-10">
      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">
          Fuentes
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Cada cifra del sitio tiene un `source` y una `confidence` en{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
            src/data/years.ts
          </code>
          . Si no está en la ley o en el INDEC, dice dato pendiente.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl tracking-tight">Reglas</h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
          <li>
            Totales y finalidades. Artículos 1 de las leyes 27.701 y 27.798.
          </li>
          <li>
            Supuestos de inflación y PIB. Mensaje o proyecto de cada presupuesto.
            Confianza media hasta contrastar el PDF.
          </li>
          <li>
            Observado. INDEC, IPC dic-dic y PIB anual. 2026 sigue pendiente
            porque el año no cerró.
          </li>
          <li>
            Deflactor. Producto de IPC 2023 (211,4%), 2024 (117,8%) y 2025
            (31,5%). Convierte pesos 2023 a precios de diciembre de 2025.
          </li>
          <li>
            2024 y 2025 son prórroga. No hay ley propia. No hay fila de error.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl tracking-tight">
          Serie del deflactor
        </h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          {ipcForDeflator.map((row) => (
            <li key={row.year}>
              {row.year}. {row.ipcYoY.value}% · {row.ipcYoY.source}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl tracking-tight">
          Cómo cargar 2027
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Editá el objeto 2027 en{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
            src/data/years.ts
          </code>
          . Cambiá el status a aprobado cuando haya ley. Completá
          macrosProjected, macrosActual y lineItems con value, source y
          confidence. El home toma el par 2023–2026 desde{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
            PAIR
          </code>{" "}
          en src/data/index.ts.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl tracking-tight">Enlaces</h2>
        <ul className="flex flex-col gap-1">
          {links.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tap break-words text-base md:hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
