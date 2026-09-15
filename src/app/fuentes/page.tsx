import {
  DEFLATOR_NOTE,
  compareYears,
  forecastYears,
  ipcForDeflator,
  prorrogaSources,
  prorrogaYears,
} from "@/data";

export const metadata = {
  title: "Fuentes",
  description: "De dónde sale cada número y cómo se deflacta.",
};

export default function FuentesPage() {
  const links = [
    ...compareYears.flatMap((row) => row.sources),
    ...forecastYears.flatMap((row) => row.sources),
    ...prorrogaSources,
  ].filter(
    (item, index, all) => all.findIndex((other) => other.url === item.url) === index,
  );

  return (
    <article className="flex max-w-3xl flex-col gap-10">
      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">
          Fuentes
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Cada cifra tiene `source` y `confidence` en{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
            src/data
          </code>
          . Si no está en la ley, el mensaje o el INDEC, dice dato pendiente.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl tracking-tight">Reglas</h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
          <li>
            Comparar usa solo 2023 (Ley 27.701), 2026 (Ley 27.798) y 2027
            (proyecto PE). No hay serie 2024/2025 inventada.
          </li>
          <li>
            Totales y finalidades: artículo 1 de cada instrumento.
          </li>
          <li>
            Macros: mensaje del proyecto. 2027 usa §2.3 (IPC 18,0%, PIB +4,0%).
            No se usan cifras de prensa.
          </li>
          <li>
            Pronóstico: error = observado INDEC − supuesto. 2024 y 2025 son
            proyectos no sancionados, bajo prórroga.
          </li>
          <li>
            2026 observado: pendiente. El año no cerró.
          </li>
          <li>2027: proyectado PE / pendiente de sanción. No es ley.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl tracking-tight">Deflactor</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {DEFLATOR_NOTE}
        </p>
        <ul className="space-y-2 text-base text-muted-foreground">
          {ipcForDeflator.map((row) => (
            <li key={row.year}>
              {row.year}. {row.ipcYoY.value}% · {row.ipcYoY.source}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl tracking-tight">Prórroga</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          {prorrogaYears.map((row) => (
            <li key={row.year}>
              {row.year}. {row.decreeName}. {row.why}
            </li>
          ))}
        </ul>
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
