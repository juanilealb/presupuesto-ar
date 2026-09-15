import type {
  ApprovedBudget,
  ForecastMiss,
  IpcYear,
  LineDelta,
  SourcedNumber,
} from "./types";

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
    return {
      value: null,
      source: "dato pendiente",
      confidence: "pendiente",
      note: "Falta algún IPC anual de la serie.",
    };
  }
  return {
    value: compoundIpcFactor(rates as number[]),
    source: series.map((row) => row.ipcYoY.source).join(" · "),
    confidence: "media",
    note: "Producto de las variaciones dic-dic del IPC nacional. Pasa pesos de la ley 2023 a precios de diciembre de 2025, el nivel con el que se arma 2026.",
  };
}

export function forecastMiss(year: ApprovedBudget | { year: number; macrosProjected: ApprovedBudget["macrosProjected"]; macrosActual: ApprovedBudget["macrosActual"] }): ForecastMiss {
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
    inflationErrorPp: {
      value: inflation,
      source:
        inflation === null
          ? "dato pendiente"
          : `${year.macrosActual.inflationYoY.source} menos ${year.macrosProjected.inflationYoY.source}`,
      confidence: inflation === null ? "pendiente" : "alta",
      note: "Error = observado − proyectado. En puntos porcentuales.",
    },
    growthErrorPp: {
      value: growth,
      source:
        growth === null
          ? "dato pendiente"
          : `${year.macrosActual.realGdpGrowth.source} menos ${year.macrosProjected.realGdpGrowth.source}`,
      confidence: growth === null ? "pendiente" : "alta",
      note: "Error = observado − proyectado. En puntos porcentuales.",
    },
  };
}

export function lineDeltas(
  yearA: ApprovedBudget,
  yearB: ApprovedBudget,
  factor: SourcedNumber,
): LineDelta[] {
  return yearA.lineItems.map((itemA) => {
    const itemB = yearB.lineItems.find((item) => item.id === itemA.id);
    const from = itemA.amountArs.value;
    const to = itemB?.amountArs.value ?? null;
    const nominal =
      from !== null && to !== null ? pctChange(from, to) : null;
    const real =
      from !== null && to !== null && factor.value !== null
        ? realPctChange(from, to, factor.value)
        : null;

    return {
      id: itemA.id,
      label: itemA.label,
      taxonomy: itemA.taxonomy,
      amountA: itemA.amountArs,
      amountB: itemB?.amountArs ?? {
        value: null,
        source: "dato pendiente",
        confidence: "pendiente",
      },
      pctNominal: {
        value: nominal,
        source:
          nominal === null
            ? "dato pendiente"
            : `${itemA.amountArs.source} → ${itemB?.amountArs.source ?? "dato pendiente"}`,
        confidence: nominal === null ? "pendiente" : "alta",
      },
      pctReal: {
        value: real,
        source: real === null ? "dato pendiente" : factor.source,
        confidence: real === null ? "pendiente" : factor.confidence,
        note: factor.note,
      },
      source: `Leyes ${yearA.lawName} y ${yearB.lawName}, artículo 1, misma finalidad.`,
    };
  });
}

export function rankByReal(deltas: LineDelta[], direction: "up" | "down") {
  return [...deltas]
    .filter((row) => row.pctReal.value !== null)
    .sort((a, b) => {
      const left = a.pctReal.value ?? 0;
      const right = b.pctReal.value ?? 0;
      return direction === "up" ? right - left : left - right;
    });
}
