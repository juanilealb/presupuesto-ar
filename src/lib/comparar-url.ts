import { COMPARE_YEAR_IDS, type CompareYearId, type Unit } from "@/data";

export function parseCompararState(searchParams: {
  unidad?: string | string[];
  anios?: string | string[];
}): { unit: Unit; visible: CompareYearId[] } {
  const unidad = Array.isArray(searchParams.unidad)
    ? searchParams.unidad[0]
    : searchParams.unidad;
  const anios = Array.isArray(searchParams.anios)
    ? searchParams.anios[0]
    : searchParams.anios;

  const unit: Unit = unidad === "real" ? "real" : "nominal";
  const parsed = (anios ?? "")
    .split(",")
    .map((item) => Number(item))
    .filter((year): year is CompareYearId =>
      (COMPARE_YEAR_IDS as readonly number[]).includes(year),
    );
  const visible = parsed.length > 0 ? parsed : [...COMPARE_YEAR_IDS];

  return { unit, visible };
}

export function compararHref(unit: Unit, visible: CompareYearId[]): string {
  const params = new URLSearchParams();
  if (unit === "real") params.set("unidad", "real");
  if (
    visible.length !== COMPARE_YEAR_IDS.length ||
    COMPARE_YEAR_IDS.some((year) => !visible.includes(year))
  ) {
    params.set("anios", visible.join(","));
  }
  const query = params.toString();
  return query ? `/comparar?${query}` : "/comparar";
}

export function toggleYearSelection(
  visible: CompareYearId[],
  year: CompareYearId,
): CompareYearId[] {
  if (visible.includes(year)) {
    if (visible.length === 1) return visible;
    return visible.filter((item) => item !== year);
  }
  return COMPARE_YEAR_IDS.filter((item) => item === year || visible.includes(item));
}
