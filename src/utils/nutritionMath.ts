type Totals = {
  mult: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const toNum = (v: any) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export function calcMultiplier(baseServingSize: number, servingSizeText: string) {
  const base = baseServingSize > 0 ? baseServingSize : 1;
  const current = Math.max(1, parseFloat(servingSizeText) || base);
  return current / base;
}

export function scaleFoodTotals(
  food: any,
  baseServingSize: number,
  servingSizeText: string,
): Totals {
  const mult = calcMultiplier(baseServingSize, servingSizeText);

  return {
    mult,
    calories: toNum(food?.calories) * mult,
    protein: toNum(food?.protein_g) * mult,
    carbs: toNum(food?.carbs_g) * mult,
    fat: toNum(food?.fat_g) * mult,
  };
}

// formatting helpers (optional but useful)
export const fmt0 = (v: any) => String(Math.round(toNum(v)));
export const fmt2 = (v: any) => toNum(v).toFixed(2).replace(/\.00$/, "");