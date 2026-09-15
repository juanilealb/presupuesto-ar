import { pendiente, sourced } from "./helpers";
import type {
  CompareYear,
  CompareYearId,
  ForecastMiss,
  ForecastYear,
  IpcYear,
  LineDelta,
  LineId,
  SourcedNumber,
  Unit,
} from "./types";

/** Documentado también en `/fuentes` y `src/data/deflator.ts`. */
export const DEFLATOR_NOTE =
  "Producto de IPC nacional dic/dic 2023–2025. Lleva pesos 2023 a precios de dic-2025. 2026 se lee en ese nivel. 2027 en reales queda pendiente: falta IPC 2026. No se usa el 18% supuesto del proyecto.";

export function compoundIpcFactor(annualPct: number[]): number {
  return annualPct.reduce((acc, pct) => acc * (1 + pct / 100), 1);
}

export function pctChange(from: number, to: number): number {
  return (to / from - 1) * 100;
}

export function realPctChange(
  from: number,
  to: number,
  priceFactor: number,
): number {
  return (to / (from * priceFactor) - 1) * 100;
}

export function errorPp(
  actual: number | null,
  projected: number | null,
): number | null {
  if (actual === null || projected === null) return null;
  return actual - projected;
}

export function deflatorFactor(series: IpcYear[]): SourcedNumber {
  const rates = series.map((row) => row.ipcYoY.value);
  if (rates.some((rate) => rate === null)) {
    return pendiente("Falta algún IPC anual de la serie.");
  }
  return sourced(
    compoundIpcFactor(rates as number[]),
    series.map((row) => row.ipcYoY.source).join(" · "),
    "media",
    DEFLATOR_NOTE,
  );
}

/**
 * Pesos en el nivel del deflactor (dic-2025).
 * 2023 se infla. 2026 se deja. 2027 no se toca: falta IPC 2026 observado.
 */
export function amountInDeflatorPrices(
  nominal: number | null,
  year: CompareYearId,
  factor: SourcedNumber,
): SourcedNumber {
  if (nominal === null) return pendiente();
  if (year === 2027) {
    return pendiente(
      "Falta el IPC dic/dic 2026. No se usa el 18% supuesto del proyecto para deflactar.",
    );
  }
  if (year === 2026) {
    return sourced(
      nominal,
      "Pesos de la Ley 27.798, leídos al nivel de dic-2025 (deflactor 2023–2025).",
      factor.confidence,
      factor.note,
    );
  }
  if (factor.value === null) return pendiente(factor.note);
  return sourced(
    nominal * factor.value,
    factor.source,
    factor.confidence,
    factor.note,
  );
}

export function forecastMiss(year: ForecastYear): ForecastMiss {
  const inflation = errorPp(
    year.macrosActual.inflationYoY.value,
    year.macrosProjected.inflationYoY.value,
  );
  const growth = errorPp(
    year.macrosActual.realGdpGrowth.value,
    year.macrosProjected.realGdpGrowth.value,
  );

  return {
    year: year.year,
    kind: year.kind,
    instrument: year.instrument,
    note: year.note,
    inflationErrorPp: sourced(
      inflation,
      inflation === null
        ? "dato pendiente"
        : `${year.macrosActual.inflationYoY.source} menos ${year.macrosProjected.inflationYoY.source}`,
      inflation === null ? "pendiente" : "alta",
      "Error = observado − supuesto. En puntos porcentuales.",
    ),
    growthErrorPp: sourced(
      growth,
      growth === null
        ? "dato pendiente"
        : `${year.macrosActual.realGdpGrowth.source} menos ${year.macrosProjected.realGdpGrowth.source}`,
      growth === null ? "pendiente" : "alta",
      "Error = observado − supuesto. En puntos porcentuales.",
    ),
  };
}

export type LargestMiss = {
  year: number;
  metric: "inflacion" | "pib";
  label: string;
  error: SourcedNumber;
  projected: SourcedNumber;
  observed: SourcedNumber;
};

export function largestAvailableMiss(
  years: ForecastYear[],
): LargestMiss | undefined {
  const candidates: LargestMiss[] = [];

  for (const row of years) {
    const miss = forecastMiss(row);
    if (miss.inflationErrorPp.value !== null) {
      candidates.push({
        year: row.year,
        metric: "inflacion",
        label: "Inflación IPC dic/dic",
        error: miss.inflationErrorPp,
        projected: row.macrosProjected.inflationYoY,
        observed: row.macrosActual.inflationYoY,
      });
    }
    if (miss.growthErrorPp.value !== null) {
      candidates.push({
        year: row.year,
        metric: "pib",
        label: "PIB real",
        error: miss.growthErrorPp,
        projected: row.macrosProjected.realGdpGrowth,
        observed: row.macrosActual.realGdpGrowth,
      });
    }
  }

  if (candidates.length === 0) return undefined;
  return candidates.reduce((best, row) =>
    Math.abs(row.error.value ?? 0) > Math.abs(best.error.value ?? 0)
      ? row
      : best,
  );
}

export function displayAmount(
  year: CompareYear,
  lineId: LineId,
  unit: Unit,
  factor: SourcedNumber,
): SourcedNumber {
  const item = year.lineItems.find((row) => row.id === lineId);
  const nominal = item?.amountArs ?? pendiente();
  if (unit === "nominal") return nominal;
  return amountInDeflatorPrices(nominal.value, year.year, factor);
}

export function displayTotal(
  year: CompareYear,
  unit: Unit,
  factor: SourcedNumber,
): SourcedNumber {
  if (unit === "nominal") return year.totalArs;
  return amountInDeflatorPrices(year.totalArs.value, year.year, factor);
}

export function compareFinalidades(
  years: CompareYear[],
  factor: SourcedNumber,
  unit: Unit,
  visible: CompareYearId[],
): LineDelta[] {
  const ordered = [...visible].sort((a, b) => a - b);
  const first = years.find((row) => row.year === ordered[0]);
  if (!first) return [];

  return first.lineItems.map((item) => {
    const amounts = Object.fromEntries(
      years.map((year) => [
        year.year,
        displayAmount(year, item.id, unit, factor),
      ]),
    ) as Record<CompareYearId, SourcedNumber>;

    const usable = ordered
      .map((yearId) => amounts[yearId])
      .filter((metric) => metric.value !== null);

    const from = usable[0]?.value ?? null;
    const to = usable.length > 1 ? (usable[usable.length - 1]?.value ?? null) : null;
    const delta =
      from !== null && to !== null ? pctChange(from, to) : null;

    return {
      id: item.id,
      label: item.label,
      taxonomy: item.taxonomy,
      amounts,
      deltaPct: sourced(
        delta,
        delta === null
          ? "dato pendiente"
          : unit === "real"
            ? (factor.source)
            : "Variación entre el primer y el último año visible con dato.",
        delta === null ? "pendiente" : unit === "real" ? factor.confidence : "alta",
        usable.length < 2
          ? "Hace falta al menos dos años con cifra para el Δ."
          : unit === "real"
            ? factor.note
            : undefined,
      ),
    };
  });
}

export function rankByDelta(rows: LineDelta[]): LineDelta[] {
  return [...rows].sort((a, b) => {
    if (a.deltaPct.value === null && b.deltaPct.value === null) return 0;
    if (a.deltaPct.value === null) return 1;
    if (b.deltaPct.value === null) return -1;
    return (b.deltaPct.value ?? 0) - (a.deltaPct.value ?? 0);
  });
}

export function sumFinalidades(year: CompareYear): number {
  return year.lineItems.reduce((acc, item) => acc + (item.amountArs.value ?? 0), 0);
}
