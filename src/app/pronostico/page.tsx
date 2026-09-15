import { ForecastDashboard } from "@/components/forecast-dashboard";
import { forecastMisses, forecastYears, leadMiss } from "@/data";

export const metadata = {
  title: "Pronóstico",
  description:
    "El error del propio presupuesto contra el INDEC. No es un modelo nuevo.",
};

export default function PronosticoPage() {
  if (!leadMiss) {
    throw new Error("Falta al menos un error de pronóstico medible.");
  }

  return (
    <div className="flex flex-col gap-10 xl:gap-14">
      <header className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm text-muted-foreground">Presupuesto vs INDEC</p>
        <h1 className="font-heading text-4xl leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl">
          El error del supuesto
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Cada presupuesto trae inflación y PIB. INDEC mide el cierre. Error =
          observado − supuesto. 2024 y 2025 son supuestos de proyectos que no
          se sancionaron, bajo prórroga. 2026 observado, pendiente.
        </p>
      </header>

      <ForecastDashboard
        years={forecastYears}
        misses={forecastMisses}
        lead={leadMiss}
      />
    </div>
  );
}
