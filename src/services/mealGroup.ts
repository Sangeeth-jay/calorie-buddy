import type { MealLog } from "@/src/services/meals";

export function groupMealLogs(logs: MealLog[]) {
  return {
    Breakfast: logs.filter((l) => l.meal_type === "Breakfast"),
    Lunch: logs.filter((l) => l.meal_type === "Lunch"),
    Dinner: logs.filter((l) => l.meal_type === "Dinner"),
  };
}