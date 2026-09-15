import { BANNER_PRORROGA, prorrogaYears } from "@/data";

export function ProrrogaBanner() {
  return (
    <aside
      role="note"
      className="rounded-xl bg-muted px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-5 sm:py-4 sm:text-base"
    >
      <p className="text-foreground">{BANNER_PRORROGA}</p>
      <p className="mt-1">
        {prorrogaYears
          .map((row) => `${row.year}: ${row.decreeName}`)
          .join(" · ")}
        .
      </p>
    </aside>
  );
}
