import Link from "next/link";
import { ForecastCompare } from "@/components/forecast-compare";
import { ForecastHero } from "@/components/forecast-module";
import { ForecastModule } from "@/components/forecast-module";
import { WinnersModule } from "@/components/winners-module";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SITE,
  miss2023,
  miss2026,
  pendingYear,
  priceFactor,
  winners,
  year2023,
  year2026,
} from "@/data";

export default function HomePage() {
  const upcoming = pendingYear();

  return (
    <div className="flex flex-col gap-12 xl:gap-16">
      <section className="grid gap-8 pt-2 xl:grid-cols-12 xl:items-end xl:gap-10">
        <div className="flex min-w-0 flex-col gap-5 xl:col-span-7">
          <p className="text-sm text-muted-foreground">Presupuesto nacional</p>
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl">
            {SITE.headline}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {SITE.dek}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            2024 y 2025 no tuvieron presupuesto sancionado. El Ejecutivo
            prorrogó el de 2023. Acá no hay números inventados para esos años.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/anio/2024"
              className="tap rounded-full bg-muted px-4 text-foreground"
            >
              2024, prórroga
            </Link>
            <Link
              href="/anio/2025"
              className="tap rounded-full bg-muted px-4 text-foreground"
            >
              2025, prórroga
            </Link>
          </div>
        </div>
        <div className="min-w-0 xl:col-span-5">
          <ForecastHero miss={miss2023} />
        </div>
      </section>

      <section id="error" className="flex flex-col gap-6">
        <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
          Lo que prometió cada ley
        </h2>
        <div className="grid gap-4 lg:hidden">
          <ForecastModule year={year2023} miss={miss2023} />
          <ForecastModule year={year2026} miss={miss2026} />
        </div>
        <div className="hidden lg:block">
          <ForecastCompare
            a={year2023}
            b={year2026}
            missA={miss2023}
            missB={miss2026}
          />
        </div>
      </section>

      <WinnersModule winners={winners} factor={priceFactor} />

      {upcoming ? (
        <Card id="2027" className="border-dashed bg-card/40">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="font-heading text-2xl">2027</CardTitle>
            <Badge variant="outline">Próximamente</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-base leading-relaxed text-muted-foreground">
            <p>{upcoming.why}</p>
            <Link
              href="/anio/2027"
              className="tap text-foreground md:hover:underline"
            >
              Ver la ficha vacía
            </Link>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
