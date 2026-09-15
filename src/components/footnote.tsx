import type { SourcedNumber } from "@/data/types";
import { confidenceLabel } from "@/lib/format";

export function Footnote({ metric }: { metric: SourcedNumber }) {
  return (
    <p className="text-xs leading-relaxed break-words text-muted-foreground">
      <span className="text-foreground/70">
        Confianza {confidenceLabel(metric.confidence)}.
      </span>{" "}
      {metric.source}
      {metric.note ? ` ${metric.note}` : ""}
    </p>
  );
}
