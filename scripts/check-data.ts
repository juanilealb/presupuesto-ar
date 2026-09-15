import assert from "node:assert/strict";
import {
  compoundIpcFactor,
  deflatorFactor,
  errorPp,
  forecastMiss,
  pctChange,
  realPctChange,
} from "../src/data/compute.ts";
import { ipcForDeflator, years } from "../src/data/years.ts";
import { isApproved } from "../src/data/types.ts";

const factor = compoundIpcFactor([211.4, 117.8, 31.5]);
assert.ok(Math.abs(factor - 8.9187) < 0.001, `deflactor ${factor}`);

const sourcedFactor = deflatorFactor(ipcForDeflator);
assert.equal(
  sourcedFactor.value && Number(sourcedFactor.value.toFixed(4)),
  Number(factor.toFixed(4)),
);

assert.equal(errorPp(211.4, 60), 151.4);
assert.equal(errorPp(-1.6, 2), -3.6);

const year2023 = years.find((row) => row.year === 2023);
const year2026 = years.find((row) => row.year === 2026);
assert.ok(year2023 && isApproved(year2023));
assert.ok(year2026 && isApproved(year2026));

const miss = forecastMiss(year2023);
assert.equal(miss.inflationErrorPp.value, 151.4);
assert.equal(miss.growthErrorPp.value, -3.6);

const eco23 = year2023.lineItems.find((item) => item.id === "economicos")?.amountArs.value;
const eco26 = year2026.lineItems.find((item) => item.id === "economicos")?.amountArs.value;
assert.ok(eco23 && eco26);
const nominal = pctChange(eco23, eco26);
const real = realPctChange(eco23, eco26, factor);
assert.ok(nominal > 150 && nominal < 160, `nominal económicos ${nominal}`);
assert.ok(real < -70 && real > -73, `real económicos ${real}`);

assert.equal(year2026.macrosActual.inflationYoY.value, null);
assert.equal(year2026.macrosActual.realGdpGrowth.value, null);

console.log("check-data ok", {
  factor: Number(factor.toFixed(4)),
  inflationErrorPp: miss.inflationErrorPp.value,
  growthErrorPp: miss.growthErrorPp.value,
  economicosNominal: Number(nominal.toFixed(1)),
  economicosReal: Number(real.toFixed(1)),
});
