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
