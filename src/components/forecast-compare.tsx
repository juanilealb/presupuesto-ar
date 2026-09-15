import Link from "next/link";
import type { ApprovedBudget, ForecastMiss } from "@/data/types";
import { formatSourced } from "@/lib/format";

type Props = {
  a: ApprovedBudget;
  b: ApprovedBudget;
  missA: ForecastMiss;
  missB: ForecastMiss;
};

export function ForecastCompare({ a, b, missA, missB }: Props) {
  const rows = [
    {
      label: "Inflación anual",
      projectedA: a.macrosProjected.inflationYoY,
      actualA: a.macrosActual.inflationYoY,
      errorA: missA.inflationErrorPp,
      projectedB: b.macrosProjected.inflationYoY,
      actualB: b.macrosActual.inflationYoY,
      errorB: missB.inflationErrorPp,
    },
    {
      label: "PIB real",
      projectedA: a.macrosProjected.realGdpGrowth,
      actualA: a.macrosActual.realGdpGrowth,
      errorA: missA.growthErrorPp,
      projectedB: b.macrosProjected.realGdpGrowth,
      actualB: b.macrosActual.realGdpGrowth,
      errorB: missB.growthErrorPp,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
      <table className="w-full min-w-[52rem] border-collapse text-left text-base">
        <caption className="sr-only">
          Proyectado versus observado, 2023 y 2026
        </caption>
        <thead>
          <tr className="border-b border-border bg-muted/40 text-sm text-muted-foreground">
            <th className="px-4 py-3 font-medium" rowSpan={2}>
              Variable
            </th>
            <th className="px-4 py-3 font-medium" colSpan={3}>
              <Link href={`/anio/${a.year}`} className="tap md:hover:underline">
                {a.year} · {a.lawName}
              </Link>
            </th>
            <th className="px-4 py-3 font-medium" colSpan={3}>
              <Link href={`/anio/${b.year}`} className="tap md:hover:underline">
                {b.year} · {b.lawName}
              </Link>
            </th>
          </tr>
          <tr className="border-b border-border text-sm text-muted-foreground">
            <th className="px-4 py-2 font-medium">Proyectado</th>
            <th className="px-4 py-2 font-medium">INDEC</th>
            <th className="px-4 py-2 font-medium">Error</th>
            <th className="px-4 py-2 font-medium">Proyectado</th>
            <th className="px-4 py-2 font-medium">INDEC</th>
            <th className="px-4 py-2 font-medium">Error</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border/70 last:border-0">
              <th className="px-4 py-4 font-medium">{row.label}</th>
              <td className="px-4 py-4 tabular-nums">
                {formatSourced(row.projectedA, "pct")}
              </td>
              <td className="px-4 py-4 tabular-nums">
                {formatSourced(row.actualA, "pct")}
              </td>
              <td className="px-4 py-4 font-heading text-xl tabular-nums">
                {formatSourced(row.errorA, "pp")}
              </td>
              <td className="px-4 py-4 tabular-nums">
                {formatSourced(row.projectedB, "pct")}
              </td>
              <td className="px-4 py-4 tabular-nums">
                {formatSourced(row.actualB, "pct")}
              </td>
              <td className="px-4 py-4 font-heading text-xl tabular-nums">
                {formatSourced(row.errorB, "pp")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
