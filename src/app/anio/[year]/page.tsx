import { notFound, redirect } from "next/navigation";

type YearParams = { year: string };

export function generateStaticParams() {
  return ["2023", "2024", "2025", "2026", "2027"].map((year) => ({ year }));
}

export default async function YearPage({
  params,
}: {
  params: Promise<YearParams>;
}) {
  const { year } = await params;
  const n = Number(year);
  if (n === 2024 || n === 2025) redirect("/pronostico");
  if (n === 2023 || n === 2026 || n === 2027) redirect("/comparar");
  notFound();
}
