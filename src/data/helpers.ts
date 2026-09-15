import type { Confidence, LineId, LineItem, SourcedNumber } from "./types";

export const FINALIDAD_LABEL: Record<LineId, string> = {
  admin: "Administración gubernamental",
  defensa: "Servicios de defensa y seguridad",
  sociales: "Servicios sociales",
  economicos: "Servicios económicos",
  deuda: "Deuda pública",
};

export function sourced(
  value: number | null,
  source: string,
  confidence: Confidence,
  note?: string,
): SourcedNumber {
  return { value, source, confidence, note };
}

export function pendiente(note?: string): SourcedNumber {
  return sourced(null, "dato pendiente", "pendiente", note);
}

export function finalidad(
  id: LineId,
  value: number,
  source: string,
): LineItem {
  return {
    id,
    label: FINALIDAD_LABEL[id],
    taxonomy: "finalidad",
    amountArs: sourced(value, source, "alta"),
  };
}
