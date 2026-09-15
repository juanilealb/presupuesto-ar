import { pendiente, sourced } from "./helpers";
import type { ForecastYear } from "./types";

const MENSAJE_2023 =
  "Mensaje del Proyecto de Presupuesto 2023 (MECON/ONP). https://www.mecon.gob.ar/onp/documentos/presutexto/proy2023/mensaje/mensaje2023.pdf";

const MENSAJE_2026 =
  "Mensaje del Proyecto de Presupuesto 2026 (MECON/ONP). https://www.mecon.gob.ar/onp/documentos/presutexto/proy2026/mensaje/mensaje2026.pdf";

const INDEC_IPC_2023 =
  "INDEC, IPC cobertura nacional, diciembre 2023. 211,4%. https://www.indec.gob.ar/uploads/informesdeprensa/ipc_01_24DBD5D8158C.pdf";

const INDEC_PIB_2023 =
  "INDEC, Informe de avance del nivel de actividad, IV trimestre 2023. PIB 2023 −1,6%. https://www.indec.gob.ar/uploads/informesdeprensa/pib_03_24624724AF4B.pdf";

const INDEC_IPC_2024 =
  "INDEC, IPC nacional diciembre 2024. 117,8%.";

const INDEC_PIB_2024 =
  "INDEC, Cuentas nacionales. PIB real 2024 −1,3%.";

const INDEC_IPC_2025 =
  "INDEC, IPC cobertura nacional, diciembre 2025. 31,5%.";

const INDEC_PIB_2025 =
  "INDEC, Cuentas nacionales. PIB real 2025 +4,4%.";

const PROY_2024 =
  "Proyecto de Presupuesto 2024, no sancionado. El ejercicio corrió por prórroga (Decreto 88/2023). No es ley.";

const PROY_2025 =
  "Proyecto de Presupuesto 2025, no sancionado. El ejercicio corrió por prórroga (Decreto 1131/2024). No es ley.";

export const forecastYears: ForecastYear[] = [
  {
    year: 2023,
    kind: "ley",
    instrument: "Ley 27.701 / mensaje 2023",
    macrosProjected: {
      inflationYoY: sourced(60, MENSAJE_2023, "alta", "IPC dic/dic. Supuesto del mensaje."),
      realGdpGrowth: sourced(2, MENSAJE_2023, "alta", "PIB real. Supuesto del mensaje."),
    },
    macrosActual: {
      inflationYoY: sourced(211.4, INDEC_IPC_2023, "alta"),
      realGdpGrowth: sourced(-1.6, INDEC_PIB_2023, "alta"),
    },
    sources: [
      {
        label: "Mensaje 2023 (ONP)",
        url: "https://www.mecon.gob.ar/onp/documentos/presutexto/proy2023/mensaje/mensaje2023.pdf",
      },
      {
        label: "INDEC IPC diciembre 2023",
        url: "https://www.indec.gob.ar/uploads/informesdeprensa/ipc_01_24DBD5D8158C.pdf",
      },
      {
        label: "INDEC PIB IV trimestre 2023",
        url: "https://www.indec.gob.ar/uploads/informesdeprensa/pib_03_24624724AF4B.pdf",
      },
    ],
  },
  {
    year: 2024,
    kind: "proyecto-no-sancionado",
    instrument: "Proyecto 2024 (no sancionado)",
    note: "Prórroga Decreto 88/2023. El supuesto es del proyecto, no de una ley.",
    macrosProjected: {
      inflationYoY: sourced(69.5, PROY_2024, "media", "Proyecto no sancionado, bajo prórroga."),
      realGdpGrowth: sourced(2.7, PROY_2024, "media", "Proyecto no sancionado, bajo prórroga."),
    },
    macrosActual: {
      inflationYoY: sourced(117.8, INDEC_IPC_2024, "alta"),
      realGdpGrowth: sourced(-1.3, INDEC_PIB_2024, "alta"),
    },
    sources: [
      {
        label: "Decreto 88/2023 (prórroga 2024)",
        url: "https://www.argentina.gob.ar/normativa/nacional/decreto-88-2023-395699",
      },
    ],
  },
  {
    year: 2025,
    kind: "proyecto-no-sancionado",
    instrument: "Proyecto 2025 (no sancionado)",
    note: "Prórroga Decreto 1131/2024. El supuesto es del proyecto, no de una ley.",
    macrosProjected: {
      inflationYoY: sourced(18.3, PROY_2025, "media", "Proyecto no sancionado, bajo prórroga."),
      realGdpGrowth: sourced(5, PROY_2025, "media", "Proyecto no sancionado, bajo prórroga."),
    },
    macrosActual: {
      inflationYoY: sourced(31.5, INDEC_IPC_2025, "alta"),
      realGdpGrowth: sourced(4.4, INDEC_PIB_2025, "alta"),
    },
    sources: [
      {
        label: "Decreto 1131/2024 (prórroga 2025)",
        url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/405000-409999/407815/norma.htm",
      },
    ],
  },
  {
    year: 2026,
    kind: "ley",
    instrument: "Ley 27.798 / mensaje 2026",
    note: "El año 2026 no cerró. Observado pendiente.",
    macrosProjected: {
      inflationYoY: sourced(10.1, MENSAJE_2026, "alta", "IPC dic/dic. Supuesto del mensaje."),
      realGdpGrowth: sourced(5, MENSAJE_2026, "alta", "PIB real. Supuesto del mensaje."),
    },
    macrosActual: {
      inflationYoY: pendiente(
        "El año 2026 no cerró. Cuando INDEC publique el IPC dic/dic 2026, cargar acá. No usamos un interanual de mitad de año como cierre.",
      ),
      realGdpGrowth: pendiente(
        "El año 2026 no cerró. Cuando INDEC publique el PIB anual 2026, cargar acá.",
      ),
    },
    sources: [
      {
        label: "Mensaje 2026 (ONP)",
        url: "https://www.mecon.gob.ar/onp/documentos/presutexto/proy2026/mensaje/mensaje2026.pdf",
      },
      {
        label: "Ley 27.798",
        url: "https://www.argentina.gob.ar/normativa/nacional/ley-27798-422000/texto",
      },
    ],
  },
];
