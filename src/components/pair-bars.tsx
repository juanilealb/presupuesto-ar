import { formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";

function width(value: number, max: number): number {
  if (max === 0) return 0;
  return Math.max(4, (Math.abs(value) / max) * 100);
}

export function PairBars({
  projected,
  actual,
}: {
  projected: number | null;
  actual: number | null;
}) {
  const max = Math.max(Math.abs(projected ?? 0), Math.abs(actual ?? 0), 1);

  return (
    <div className="flex flex-col gap-3">
      <BarRow label="Proyectado" value={projected} max={max} tone="projected" />
      <BarRow label="Observado" value={actual} max={max} tone="actual" />
    </div>
  );
}

function BarRow({
  label,
  value,
  max,
  tone,
}: {
  label: string;
  value: number | null;
  max: number;
  tone: "projected" | "actual";
}) {
  const empty = value === null;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums">
          {empty ? "Dato pendiente" : formatPct(value, true)}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        {empty ? (
          <div className="h-full w-1/6 rounded-full bg-border" />
        ) : (
          <div
            className={cn(
              "h-full rounded-full",
              tone === "projected" ? "bg-chart-2" : "bg-primary",
              value < 0 && "bg-destructive",
            )}
            style={{ width: `${width(value, max)}%` }}
          />
        )}
      </div>
    </div>
  );
}
