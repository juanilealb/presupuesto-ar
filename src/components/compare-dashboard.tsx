"use client";

import { useMemo, useState } from "react";
import { ConfidenceBadge } from "@/components/confidence-badge";
import { Footnote } from "@/components/footnote";
import {
  COMPARE_YEAR_IDS,
  compareFinalidades,
  displayTotal,
  rankByDelta,
  type CompareYear,
  type CompareYearId,
  type SourcedNumber,
  type Unit,
} from "@/data";
import { formatSourced, yearShort } from "@/lib/format";
import { cn } from "@/lib/utils";

type Props = {
  years: CompareYear[];
  factor: SourcedNumber;
};

const YEAR_TONE: Record<CompareYearId, string> = {
  2023: "bg-chart-3",
  2026: "bg-chart-2",
  2027: "bg-primary",
};

export function CompareDashboard({ years, factor }: Props) {
  const [unit, setUnit] = useState<Unit>("nominal");
  const [visible, setVisible] = useState<CompareYearId[]>([...COMPARE_YEAR_IDS]);

  const ranked = useMemo(
    () => rankByDelta(compareFinalidades(years, factor, unit, visible)),
    [years, factor, unit, visible],
  );

  const maxBar = Math.max(
    ...ranked.flatMap((row) =>
      visible.map((year) => Math.abs(row.amounts[year].value ?? 0)),
    ),
    1,
  );

  function toggleYear(year: CompareYearId) {
    setVisible((current) => {
      if (current.includes(year)) {
        if (current.length === 1) return current;
        return current.filter((item) => item !== year);
      }
      return [...COMPARE_YEAR_IDS].filter(
        (item) => item === year || current.includes(item),
      );
    });
  }

  return (
    <div className="flex flex-col gap-10 xl:gap-12">
      <KpiStrip years={years} factor={factor} unit={unit} />

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <YearChips selected={visible} onToggle={toggleYear} years={years} />
        <UnitToggle unit={unit} onChange={setUnit} />
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {unit === "real"
          ? factor.note
          : "Pesos corrientes de cada instrumento. 2027 es proyecto, no ley."}
      </p>
      {unit === "real" ? <Footnote metric={factor} /> : null}

      <section className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
            Finalidades, artículo 1
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Las cinco oficiales. El ranking usa el Δ entre el primer y el
            último año visible con cifra.
          </p>
        </header>

        <FinalidadBars rows={ranked} selected={visible} max={maxBar} />

        <ul className="flex flex-col gap-3 lg:hidden">
          {ranked.map((row, index) => (
            <li
              key={row.id}
              className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-base leading-snug">
                  <span className="text-muted-foreground">{index + 1}. </span>
                  {row.label}
                </p>
                <p
                  className={cn(
                    "shrink-0 font-heading text-2xl tabular-nums",
                    deltaClass(row.deltaPct.value),
                  )}
                >
                  {formatSourced(row.deltaPct, "pct")}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                {visible.map((year) => (
                  <div key={year}>
                    <dt className="text-muted-foreground">{year}</dt>
                    <dd className="tabular-nums">
                      {formatSourced(row.amounts[year], "ars")}
                    </dd>
                  </div>
                ))}
              </dl>
              <ConfidenceBadge confidence={row.deltaPct.confidence} />
            </li>
          ))}
        </ul>

        <div className="hidden overflow-x-auto rounded-xl ring-1 ring-foreground/10 lg:block">
          <table className="w-full min-w-[48rem] border-collapse text-left text-base">
            <caption className="sr-only">
              Finalidades del artículo 1, {visible.join(", ")}, {unit}
            </caption>
            <thead>
              <tr className="border-b border-border bg-muted text-sm text-muted-foreground">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Finalidad</th>
                {visible.map((year) => (
                  <th key={year} className="px-4 py-3 font-medium">
                    {year}
                  </th>
                ))}
                <th className="px-4 py-3 font-medium">Δ</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b border-border/70 last:border-0"
                >
                  <td className="px-4 py-4 text-muted-foreground">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4">{row.label}</td>
                  {visible.map((year) => (
                    <td key={year} className="px-4 py-4 tabular-nums">
                      {formatSourced(row.amounts[year], "ars")}
                    </td>
                  ))}
                  <td
                    className={cn(
                      "px-4 py-4 font-heading text-xl tabular-nums",
                      deltaClass(row.deltaPct.value),
                    )}
                  >
                    {formatSourced(row.deltaPct, "pct")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function KpiStrip({
  years,
  factor,
  unit,
}: {
  years: CompareYear[];
  factor: SourcedNumber;
  unit: Unit;
}) {
  return (
    <section aria-label="Indicadores" className="grid gap-3 sm:grid-cols-3">
      {years.map((year) => {
        const total = displayTotal(year, unit, factor);
        return (
          <article
            key={year.year}
            className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10 sm:p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-heading text-2xl tracking-tight">{year.year}</p>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {year.chip}
              </span>
            </div>
            <p className="font-heading text-3xl tracking-tight tabular-nums xl:text-4xl">
              {formatSourced(total, "billones")}
            </p>
            <p className="text-sm text-muted-foreground">
              Total art. 1 · {unit === "real" ? "reales dic-2025" : "nominal"}
            </p>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">IPC supuesto</dt>
                <dd className="tabular-nums">
                  {formatSourced(year.macrosProjected.inflationYoY, "pct")}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">PIB supuesto</dt>
                <dd className="tabular-nums">
                  {formatSourced(year.macrosProjected.realGdpGrowth, "pct")}
                </dd>
              </div>
            </dl>
            {year.extras?.rfSpn ? (
              <p className="text-sm text-muted-foreground">
                RF SPN {formatSourced(year.extras.rfSpn, "billones")}
              </p>
            ) : null}
            <p className="text-xs leading-relaxed text-muted-foreground">
              {year.statusNote}
            </p>
          </article>
        );
      })}
    </section>
  );
}

function YearChips({
  selected,
  onToggle,
  years,
}: {
  selected: CompareYearId[];
  onToggle: (year: CompareYearId) => void;
  years: CompareYear[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">Años</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Años">
        {years.map((year) => {
          const on = selected.includes(year.year);
          return (
            <button
              key={year.year}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(year.year)}
              className={cn(
                "tap min-w-11 rounded-full px-4 text-sm",
                on
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {yearShort(year.year)}
              <span className="sr-only"> {year.year}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function UnitToggle({
  unit,
  onChange,
}: {
  unit: Unit;
  onChange: (unit: Unit) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">Unidad</p>
      <div
        role="radiogroup"
        aria-label="Nominal o real"
        className="grid grid-cols-2 rounded-full bg-muted p-1"
      >
        {(["nominal", "real"] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={unit === value}
            onClick={() => onChange(value)}
            className={cn(
              "tap min-w-11 justify-center rounded-full px-4 text-sm capitalize",
              unit === value
                ? "bg-background text-foreground"
                : "text-muted-foreground",
            )}
          >
            {value === "nominal" ? "Nominal" : "Real"}
          </button>
        ))}
      </div>
    </div>
  );
}

function FinalidadBars({
  rows,
  selected,
  max,
}: {
  rows: ReturnType<typeof rankByDelta>;
  selected: CompareYearId[];
  max: number;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-xl bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        {selected.map((year) => (
          <span key={year} className="inline-flex items-center gap-2">
            <span className={cn("size-2.5 rounded-full", YEAR_TONE[year])} />
            {year}
          </span>
        ))}
      </div>
      <ul className="flex flex-col gap-4">
        {rows.map((row) => (
          <li key={row.id} className="flex flex-col gap-2">
            <p className="text-sm">{row.label}</p>
            <div className="flex flex-col gap-1.5">
              {selected.map((year) => {
                const value = row.amounts[year].value;
                const pending = value === null;
                const width = pending
                  ? 8
                  : Math.max(4, (Math.abs(value) / max) * 100);
                return (
                  <div key={year} className="flex items-center gap-3">
                    <span className="w-8 shrink-0 text-xs text-muted-foreground">
                      {yearShort(year)}
                    </span>
                    <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          pending ? "bg-border" : YEAR_TONE[year],
                        )}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <span className="w-24 shrink-0 text-right text-sm tabular-nums">
                      {formatSourced(row.amounts[year], "ars")}
                    </span>
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function deltaClass(value: number | null) {
  return cn(
    value !== null && value < 0 && "text-destructive",
    value !== null && value > 0 && "text-surplus",
  );
}
