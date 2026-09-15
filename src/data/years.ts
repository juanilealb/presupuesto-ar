import type { BudgetYear, IpcYear, LineItem, MacroPair } from "./types";

const pendiente = (note?: string) => ({
  value: null,
  source: "dato pendiente",
  confidence: "pendiente" as const,
  note,
});

const emptyFinalidades: LineItem[] = [
  { id: "admin", label: "Administración gubernamental", taxonomy: "finalidad", amountArs: pendiente() },
  { id: "defensa", label: "Servicios de defensa y seguridad", taxonomy: "finalidad", amountArs: pendiente() },
  { id: "sociales", label: "Servicios sociales", taxonomy: "finalidad", amountArs: pendiente() },
  { id: "economicos", label: "Servicios económicos", taxonomy: "finalidad", amountArs: pendiente() },
  { id: "deuda", label: "Deuda pública", taxonomy: "finalidad", amountArs: pendiente() },
];

const emptyMacros: MacroPair = {
  inflationYoY: pendiente("Cuando exista mensaje o ley, cargar el supuesto."),
  realGdpGrowth: pendiente("Cuando exista mensaje o ley, cargar el supuesto."),
};

function finalidad(
  id: LineItem["id"],
  label: string,
  value: number,
  law: string,
): LineItem {
  return {
    id,
    label,
    taxonomy: "finalidad",
    amountArs: {
      value,
      source: `${law}, artículo 1, planilla de finalidades.`,
      confidence: "alta",
    },
  };
}

export const ipcForDeflator: IpcYear[] = [
  {
    year: 2023,
    ipcYoY: {
      value: 211.4,
      source:
        "INDEC, IPC cobertura nacional, diciembre 2023. Variación acumulada del año 211,4%.",
      confidence: "alta",
    },
  },
  {
    year: 2024,
    ipcYoY: {
      value: 117.8,
      source:
        "INDEC, IPC nacional diciembre 2024 (117,8%), citado en el Mensaje del Proyecto de Presupuesto 2026 (MECON/ONP).",
      confidence: "alta",
    },
  },
  {
    year: 2025,
    ipcYoY: {
      value: 31.5,
      source:
        "INDEC, IPC cobertura nacional, diciembre 2025. Variación acumulada del año 31,5%.",
      confidence: "alta",
    },
  },
];

