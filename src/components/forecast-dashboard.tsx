import { ConfidenceBadge } from "@/components/confidence-badge";
import { Footnote } from "@/components/footnote";
import { PairBars } from "@/components/pair-bars";
import { forecastKindLabel, formatSourced } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ForecastMiss, ForecastYear, LargestMiss, SourcedNumber } from "@/data";

type Props = {
  years: ForecastYear[];
  misses: ForecastMiss[];
  lead: LargestMiss;
};

export function ForecastDashboard({ years, misses, lead }: Props) {
  const inflationObserved = years.filter(
    (row) => row.macrosActual.inflationYoY.value !== null,
  );
  const growthObserved = years.filter(
    (row) => row.macrosActual.realGdpGrowth.value !== null,
  );

  return (
    <div className="flex flex-col gap-12 xl:gap-16">
      <section className="flex flex-col gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10 sm:p-8">
        <p className="text-sm text-muted-foreground">
          Error más grande ya medible
        </p>
        <h2 className="font-heading text-4xl tracking-tight sm:text-5xl xl:text-6xl">
          {formatSourced(lead.error, "pp")}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {lead.label} {lead.year}. Supuesto{" "}
          {formatSourced(lead.projected, "pct")}. INDEC{" "}
          {formatSourced(lead.observed, "pct")}. No es un modelo nuevo: es el
          error del propio presupuesto.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <ConfidenceBadge confidence={lead.error.confidence} />
          <ConfidenceBadge confidence={lead.projected.confidence} />
          <ConfidenceBadge confidence={lead.observed.confidence} />
        </div>
        <Footnote metric={lead.error} />
      </section>

      <ForecastBlock
        title="Inflación IPC nacional dic/dic"
        years={years}
        observedYears={inflationObserved}
        projected={(row) => row.macrosProjected.inflationYoY}
        observed={(row) => row.macrosActual.inflationYoY}
        errorFor={(year) =>
          misses.find((row) => row.year === year)?.inflationErrorPp
        }
      />

      <ForecastBlock
        title="PIB real"
        years={years}
        observedYears={growthObserved}
        projected={(row) => row.macrosProjected.realGdpGrowth}
        observed={(row) => row.macrosActual.realGdpGrowth}
        errorFor={(year) =>
          misses.find((row) => row.year === year)?.growthErrorPp
        }
      />
    </div>
  );
}

function ForecastBlock({
  title,
  years,
  observedYears,
  projected,
  observed,
  errorFor,
}: {
  title: string;
  years: ForecastYear[];
  observedYears: ForecastYear[];
  projected: (row: ForecastYear) => SourcedNumber;
  observed: (row: ForecastYear) => SourcedNumber;
  errorFor: (year: number) => SourcedNumber | undefined;
}) {
  const max = Math.max(
    ...observedYears.flatMap((row) => [
      Math.abs(projected(row).value ?? 0),
      Math.abs(observed(row).value ?? 0),
    ]),
    1,
  );

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
        {title}
      </h2>

      {observedYears.length > 0 ? (
        <div className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
          <p className="text-sm text-muted-foreground">
            Serie solo donde hay observado. {observedYears.map((row) => row.year).join(", ")}.
          </p>
          <ul className="flex flex-col gap-4">
            {observedYears.map((row) => (
              <li key={row.year} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span>{row.year}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {formatSourced(errorFor(row.year) ?? { value: null, source: "", confidence: "pendiente" }, "pp")}
                  </span>
                </div>
                <SeriesPair
                  projected={projected(row).value}
                  actual={observed(row).value}
                  max={max}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {years.map((row) => {
          const p = projected(row);
          const o = observed(row);
          const e = errorFor(row.year);
          return (
            <li
              key={row.year}
              className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-heading text-2xl tracking-tight">{row.year}</p>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {forecastKindLabel(row.kind)}
                </span>
              </div>
              {row.note ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {row.note}
                </p>
              ) : null}
              <PairBars projected={p.value} actual={o.value} />
              <dl className="grid grid-cols-3 gap-2 text-sm">
                <Metric label="P" metric={p} kind="pct" />
                <Metric label="O" metric={o} kind="pct" />
                <Metric label="Error" metric={e} kind="pp" emphasize />
              </dl>
              <div className="flex flex-wrap gap-1">
                <ConfidenceBadge confidence={p.confidence} />
                <ConfidenceBadge confidence={o.confidence} />
                {e ? <ConfidenceBadge confidence={e.confidence} /> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Metric({
  label,
  metric,
  kind,
  emphasize,
}: {
  label: string;
  metric: SourcedNumber | undefined;
  kind: "pct" | "pp";
  emphasize?: boolean;
}) {
  const empty: SourcedNumber = {
    value: null,
    source: "dato pendiente",
    confidence: "pendiente",
  };
  const row = metric ?? empty;
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "tabular-nums",
          emphasize && "font-heading text-lg",
          emphasize && row.value !== null && row.value > 0 && "text-destructive",
          emphasize && row.value !== null && row.value < 0 && "text-surplus",
        )}
      >
        {formatSourced(row, kind)}
      </dd>
    </div>
  );
}

function SeriesPair({
  projected,
  actual,
  max,
}: {
  projected: number | null;
  actual: number | null;
  max: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Bar value={projected} max={max} tone="projected" />
      <Bar value={actual} max={max} tone="actual" />
    </div>
  );
}

function Bar({
  value,
  max,
  tone,
}: {
  value: number | null;
  max: number;
  tone: "projected" | "actual";
}) {
  const pending = value === null;
  const width = pending ? 8 : Math.max(4, (Math.abs(value) / max) * 100);
  return (
    <div className="h-2 overflow-hidden rounded-full bg-muted">
      <div
        className={cn(
          "h-full rounded-full",
          pending && "bg-border",
          !pending && tone === "projected" && "bg-chart-2",
          !pending && tone === "actual" && "bg-primary",
          !pending && value < 0 && "bg-destructive",
        )}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
