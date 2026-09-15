import { Badge } from "@/components/ui/badge";
import type { Confidence } from "@/data/types";
import { confidenceLabel } from "@/lib/format";

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  const variant =
    confidence === "pendiente"
      ? "outline"
      : confidence === "alta"
        ? "secondary"
        : "outline";

  return (
    <Badge variant={variant} className="font-normal tracking-normal">
      {confidenceLabel(confidence)}
    </Badge>
  );
}
