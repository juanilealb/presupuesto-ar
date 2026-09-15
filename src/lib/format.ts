import type { Confidence, SourcedNumber } from "@/data/types";

const ars = new Intl.NumberFormat("es-AR", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 1 });
const num = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1, minimumFractionDigits: 0 });
const signed = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
  signDisplay: "exceptZero",
});

export function formatArs(value: number): string {
  return `$ ${ars.format(value)}`;
}

export function formatPct(value: number, withSign = false): string {
  return `${(withSign ? signed : num).format(value)}%`;
}

export function formatPp(value: number): string {
  return `${signed.format(value)} pp`;
}

export function formatSourced(
  metric: SourcedNumber,
  kind: "pct" | "pp" | "ars",
): string {
  if (metric.value === null) return "Dato pendiente";
  if (kind === "ars") return formatArs(metric.value);
  if (kind === "pp") return formatPp(metric.value);
  return formatPct(metric.value, true);
}

export function confidenceLabel(confidence: Confidence): string {
  if (confidence === "alta") return "Alta";
  if (confidence === "media") return "Media";
  if (confidence === "baja") return "Baja";
  return "Pendiente";
}

export function statusLabel(status: "aprobado" | "prorroga" | "pendiente"): string {
  if (status === "aprobado") return "Aprobado";
  if (status === "prorroga") return "Prórroga";
  return "Próximamente";
}
