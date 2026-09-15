import { deflatorFactor, forecastMiss, lineDeltas, rankByReal } from "./compute";
import { ipcForDeflator, years } from "./years";
import {
  isApproved,
  type ApprovedBudget,
  type BudgetYear,
  type PendingBudget,
} from "./types";

export * from "./types";
export * from "./compute";
export { ipcForDeflator, years } from "./years";

export const PAIR = [2023, 2026] as const;

export function getYear(year: number): BudgetYear | undefined {
  return years.find((row) => row.year === year);
}

export function approvedYear(year: (typeof PAIR)[number]): ApprovedBudget {
  const row = getYear(year);
  if (!row || !isApproved(row)) {
    throw new Error(`Falta el presupuesto aprobado ${year}`);
  }
  return row;
}

export const year2023 = approvedYear(2023);
export const year2026 = approvedYear(2026);

export const priceFactor = deflatorFactor(ipcForDeflator);
export const deltas = lineDeltas(year2023, year2026, priceFactor);
export const winners = rankByReal(deltas, "up");

export const miss2023 = forecastMiss(year2023);
export const miss2026 = forecastMiss(year2026);

export function pendingYear(): PendingBudget | undefined {
  return years.find((row): row is PendingBudget => row.status === "pendiente");
}

export const SITE = {
  name: "Presupuesto vs realidad",
  headline: "Prometieron 60. INDEC midió 211,4.",
  dek: "El Presupuesto 2023 prometió inflación de 60% y crecimiento de 2%. El año cerró en 211,4% y −1,6%. Entre esa ley y la de 2026, en pesos constantes, todas las finalidades cayeron. Servicios económicos se llevó el golpe.",
} as const;
