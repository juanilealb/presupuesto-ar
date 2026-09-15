import Link from "next/link";
import { ForecastModule } from "@/components/forecast-module";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { forecastMiss } from "@/data/compute";
import type { BudgetYear } from "@/data/types";
import { formatSourced, statusLabel } from "@/lib/format";

export function YearBody({ year }: { year: BudgetYear }) {
  if (year.status === "prorroga") {
    return (
      <article className="flex max-w-2xl flex-col gap-6">
        <Badge variant="secondary">{statusLabel(year.status)}</Badge>
        <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">
          {year.year} no tuvo ley
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{year.why}</p>
        <p>
          <a
            href={year.decreeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap text-base md:hover:underline"
          >
            {year.decreeName}
          </a>
        </p>
        <Link href="/" className="tap text-base md:hover:underline">
          Volver al error y a los ganadores
        </Link>
      </article>
    );
  }

  if (year.status === "pendiente") {
    return (
      <article className="flex max-w-2xl flex-col gap-6">
        <Badge variant="outline">{statusLabel(year.status)}</Badge>
        <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">
          2027, próximamente
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{year.why}</p>
        <ul className="divide-y divide-border overflow-hidden rounded-xl ring-1 ring-foreground/10">
          {year.lineItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between gap-4 bg-card px-4 py-3 text-sm"
            >
              <span>{item.label}</span>
              <span className="text-muted-foreground">Dato pendiente</span>
            </li>
          ))}
        </ul>
      </article>
    );
  }

  const miss = forecastMiss(year);

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <Badge>{statusLabel(year.status)}</Badge>
        <h1 className="font-heading text-4xl tracking-tight sm:text-6xl">
          {year.year}
        </h1>
        <p className="text-base text-muted-foreground">
          {year.lawName}. {year.government}
        </p>
      </header>

      <div className="grid gap-10 xl:grid-cols-2 xl:items-start">
        <ForecastModule year={year} miss={miss} />

        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-2xl tracking-tight">
            Gasto por finalidad
          </h2>
          <p className="text-base text-muted-foreground">
            Artículo 1. Pesos corrientes de ese año. No se restan contra otro
            ejercicio sin el deflactor del home.
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Administración Nacional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {year.lineItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-1 border-b border-border/70 py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <span className="text-base">{item.label}</span>
                    <span className="tabular-nums text-base">
                      {formatSourced(item.amountArs, "ars")}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>

      <p>
        <Link href="/" className="tap text-base md:hover:underline">
          2023 vs 2026 en el home
        </Link>
      </p>
    </article>
  );
}
