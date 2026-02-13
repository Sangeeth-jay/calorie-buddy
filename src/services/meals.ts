import { supabase } from "@/src/lib/supabase";

export type MealType = "Breakfast" | "Lunch" | "Dinner";

export type MealLog = {
  id: number;
  meal_type: MealType;
  logged_at: string;
  food_name_snapshot: string | null;
  calories_snapshot: number | null;
  serving_size_snapshot: string | null;
  unit: string | null;
  servings: number;
};

// day = "YYYY-MM-DD"
export async function fetchMealLogsForDay(userId: string, day: string) {
  const start = `${day}T00:00:00.000Z`;
  const end = `${day}T23:59:59.999Z`;

  const { data, error } = await supabase
    .from("meal_logs")
    .select("id, meal_type, logged_at, food_name_snapshot, calories_snapshot, serving_size_snapshot, unit, servings")
    .eq("user_id", userId)
    .gte("logged_at", start)
    .lte("logged_at", end)
    .order("logged_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as MealLog[];
}

export async function deleteMealLog(userId:string, logId: string | number) {
  const {error} = await supabase
    .from("meal_logs")
    .delete()
    .eq("id", logId)
    .eq("user_id", userId);

  if (error) throw error;
  
}