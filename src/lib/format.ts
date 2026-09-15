import type { CompareStatus, Confidence, ForecastKind, SourcedNumber } from "@/data/types";

const ars = new Intl.NumberFormat("es-AR", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});
const num = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});
const signed = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
  signDisplay: "exceptZero",
});
const billones = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

export function formatArs(value: number): string {
  return `$ ${ars.format(value)}`;
}

export function formatBillones(value: number): string {
  return `$ ${billones.format(value / 1e12)} billones`;
}

export function formatPct(value: number, withSign = false): string {
  return `${(withSign ? signed : num).format(value)}%`;
}

export function formatPp(value: number): string {
  return `${signed.format(value)} pp`;
}

export function formatSourced(
  metric: SourcedNumber,
  kind: "pct" | "pp" | "ars" | "billones",
): string {
  if (metric.value === null) return "Dato pendiente";
  if (kind === "ars") return formatArs(metric.value);
  if (kind === "billones") return formatBillones(metric.value);
  if (kind === "pp") return formatPp(metric.value);
  return formatPct(metric.value, true);
}

export function confidenceLabel(confidence: Confidence): string {
  if (confidence === "alta") return "Alta";
  if (confidence === "media") return "Media";
  if (confidence === "baja") return "Baja";
  return "Pendiente";
}

export function statusLabel(status: CompareStatus): string {
  if (status === "ley") return "Ley";
  return "Proyecto PE";
}

export function forecastKindLabel(kind: ForecastKind): string {
  if (kind === "ley") return "Ley / mensaje";
  return "Proyecto no sancionado";
}

export function yearShort(year: number): string {
  return String(year).slice(2);
}
