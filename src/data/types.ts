export type Confidence = "alta" | "media" | "baja" | "pendiente";

export type LineId = "admin" | "defensa" | "sociales" | "economicos" | "deuda";

export type Taxonomy = "finalidad";

export type CompareYearId = 2023 | 2026 | 2027;

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
  id: LineId;
  label: string;
  taxonomy: Taxonomy;
  amountArs: SourcedNumber;
};

export type SourceLink = {
  label: string;
  url: string;
};

export type CompareStatus = "ley" | "proyecto";

export type CompareYear = {
  year: CompareYearId;
  status: CompareStatus;
  instrument: string;
  instrumentUrl: string;
  government: string;
  chip: string;
  statusNote: string;
  macrosProjected: MacroPair;
  lineItems: LineItem[];
  totalArs: SourcedNumber;
  extras?: {
    rfSpn?: SourcedNumber;
    recursosApn?: SourcedNumber;
    gastosApn?: SourcedNumber;
  };
  sources: SourceLink[];
};

export type ForecastKind = "ley" | "proyecto-no-sancionado";

export type ForecastYear = {
  year: number;
  kind: ForecastKind;
  instrument: string;
  note?: string;
  macrosProjected: MacroPair;
  macrosActual: MacroPair;
  sources: SourceLink[];
};

export type ProrrogaYear = {
  year: 2024 | 2025;
  decreeName: string;
  decreeUrl: string;
  why: string;
};

export type LineDelta = {
  id: LineId;
  label: string;
  taxonomy: Taxonomy;
  amounts: Record<CompareYearId, SourcedNumber>;
  deltaPct: SourcedNumber;
};

export type ForecastMiss = {
  year: number;
  kind: ForecastKind;
  instrument: string;
  note?: string;
  inflationErrorPp: SourcedNumber;
  growthErrorPp: SourcedNumber;
};

export type IpcYear = {
  year: number;
  ipcYoY: SourcedNumber;
};

export type Unit = "nominal" | "real";

export function isLey(year: CompareYear): boolean {
  return year.status === "ley";
}

export function isProyecto(year: CompareYear): boolean {
  return year.status === "proyecto";
}