export const years: BudgetYear[] = [
  {
    year: 2023,
    status: "aprobado",
    lawName: "Ley 27.701",
    lawUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27701-375860/texto",
    government: "Administración Fernández / Massa. Sanción 2022.",
    macrosProjected: {
      inflationYoY: {
        value: 60,
        source:
          "Proyecto de Presupuesto 2023 (MECON, sept. 2022), reportado por Infobae y Bloomberg Línea.",
        confidence: "media",
        note: "Supuesto del mensaje. No es ejecución.",
      },
      realGdpGrowth: {
        value: 2,
        source:
          "Proyecto de Presupuesto 2023 (MECON, sept. 2022), reportado por Infobae y Bloomberg Línea.",
        confidence: "media",
      },
    },
    macrosActual: {
      inflationYoY: {
        value: 211.4,
        source:
          "INDEC, IPC cobertura nacional, diciembre 2023. https://www.indec.gob.ar/uploads/informesdeprensa/ipc_01_24DBD5D8158C.pdf",
        confidence: "alta",
      },
      realGdpGrowth: {
        value: -1.6,
        source:
          "INDEC, Informe de avance del nivel de actividad, cuarto trimestre de 2023. PIB 2023 −1,6%. https://www.indec.gob.ar/uploads/informesdeprensa/pib_03_24624724AF4B.pdf",
        confidence: "alta",
      },
    },
    lineItems: [
      finalidad("admin", "Administración gubernamental", 1_628_433_324_230, "Ley 27.701"),
      finalidad("defensa", "Servicios de defensa y seguridad", 1_255_059_015_383, "Ley 27.701"),
      finalidad("sociales", "Servicios sociales", 18_651_628_646_227, "Ley 27.701"),
      finalidad("economicos", "Servicios económicos", 4_504_399_928_803, "Ley 27.701"),
      finalidad("deuda", "Deuda pública", 2_914_510_400_388, "Ley 27.701"),
    ],
    sources: [
      {
        label: "Ley 27.701 (InfoLEG)",
        url: "https://www.argentina.gob.ar/normativa/nacional/ley-27701-375860/texto",
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
    status: "prorroga",
    decreeName: "Decreto 88/2023",
    decreeUrl: "https://www.argentina.gob.ar/normativa/nacional/decreto-88-2023-395699",
    why: "El Congreso no sancionó un Presupuesto 2024. El Ejecutivo prorrogó el de 2023. No hay ley de leyes propia. No hay supuestos oficiales de un presupuesto 2024 para comparar contra el INDEC.",
    sources: [
      {
        label: "Decreto 88/2023",
        url: "https://www.argentina.gob.ar/normativa/nacional/decreto-88-2023-395699",
      },
    ],
  },
  {
    year: 2025,
    status: "prorroga",
    decreeName: "Decreto 1131/2024",
    decreeUrl:
      "https://servicios.infoleg.gob.ar/infolegInternet/anexos/405000-409999/407815/norma.htm",
    why: "Hubo proyecto, no hubo ley. El decreto 1131/2024 volvió a prorrogar la Ley 27.701. Los supuestos de un proyecto que no se sancionó no son el presupuesto 2025.",
    sources: [
      {
        label: "Decreto 1131/2024",
        url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/405000-409999/407815/norma.htm",
      },
    ],
  },
  {
    year: 2026,
    status: "aprobado",
    lawName: "Ley 27.798",
    lawUrl: "https://www.argentina.gob.ar/normativa/nacional/ley-27798-422000/texto",
    government: "Administración Milei. Sanción diciembre 2025.",
    macrosProjected: {
      inflationYoY: {
        value: 10.1,
        source:
          "Mensaje del Proyecto de Presupuesto 2026 (MECON/ONP) y cobertura de la sanción (Infobae, EFE).",
        confidence: "media",
      },
      realGdpGrowth: {
        value: 5,
        source:
          "Mensaje del Proyecto de Presupuesto 2026 (MECON/ONP) y cobertura de la sanción (Infobae, EFE).",
        confidence: "media",
      },
    },
    macrosActual: {
      inflationYoY: pendiente(
        "El año 2026 no cerró. Cuando INDEC publique el IPC dic-dic 2026, cargar acá. No usamos un interanual de mitad de año como si fuera el cierre.",
      ),
      realGdpGrowth: pendiente(
        "El año 2026 no cerró. Cuando INDEC publique el PIB anual 2026, cargar acá.",
      ),
    },
    lineItems: [
      finalidad("admin", "Administración gubernamental", 8_859_071_552_843, "Ley 27.798"),
      finalidad("defensa", "Servicios de defensa y seguridad", 7_111_223_342_891, "Ley 27.798"),
      finalidad("sociales", "Servicios sociales", 106_521_648_374_775, "Ley 27.798"),
      finalidad("economicos", "Servicios económicos", 11_457_503_006_150, "Ley 27.798"),
      finalidad("deuda", "Deuda pública", 14_119_847_249_890, "Ley 27.798"),
    ],
    sources: [
      {
        label: "Ley 27.798 (InfoLEG)",
        url: "https://www.argentina.gob.ar/normativa/nacional/ley-27798-422000/texto",
      },
      {
        label: "Mensaje del proyecto 2026 (ONP)",
        url: "https://www.mecon.gob.ar/onp/documentos/presutexto/proy2026/mensaje/mensaje2026.pdf",
      },
    ],
  },
  {
    year: 2027,
    status: "pendiente",
    why: "No hay PDF ni ley 2027. Esta ficha existe para no improvisar el día que aterrice el mensaje. Editá src/data/years.ts.",
    macrosProjected: emptyMacros,
    macrosActual: {
      inflationYoY: pendiente(),
      realGdpGrowth: pendiente(),
    },
    lineItems: emptyFinalidades,
    sources: [],
  },
];
