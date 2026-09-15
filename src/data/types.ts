export type Confidence = "alta" | "media" | "baja" | "pendiente";

export type Taxonomy = "finalidad";

export type SourcedNumber = {
  value: number | null;
  source: string;
  confidence: Confidence;
  note?: string;
};

export type MacroPair = {
  inflationYoY: SourcedNumber;
  realGdpGrowth: SourcedNumber;
};

export type LineItem = {
  id: string;
  label: string;
  taxonomy: Taxonomy;
  amountArs: SourcedNumber;
};

export type SourceLink = {
  label: string;
  url: string;
};

type BudgetBase = {
  year: number;
  sources: SourceLink[];
};

export type ApprovedBudget = BudgetBase & {
  status: "aprobado";
  lawName: string;
  lawUrl: string;
  government: string;
  macrosProjected: MacroPair;
  macrosActual: MacroPair;
  lineItems: LineItem[];
};

export type ProrrogaBudget = BudgetBase & {
  status: "prorroga";
  decreeName: string;
  decreeUrl: string;
  why: string;
};

export type PendingBudget = BudgetBase & {
  status: "pendiente";
  why: string;
  macrosProjected: MacroPair;
  macrosActual: MacroPair;
  lineItems: LineItem[];
};

export type BudgetYear = ApprovedBudget | ProrrogaBudget | PendingBudget;

export type LineDelta = {
  id: string;
  label: string;
  taxonomy: Taxonomy;
  amountA: SourcedNumber;
  amountB: SourcedNumber;
  pctNominal: SourcedNumber;
  pctReal: SourcedNumber;
  source: string;
};

export type ForecastMiss = {
  year: number;
  inflationErrorPp: SourcedNumber;
  growthErrorPp: SourcedNumber;
};

export type IpcYear = {
  year: number;
  ipcYoY: SourcedNumber;
};

export function isApproved(year: BudgetYear): year is ApprovedBudget {
  return year.status === "aprobado";
}

export function isPending(year: BudgetYear): year is PendingBudget {
  return year.status === "pendiente";
}

export function isProrroga(year: BudgetYear): year is ProrrogaBudget {
  return year.status === "prorroga";
}
