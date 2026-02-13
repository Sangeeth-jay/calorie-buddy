import { supabase } from "@/src/lib/supabase";

export type MealType = "Breakfast" | "Lunch" | "Dinner";

export type CreateMealLogInput = {
  user_id: string;
  food_id: number | null;
  meal_type: MealType;
  servings: number;
  food_name_snapshot: string;
  serving_size_snapshot: string | null;
  unit: string | null;
  calories_snapshot: number;
  protein_g_snapshot: number;
  carbs_g_snapshot: number;
  fat_g_snapshot: number;
};

export async function createMealLog(input: CreateMealLogInput) {
  return supabase.from("meal_logs").insert(input);
}