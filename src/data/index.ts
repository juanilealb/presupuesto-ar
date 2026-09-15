import { compareYears } from "./compare-years";
import { deflatorFactor, forecastMiss, largestAvailableMiss } from "./compute";
import { ipcForDeflator } from "./deflator";
import { forecastYears } from "./forecast";
import type { CompareYear, CompareYearId } from "./types";

export * from "./types";
export * from "./compute";
export { ipcForDeflator } from "./deflator";
export { compareYears } from "./compare-years";
export { forecastYears } from "./forecast";
export { BANNER_PRORROGA, prorrogaSources, prorrogaYears } from "./prorroga";
export { FINALIDAD_LABEL } from "./helpers";

export const COMPARE_YEAR_IDS = [2023, 2026, 2027] as const satisfies readonly CompareYearId[];

export function getCompareYear(year: number): CompareYear | undefined {
  return compareYears.find((row) => row.year === year);
}

export const year2023 = getCompareYear(2023)!;
export const year2026 = getCompareYear(2026)!;
export const year2027 = getCompareYear(2027)!;

export const priceFactor = deflatorFactor(ipcForDeflator);

export const forecastMisses = forecastYears.map(forecastMiss);
export const leadMiss = largestAvailableMiss(forecastYears);

export const SITE = {
  name: "Presupuesto vs realidad",
  headline: "2027 vs 2026 vs 2023",
  dek: "Tres presupuestos. Cinco finalidades del artículo 1. 2027 es proyecto del PE, no ley. 2024 y 2025 fueron prórroga: acá no hay cifras inventadas.",
} as const;
