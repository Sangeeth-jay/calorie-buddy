// src/services/mealSummary.ts
import { supabase } from "@/src/lib/supabase";
import { getDayRangeISO } from "@/src/utils/dayRange";
import { getAuthUser } from "./user.service";
import { formatToLocalDateStr } from "../utils/dateRangeHelpers";

export async function getHomeSummary( dayISO?: string) {

const user = await getAuthUser();
if (!user) throw new Error("No user");
const userId = user.id;

  const { startISO, endISO } = getDayRangeISO(dayISO);

  // goal active by that day
  const { data: goal, error: goalErr } = await supabase
    .from("daily_goals")
    .select("calorie_target, protein_target_g, carbs_target_g, fat_target_g, water_target_ml, effective_from")
    .eq("user_id", userId)
    .lte("effective_from", endISO)
    .order("effective_from", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (goalErr) throw goalErr;

  // sum logs for that day
  const { data: rows, error: logsErr } = await supabase
    .from("meal_logs")
    .select("meal_type, calories_snapshot, protein_g_snapshot, carbs_g_snapshot, fat_g_snapshot")
    .eq("user_id", userId)
    .gte("logged_at", startISO)
    .lte("logged_at", endISO);

  if (logsErr) throw logsErr;

  const eaten = (rows ?? []).reduce(
    (acc, r) => {
      acc.calories += Number(r.calories_snapshot ?? 0);
      acc.protein += Number(r.protein_g_snapshot ?? 0);
      acc.carbs += Number(r.carbs_g_snapshot ?? 0);
      acc.fat += Number(r.fat_g_snapshot ?? 0);
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const targets = {
    calories: Number(goal?.calorie_target ?? 0),
    protein: Number(goal?.protein_target_g ?? 0),
    carbs: Number(goal?.carbs_target_g ?? 0),
    fat: Number(goal?.fat_target_g ?? 0),
    water: Number(goal?.water_target_ml ?? 0),
  };

  const mealCalories = (rows ?? []).reduce(
    (acc, r) => {
      const type = r.meal_type ?? "Other";
      acc[type] = (acc[type] ?? 0) + Number(r.calories_snapshot ?? 0);
      return acc;
    },
    {} as Record<string, number>
  );

  return { targets, eaten, mealCalories };
}


export async function getMacrosByDateRange(startDate: Date, endDate: Date) {


  const user = await getAuthUser();
  if (!user) throw new Error("No user");


  const startDateStr = formatToLocalDateStr(startDate);
  const endDateStr = formatToLocalDateStr(endDate);

  const { data, error } = await supabase
    .from("meal_logs")
    .select("logged_at, protein_g_snapshot, carbs_g_snapshot, fat_g_snapshot")
    .eq("user_id", user.id)
    .gte("logged_at", `${startDateStr}T00:00:00`)
    .lte("logged_at", `${endDateStr}T23:59:59`)
    .order("logged_at", { ascending: true });

  if (error) throw error;

  //group returned data
  const grouped = (data ?? []).reduce((acc, row) => {
    const date = row.logged_at.split('T')[0];

    // Initialize if first meal of this day
    if (!acc[date]) {
      acc[date] = { date, protein: 0, carbs: 0, fat: 0 };
    }

    // Add this meal's macros to the day's total
    acc[date].protein += Number(row.protein_g_snapshot ?? 0);
    acc[date].carbs += Number(row.carbs_g_snapshot ?? 0);
    acc[date].fat += Number(row.fat_g_snapshot ?? 0);

    return acc;
  }, {} as Record<string, { date: string; protein: number; carbs: number; fat: number }>);

  // Convert object to array
  return Object.values(grouped);

}