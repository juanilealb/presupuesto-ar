import { CompareDashboard } from "@/components/compare-dashboard";
import { ProrrogaBanner } from "@/components/prorroga-banner";
import { ConfidenceBadge } from "@/components/confidence-badge";
import {
  SITE,
  compareYears,
  priceFactor,
  year2027,
  type SourcedNumber,
} from "@/data";
import { parseCompararState } from "@/lib/comparar-url";
import { formatSourced } from "@/lib/format";

export const metadata = {
  title: "Comparar",
  description: SITE.dek,
};

export default async function CompararPage({
  searchParams,
}: {
  searchParams: Promise<{ unidad?: string; anios?: string }>;
}) {
  const { unit, visible } = parseCompararState(await searchParams);

  return (
    <div className="flex flex-col gap-10 xl:gap-14">
      <ProrrogaBanner />

      <header className="grid gap-6 xl:grid-cols-12 xl:items-end">
        <div className="flex min-w-0 flex-col gap-4 xl:col-span-7">
          <p className="text-sm text-muted-foreground">Presupuesto nacional</p>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl">
            {SITE.headline}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {SITE.dek}
          </p>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground xl:col-span-5">
          2027 entra como proyectado PE. Las celdas vacías son falta de dato,
          no un cero.
        </p>
      </header>

      <CompareDashboard
        years={compareYears}
        factor={priceFactor}
        unit={unit}
        visible={visible}
      />

      <section className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading text-2xl tracking-tight">
            Proyecto 2027, más cifras
          </h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            Pendiente de sanción
          </span>
        </div>
        <dl className="grid gap-4 sm:grid-cols-3">
          <Extra
            label="Gastos APN"
            metric={year2027.extras?.gastosApn}
          />
          <Extra
            label="Recursos APN"
            metric={year2027.extras?.recursosApn}
          />
          <Extra
            label="RF SPN"
            metric={year2027.extras?.rfSpn}
          />
        </dl>
      </section>
    </div>
  );
}

function Extra({
  label,
  metric,
}: {
  label: string;
  metric: SourcedNumber | undefined;
}) {
  if (!metric) return null;
  return (
    <div className="flex flex-col gap-2">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-heading text-2xl tabular-nums tracking-tight">
        {formatSourced(metric, "billones")}
      </dd>
      <ConfidenceBadge confidence={metric.confidence} />
    </div>
  );
}
