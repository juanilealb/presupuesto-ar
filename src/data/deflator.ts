import { sourced } from "./helpers";
import type { IpcYear } from "./types";

/**
 * Deflactor 2023 → 2026 (pesos de diciembre de 2025).
 *
 * Método: producto de las variaciones dic/dic del IPC nacional INDEC
 *   (1 + 211,4/100) × (1 + 117,8/100) × (1 + 31,5/100) ≈ 8,92
 *
 * Qué hace: lleva los pesos corrientes de la Ley 27.701 (2023) al nivel
 * de precios de dic-2025, el nivel con el que se arma la Ley 27.798 (2026).
 * Los montos 2026 se leen como ya están: no se vuelven a inflar.
 *
 * Qué no hace:
 * - No inventa un presupuesto 2024 ni 2025 (fueron prórroga).
 * - No usa el IPC supuesto del Proyecto 2027 (18%) para deflactar.
 * - 2027 en reales queda pendiente: falta el IPC dic/dic 2026 observado.
 */
export const ipcForDeflator: IpcYear[] = [
  {
    year: 2023,
    ipcYoY: sourced(
      211.4,
      "INDEC, IPC cobertura nacional, diciembre 2023. Variación acumulada del año 211,4%. https://www.indec.gob.ar/uploads/informesdeprensa/ipc_01_24DBD5D8158C.pdf",
      "alta",
    ),
  },
  {
    year: 2024,
    ipcYoY: sourced(
      117.8,
      "INDEC, IPC nacional diciembre 2024 (117,8%), citado en el Mensaje del Proyecto de Presupuesto 2026 (MECON/ONP).",
      "alta",
    ),
  },
  {
    year: 2025,
    ipcYoY: sourced(
      31.5,
      "INDEC, IPC cobertura nacional, diciembre 2025. Variación acumulada del año 31,5%.",
      "alta",
    ),
  },
];
