import { notFound } from "next/navigation";
import { YearBody } from "@/components/year-body";
import { getYear, years } from "@/data";

type YearParams = { year: string };

export function generateStaticParams() {
  return years.map((row) => ({ year: String(row.year) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<YearParams>;
}) {
  const { year } = await params;
  const row = getYear(Number(year));
  if (!row) return { title: "Año no encontrado" };
  return {
    title: `${row.year}`,
    description:
      row.status === "aprobado"
        ? `Proyectado vs observado en ${row.year}.`
        : row.status === "prorroga"
          ? `Sin ley de presupuesto en ${row.year}.`
          : `Ficha vacía ${row.year}.`,
  };
}

export default async function YearPage({
  params,
}: {
  params: Promise<YearParams>;
}) {
  const { year } = await params;
  const row = getYear(Number(year));
  if (!row) notFound();
  return <YearBody year={row} />;
}
