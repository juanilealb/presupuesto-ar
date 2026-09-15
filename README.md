# Presupuesto vs realidad

Explainer público (español rioplatense) del Presupuesto Nacional argentino. Licencia MIT. El home no es una galería de años. Son dos módulos.

1. El error de pronóstico. Inflación y PIB real que prometió cada presupuesto vs lo que midió INDEC.
2. Ganadores y perdedores. Las cinco finalidades del artículo 1, 2023 vs 2026, en % nominal y % real.

2024 y 2025 fueron prórroga. No hay ley nueva. 2027 es una ficha vacía.

## Cómo correrlo

```bash
npm install
npm run dev
```

Queda en http://127.0.0.1:43127.

```bash
npm run check-data
npm run build
```

`check-data` verifica el deflactor, el error 2023 (151,4 pp de inflación, −3,6 pp de PIB) y que 2026 observado siga pendiente.

## Cómo publicarlo en Vercel (Hobby)

1. En [vercel.com](https://vercel.com) → Add New… → Project → Import this GitHub repo (`juanilealb/presupuesto-ar`).
2. Framework: Next.js (lo detecta solo). Build command: `npm run build`. No env vars.
3. Deploy on the Hobby plan.

## License

MIT. See `LICENSE`. Copyright 2026 Juan Ignacio Leal Bazterrica.

## Cómo agregar 2027

Editá `src/data/years.ts`. En el objeto 2027, cambiá `status` a `aprobado` cuando haya ley. Completá `macrosProjected`, `macrosActual` y `lineItems` con `value`, `source` y `confidence`. Si no está en el PDF, dejá `value: null`.

El par que compara el home está en `PAIR` (`src/data/index.ts`). Hoy es 2023 y 2026.

## Qué está cargado

Lleno, confianza alta

- Gasto por finalidad, leyes 27.701 (2023) y 27.798 (2026), artículo 1.
- IPC 2023 211,4% (INDEC, diciembre 2023).
- PIB 2023 −1,6% (INDEC, avance IV trimestre 2023).
- IPC 2024 117,8% (INDEC, citado en el Mensaje 2026).
- IPC 2025 31,5% (INDEC, diciembre 2025).

Lleno, confianza media

- Supuesto 2023. Inflación 60%, PIB 2% (proyecto MECON, vía Infobae y Bloomberg Línea).
- Supuesto 2026. Inflación 10,1%, PIB 5% (mensaje ONP / cobertura de la sanción).

Derivado

- Error 2023. +151,4 pp de inflación. −3,6 pp de PIB. Error = observado − proyectado.
- Deflactor 2023→2026. Producto de IPC 2023–2025 ≈ 8,92. Método rotulado en el home.
- % real de cada finalidad. Todas caen. Servicios económicos cae más.

Pendiente a propósito

- Observado 2026. El año no cerró. No usamos un interanual de mitad de año como cierre.
- 2024 y 2025. Prórroga. Sin fila de error.
- 2027. Ficha vacía.
- Partidas más finas (función, jurisdicción, AUH, universidades). No están en el artículo 1. No se inventan.

## Breakpoints

Phone and desktop are both first-class. The layout is not a phone column stretched to 1280.

| Ancho | Qué cambia |
| --- | --- |
| ~375px | Header en dos filas. Nav en tres celdas de 44px. Error y ranking como cards apiladas. Cuerpo 16px. `overflow-x: clip` en `html`/`body`. |
| 640px (`sm`) | Métricas del hero en dos columnas. |
| 768px (`md`) | Header en una fila. Hover en nav (solo extra, no es el único affordance). |
| 1024px (`lg`) | Tabla de error 2023 vs 2026. Tabla de finalidades. En viewports intermedios la tabla scrollea en X adentro del bloque, no la página. |
| ≥1280px (`xl`) | Shell `max-w-7xl` (80rem) con padding 2rem. Hero en 12 columnas (texto 7, números 5). Fichas de año en dos columnas. |

Clases compartidas en `src/app/globals.css`: `shell` (ancho) y `tap` (44×44px mínimo).

## Páginas

| Ruta | Qué hay |
| --- | --- |
| `/` | Titular, error 2023, dos fichas de pronóstico, ranking real, ficha 2027 |
| `/anio/2023` y `/anio/2026` | El miss de ese año y las finalidades |
| `/anio/2024` y `/anio/2025` | Texto de prórroga |
| `/anio/2027` | Estructura vacía |
| `/fuentes` | Método y enlaces |

## Stack

Next.js 16 (App Router), TypeScript, Tailwind 4, shadcn/ui. Sin auth ni base de datos.
