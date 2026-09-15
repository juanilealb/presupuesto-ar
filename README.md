# Presupuesto vs realidad

Explainer público (español rioplatense) del Presupuesto Nacional argentino. Licencia MIT.

Dos páginas de producto más fuentes:

1. `/comparar` — 2027 vs 2026 vs 2023. Macros del mensaje y las cinco finalidades del artículo 1. `/` redirige acá.
2. `/pronostico` — el error del propio presupuesto contra el INDEC. No es un modelo nuevo.
3. `/fuentes` — método, deflactor y enlaces.

2024 y 2025 fueron prórroga de 2023. En Comparar no hay cifras inventadas para esos años. 2027 es proyecto del PE, no ley.

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

`check-data` verifica el deflactor, los totales art. 1, el error 2023 (+151,4 pp de inflación, −3,6 pp de PIB), los errores 2024/2025 de proyectos no sancionados, y que 2026 observado y 2027 en reales sigan pendientes.

## Cómo publicarlo en Vercel (Hobby)

1. En [vercel.com](https://vercel.com) → Add New… → Project → Import this GitHub repo (`juanilealb/presupuesto-ar`).
2. Framework: Next.js (lo detecta solo). Build command: `npm run build`. No env vars.
3. Deploy on the Hobby plan.

## License

MIT. See `LICENSE`. Copyright 2026 Juan Ignacio Leal Bazterrica.

## Datos

Los números viven en `src/data`. Cada cifra tiene `value`, `source` y `confidence`. Si no está en la ley, el mensaje o el INDEC, `value` es `null`.

Comparar (solo estos años)

- 2023. Ley 27.701. Totales art. 1. IPC 60,0% y PIB +2,0% del mensaje.
- 2026. Ley 27.798. Totales art. 1. IPC 10,1% y PIB +5,0% del mensaje.
- 2027. Proyecto ONP. Totales art. 1. IPC 18,0% y PIB +4,0% del mensaje §2.3. RF SPN, recursos y gastos APN.

Pronóstico

- Error = observado − supuesto.
- 2023 ley. 2024 y 2025 proyectos no sancionados (prórroga). 2026 ley, observado pendiente.

Deflactor

- Producto de IPC dic/dic 2023–2025 ≈ 8,92. Lleva pesos 2023 a precios de dic-2025.
- 2026 se lee en ese nivel. 2027 en reales queda pendiente: falta IPC 2026. No se usa el 18% supuesto.

## Breakpoints

Phone and desktop are both first-class.

| Ancho | Qué cambia |
| --- | --- |
| ~375px | Header en dos filas. Nav en tres celdas de 44px. KPI apilados. Finalidades en cards. Cuerpo 16px. `overflow-x: clip`. |
| 640px (`sm`) | KPI en tres columnas. |
| 768px (`md`) | Header en una fila. Chips y toggle en una línea. |
| 1024px (`lg`) | Tabla de finalidades. |
| ≥1280px (`xl`) | Shell `max-w-7xl`. Hero en 12 columnas. |

Clases compartidas en `src/app/globals.css`: `shell` (ancho) y `tap` (44×44px mínimo).

## Páginas

| Ruta | Qué hay |
| --- | --- |
| `/` | Redirige a `/comparar` |
| `/comparar` | Banner de prórroga, KPI, chips 23/26/27, toggle Real/Nominal, ranking |
| `/pronostico` | Lead del error más grande, cards P/O/Error, serie solo con observado |
| `/fuentes` | Método y enlaces |
| `/anio/2023`, `/anio/2026`, `/anio/2027` | Redirigen a `/comparar` |
| `/anio/2024`, `/anio/2025` | Redirigen a `/pronostico` |

## Stack

Next.js 16 (App Router), TypeScript, Tailwind 4, shadcn/ui. Sin auth ni base de datos.
