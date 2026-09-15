import { finalidad, sourced } from "./helpers";
import type { CompareYear } from "./types";

const ART1_2023 = "Ley 27.701, artículo 1, planilla de finalidades.";
const ART1_2026 = "Ley 27.798, artículo 1, planilla de finalidades.";
const ART1_2027 =
  "Proyecto de Presupuesto 2027 (ONP), artículo 1, planilla de finalidades. No es ley.";

const MENSAJE_2023 =
  "Mensaje del Proyecto de Presupuesto 2023, supuestos macro. No está en el texto de la ley. https://www.mecon.gob.ar/onp/documentos/presutexto/proy2023/mensaje/mensaje2023.pdf";

const MENSAJE_2026 =
  "Mensaje del Proyecto de Presupuesto 2026, supuestos macro. https://www.mecon.gob.ar/onp/documentos/presutexto/proy2026/mensaje/mensaje2026.pdf";

const MENSAJE_2027 =
  "Mensaje del Proyecto de Presupuesto 2027, §2.3. No usar cifras de prensa (~16% de inflación). https://www.economia.gob.ar/onp/documentos/presutexto/proy2027/mensaje/mensaje2027.pdf";

const LEY_2027 =
  "Proyecto de ley de Presupuesto 2027 (ONP, subido ~14–15 sep 2026). Pendiente de sanción. https://www.economia.gob.ar/onp/documentos/presutexto/proy2027/ley/pdf/proy2027.pdf";

export const compareYears: CompareYear[] = [
  {
    year: 2023,
    status: "ley",
    instrument: "Ley 27.701",
    instrumentUrl:
      "https://www.argentina.gob.ar/normativa/nacional/ley-27701-375860/texto",
    government: "Administración Fernández / Massa. Sanción 16/11/2022. Dto 799/2022. BO 01/12/2022.",
    chip: "Ley",
    statusNote: "Sancionada. Totales del artículo 1.",
    macrosProjected: {
      inflationYoY: sourced(60, MENSAJE_2023, "alta", "IPC dic/dic. Supuesto del mensaje, no ejecución."),
      realGdpGrowth: sourced(2, MENSAJE_2023, "alta", "PIB real. Supuesto del mensaje, no ejecución."),
    },
    lineItems: [
      finalidad("admin", 1_628_433_324_230, ART1_2023),
      finalidad("defensa", 1_255_059_015_383, ART1_2023),
      finalidad("sociales", 18_651_628_646_227, ART1_2023),
      finalidad("economicos", 4_504_399_928_803, ART1_2023),
      finalidad("deuda", 2_914_510_400_388, ART1_2023),
    ],
    totalArs: sourced(
      28_954_031_315_031,
      `${ART1_2023} TOTAL.`,
      "alta",
    ),
    sources: [
      {
        label: "Ley 27.701 (InfoLEG 375860)",
        url: "https://www.argentina.gob.ar/normativa/nacional/ley-27701-375860/texto",
      },
      {
        label: "Boletín Oficial, 1/12/2022",
        url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/276927/20221201",
      },
      {
        label: "Mensaje del proyecto 2023 (ONP)",
        url: "https://www.mecon.gob.ar/onp/documentos/presutexto/proy2023/mensaje/mensaje2023.pdf",
      },
    ],
  },
  {
    year: 2026,
    status: "ley",
    instrument: "Ley 27.798",
    instrumentUrl:
      "https://www.argentina.gob.ar/normativa/nacional/ley-27798-422000/texto",
    government: "Administración Milei. Sanción 26/12/2025. Dto 932/2025. BO 02/01/2026.",
    chip: "Ley",
    statusNote: "Sancionada. Totales del artículo 1.",
    macrosProjected: {
      inflationYoY: sourced(10.1, MENSAJE_2026, "alta", "IPC dic/dic. Supuesto del mensaje."),
      realGdpGrowth: sourced(5, MENSAJE_2026, "alta", "PIB real. Supuesto del mensaje."),
    },
    lineItems: [
      finalidad("admin", 8_859_071_552_843, ART1_2026),
      finalidad("defensa", 7_111_223_342_891, ART1_2026),
      finalidad("sociales", 106_521_648_374_775, ART1_2026),
      finalidad("economicos", 11_457_503_006_150, ART1_2026),
      finalidad("deuda", 14_119_847_249_890, ART1_2026),
    ],
    totalArs: sourced(
      148_069_293_526_549,
      `${ART1_2026} TOTAL.`,
      "alta",
    ),
    sources: [
      {
        label: "Ley 27.798 (InfoLEG 422000)",
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
    status: "proyecto",
    instrument: "Proyecto PE 2027",
    instrumentUrl:
      "https://www.economia.gob.ar/onp/documentos/presutexto/proy2027/ley/pdf/proy2027.pdf",
    government: "Administración Milei. Proyecto ONP, ~14–15 sep 2026. No es ley.",
    chip: "Proyecto PE",
    statusNote: "Proyectado PE / pendiente de sanción. No es ley.",
    macrosProjected: {
      inflationYoY: sourced(
        18,
        MENSAJE_2027,
        "alta",
        "IPC dic-2027 18,0%. Del mensaje §2.3, no de la prensa.",
      ),
      realGdpGrowth: sourced(4, MENSAJE_2027, "alta", "PIB real +4,0%. Mensaje §2.3."),
    },
    lineItems: [
      finalidad("admin", 9_922_749_980_896, ART1_2027),
      finalidad("defensa", 9_533_386_123_600, ART1_2027),
      finalidad("sociales", 150_913_491_860_897, ART1_2027),
      finalidad("economicos", 13_122_628_394_467, ART1_2027),
      finalidad("deuda", 18_609_176_140_306, ART1_2027),
    ],
    totalArs: sourced(
      202_101_432_500_166,
      `${ART1_2027} TOTAL. Coincide con gastos APN.`,
      "alta",
    ),
    extras: {
      gastosApn: sourced(
        202_101_432_500_166,
        `${LEY_2027} Gastos APN total = TOTAL art. 1.`,
        "alta",
      ),
      recursosApn: sourced(
        202_348_173_507_826,
        `${LEY_2027} Recursos APN.`,
        "alta",
      ),
      rfSpn: sourced(
        3_300_675_407_660,
        `${MENSAJE_2027} Resultado financiero SPN.`,
        "alta",
      ),
    },
    sources: [
      {
        label: "Mensaje del proyecto 2027 (ONP)",
        url: "https://www.economia.gob.ar/onp/documentos/presutexto/proy2027/mensaje/mensaje2027.pdf",
      },
      {
        label: "Texto del proyecto 2027 (ONP)",
        url: "https://www.economia.gob.ar/onp/documentos/presutexto/proy2027/ley/pdf/proy2027.pdf",
      },
    ],
  },
];
