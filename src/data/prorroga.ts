import type { ProrrogaYear, SourceLink } from "./types";

export const BANNER_PRORROGA =
  "2024 y 2025 fueron prórroga de la Ley 27.701. En Comparar no hay cifras inventadas para esos años.";

export const prorrogaYears: ProrrogaYear[] = [
  {
    year: 2024,
    decreeName: "Decreto 88/2023",
    decreeUrl: "https://www.argentina.gob.ar/normativa/nacional/decreto-88-2023-395699",
    why: "El Congreso no sancionó un Presupuesto 2024. El Ejecutivo prorrogó el de 2023. Los supuestos de un proyecto no sancionado no son ley de leyes.",
  },
  {
    year: 2025,
    decreeName: "Decreto 1131/2024",
    decreeUrl:
      "https://servicios.infoleg.gob.ar/infolegInternet/anexos/405000-409999/407815/norma.htm",
    why: "Hubo proyecto, no hubo ley. El decreto 1131/2024 volvió a prorrogar la Ley 27.701.",
  },
];

export const prorrogaSources: SourceLink[] = prorrogaYears.map((row) => ({
  label: `${row.decreeName} (prórroga ${row.year})`,
  url: row.decreeUrl,
}));
