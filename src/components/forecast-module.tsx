import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footnote } from "@/components/footnote";
import { PairBars } from "@/components/pair-bars";
import type { ApprovedBudget, ForecastMiss } from "@/data/types";
import { formatPp, formatSourced } from "@/lib/format";

export function ForecastModule({
  year,
  miss,
}: {
  year: ApprovedBudget;
  miss: ForecastMiss;
}) {
  const inflationDone = miss.inflationErrorPp.value !== null;
  const growthDone = miss.growthErrorPp.value !== null;

  return (
    <Card id={`error-${year.year}`} className="bg-card/80">
      <CardHeader className="gap-2">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Error de pronóstico
        </p>
        <CardTitle className="font-heading text-2xl tracking-tight sm:text-3xl">
          <Link href={`/anio/${year.year}`} className="tap md:hover:underline">
            {year.year}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{year.lawName}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Inflación anual</p>
          <PairBars
            projected={year.macrosProjected.inflationYoY.value}
            actual={year.macrosActual.inflationYoY.value}
          />
          <p className="font-heading text-3xl tracking-tight">
            {inflationDone
              ? `Error ${formatPp(miss.inflationErrorPp.value ?? 0)}`
              : "Error pendiente"}
          </p>
          <Footnote metric={year.macrosProjected.inflationYoY} />
          <Footnote metric={year.macrosActual.inflationYoY} />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Crecimiento real del PIB</p>
          <PairBars
            projected={year.macrosProjected.realGdpGrowth.value}
            actual={year.macrosActual.realGdpGrowth.value}
          />
          <p className="font-heading text-3xl tracking-tight">
            {growthDone
              ? `Error ${formatPp(miss.growthErrorPp.value ?? 0)}`
              : "Error pendiente"}
          </p>
          <Footnote metric={year.macrosProjected.realGdpGrowth} />
          <Footnote metric={year.macrosActual.realGdpGrowth} />
        </div>
      </CardContent>
    </Card>
  );
}

export function ForecastHero({ miss }: { miss: ForecastMiss }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:gap-10">
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">Inflación 2023</p>
        <p className="font-heading text-4xl tracking-tight sm:text-5xl xl:text-6xl">
          {formatSourced(miss.inflationErrorPp, "pp")}
        </p>
        <p className="mt-1 text-base text-muted-foreground">
          Observado menos proyectado
        </p>
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">PIB real 2023</p>
        <p className="font-heading text-4xl tracking-tight sm:text-5xl xl:text-6xl">
          {formatSourced(miss.growthErrorPp, "pp")}
        </p>
        <p className="mt-1 text-base text-muted-foreground">
          Observado menos proyectado
        </p>
      </div>
    </div>
  );
}
