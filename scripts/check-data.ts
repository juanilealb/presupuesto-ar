import assert from "node:assert/strict";
import {
  amountInDeflatorPrices,
  compareFinalidades,
  compoundIpcFactor,
  deflatorFactor,
  errorPp,
  forecastMiss,
  largestAvailableMiss,
  pctChange,
  realPctChange,
  sumFinalidades,
} from "../src/data/compute";
import { compareYears } from "../src/data/compare-years";
import { ipcForDeflator } from "../src/data/deflator";
import { forecastYears } from "../src/data/forecast";

const factor = compoundIpcFactor([211.4, 117.8, 31.5]);
assert.ok(Math.abs(factor - 8.9187) < 0.001, `deflactor ${factor}`);

const sourcedFactor = deflatorFactor(ipcForDeflator);
assert.equal(
  sourcedFactor.value && Number(sourcedFactor.value.toFixed(4)),
  Number(factor.toFixed(4)),
);

function approx(actual: number | null, expected: number) {
  assert.ok(actual !== null, `esperado ${expected}, vino null`);
  assert.ok(
    Math.abs(actual - expected) < 1e-9,
    `esperado ${expected}, vino ${actual}`,
  );
}

approx(errorPp(211.4, 60), 151.4);
approx(errorPp(-1.6, 2), -3.6);
approx(errorPp(117.8, 69.5), 48.3);
approx(errorPp(31.5, 18.3), 13.2);
approx(errorPp(-1.3, 2.7), -4);
approx(errorPp(4.4, 5), -0.6);

const year2023 = compareYears.find((row) => row.year === 2023);
const year2026 = compareYears.find((row) => row.year === 2026);
const year2027 = compareYears.find((row) => row.year === 2027);
assert.ok(year2023 && year2023.status === "ley");
assert.ok(year2026 && year2026.status === "ley");
assert.ok(year2027 && year2027.status === "proyecto");

assert.equal(year2023.totalArs.value, 28_954_031_315_031);
assert.equal(year2026.totalArs.value, 148_069_293_526_549);
assert.equal(year2027.totalArs.value, 202_101_432_500_166);
assert.equal(sumFinalidades(year2023), year2023.totalArs.value);
assert.equal(sumFinalidades(year2026), year2026.totalArs.value);
assert.equal(sumFinalidades(year2027), year2027.totalArs.value);

assert.equal(year2023.macrosProjected.inflationYoY.value, 60);
assert.equal(year2023.macrosProjected.realGdpGrowth.value, 2);
assert.equal(year2026.macrosProjected.inflationYoY.value, 10.1);
assert.equal(year2026.macrosProjected.realGdpGrowth.value, 5);
assert.equal(year2027.macrosProjected.inflationYoY.value, 18);
assert.equal(year2027.macrosProjected.realGdpGrowth.value, 4);
assert.equal(year2027.extras?.rfSpn?.value, 3_300_675_407_660);
assert.equal(year2027.extras?.recursosApn?.value, 202_348_173_507_826);
assert.equal(year2027.extras?.gastosApn?.value, year2027.totalArs.value);

assert.ok(!compareYears.some((row) => row.year === 2024 || row.year === 2025));

const forecast2023 = forecastYears.find((row) => row.year === 2023);
assert.ok(forecast2023);
const miss = forecastMiss(forecast2023);
approx(miss.inflationErrorPp.value, 151.4);
approx(miss.growthErrorPp.value, -3.6);

const forecast2024 = forecastYears.find((row) => row.year === 2024);
const forecast2025 = forecastYears.find((row) => row.year === 2025);
const forecast2026 = forecastYears.find((row) => row.year === 2026);
assert.ok(forecast2024 && forecast2024.kind === "proyecto-no-sancionado");
assert.ok(forecast2025 && forecast2025.kind === "proyecto-no-sancionado");
assert.ok(forecast2026);

approx(forecastMiss(forecast2024).inflationErrorPp.value, 48.3);
approx(forecastMiss(forecast2024).growthErrorPp.value, -4);
approx(forecastMiss(forecast2025).inflationErrorPp.value, 13.2);
approx(forecastMiss(forecast2025).growthErrorPp.value, -0.6);
assert.equal(forecast2026.macrosActual.inflationYoY.value, null);
assert.equal(forecast2026.macrosActual.realGdpGrowth.value, null);

const lead = largestAvailableMiss(forecastYears);
assert.ok(lead);
assert.equal(lead.year, 2023);
assert.equal(lead.metric, "inflacion");
approx(lead.error.value, 151.4);

const eco23 = year2023.lineItems.find((item) => item.id === "economicos")?.amountArs.value;
const eco26 = year2026.lineItems.find((item) => item.id === "economicos")?.amountArs.value;
assert.ok(eco23 && eco26);
const nominal = pctChange(eco23, eco26);
const real = realPctChange(eco23, eco26, factor);
assert.ok(nominal > 150 && nominal < 160, `nominal económicos ${nominal}`);
assert.ok(real < -70 && real > -73, `real económicos ${real}`);

const real2027 = amountInDeflatorPrices(year2027.totalArs.value, 2027, sourcedFactor);
assert.equal(real2027.value, null);

const ranked = compareFinalidades(
  compareYears,
  sourcedFactor,
  "real",
  [2023, 2026],
);
const eco = ranked.find((row) => row.id === "economicos");
assert.ok(eco && eco.deltaPct.value !== null);
assert.ok(eco.deltaPct.value < -70 && eco.deltaPct.value > -73);
assert.equal(eco.amounts[2027].value, null);

console.log("check-data ok", {
  factor: Number(factor.toFixed(4)),
  inflationErrorPp: miss.inflationErrorPp.value,
  growthErrorPp: miss.growthErrorPp.value,
  economicosNominal: Number(nominal.toFixed(1)),
  economicosReal: Number(real.toFixed(1)),
  lead: `${lead.year} ${lead.metric} ${lead.error.value}`,
  total2027: year2027.totalArs.value,
});
