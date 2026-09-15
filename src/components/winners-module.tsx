import { Footnote } from "@/components/footnote";
import type { LineDelta, SourcedNumber } from "@/data/types";
import { formatSourced } from "@/lib/format";
import { cn } from "@/lib/utils";

function formatFactor(value: number | null): string {
  if (value === null) return "dato pendiente";
  return `×${value.toLocaleString("es-AR", { maximumFractionDigits: 1 })}`;
}

function realClass(value: number | null) {
  return cn(
    value !== null && value < 0 && "text-destructive",
    value !== null && value > 0 && "text-surplus",
  );
}

function DeltaCard({ row, rank }: { row: LineDelta; rank: number }) {
  return (
    <li className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <div className="flex items-start justify-between gap-3">
        <p className="text-base leading-snug">
          <span className="text-muted-foreground">{rank}. </span>
          {row.label}
        </p>
        <p
          className={cn(
            "shrink-0 font-heading text-2xl tabular-nums",
            realClass(row.pctReal.value),
          )}
        >
          {formatSourced(row.pctReal, "pct")}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-muted-foreground">Nominal</dt>
          <dd className="tabular-nums">{formatSourced(row.pctNominal, "pct")}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">2023</dt>
          <dd className="tabular-nums">{formatSourced(row.amountA, "ars")}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">2026</dt>
          <dd className="tabular-nums">{formatSourced(row.amountB, "ars")}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Real</dt>
          <dd className={cn("tabular-nums", realClass(row.pctReal.value))}>
            {formatSourced(row.pctReal, "pct")}
          </dd>
        </div>
      </dl>
    </li>
  );
}

export function WinnersModule({
  winners,
  factor,
}: {
  winners: LineDelta[];
  factor: SourcedNumber;
}) {
  return (
    <div id="ganadores" className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 xl:max-w-3xl">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          2023 → 2026 · finalidades
        </p>
        <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
          Nadie ganó en pesos de 2023
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Taxonomía del artículo 1 de cada ley. Las cinco finalidades oficiales.
          El % nominal es pesos corrientes. El % real deflacta 2026 con el
          producto del IPC dic-dic 2023–2025 ({formatFactor(factor.value)}).
          Arriba, la que menos cayó. Abajo, servicios económicos.
        </p>
        <Footnote metric={factor} />
      </div>

      <ul className="flex flex-col gap-3 lg:hidden">
        {winners.map((row, index) => (
          <DeltaCard key={row.id} row={row} rank={index + 1} />
        ))}
      </ul>

      <div className="hidden overflow-x-auto rounded-xl ring-1 ring-foreground/10 lg:block">
        <table className="w-full min-w-[48rem] border-collapse text-left text-base">
          <caption className="sr-only">
            Variación nominal y real por finalidad, 2023 a 2026
          </caption>
          <thead>
            <tr className="border-b border-border bg-muted/40 text-sm text-muted-foreground">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Finalidad</th>
              <th className="px-4 py-3 font-medium">2023</th>
              <th className="px-4 py-3 font-medium">2026</th>
              <th className="px-4 py-3 font-medium">Nominal</th>
              <th className="px-4 py-3 font-medium">Real</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((row, index) => (
              <tr key={row.id} className="border-b border-border/70 last:border-0">
                <td className="px-4 py-4 text-muted-foreground">{index + 1}</td>
                <td className="px-4 py-4">{row.label}</td>
                <td className="px-4 py-4 tabular-nums">
                  {formatSourced(row.amountA, "ars")}
                </td>
                <td className="px-4 py-4 tabular-nums">
                  {formatSourced(row.amountB, "ars")}
                </td>
                <td className="px-4 py-4 tabular-nums">
                  {formatSourced(row.pctNominal, "pct")}
                </td>
                <td
                  className={cn(
                    "px-4 py-4 font-heading text-xl tabular-nums",
                    realClass(row.pctReal.value),
                  )}
                >
                  {formatSourced(row.pctReal, "pct")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
