import { supabase } from "../lib/supabase";

export async function getWeekMealLogs(startDate: string, endDate: string) {
  const startTimestamp = `${startDate}T00:00:00`;
  const endTimestamp = `${endDate}T23:59:59`;

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  // Check if user is logged in
  if (!userId) return [];

  try {
    const { data, error } = await supabase
      .from("meal_logs")
      .select("logged_at")
      .eq("user_id", userId)
      .gte("logged_at", startTimestamp)
      .lte("logged_at", endTimestamp);

    if (error) throw error;

    // Extract dates and remove duplicates
    const dates = data.map(item => item.logged_at.slice(0, 10));
    const uniqueDates = Array.from(new Set(dates));

    return uniqueDates; // Returns ["2025-02-15", "2025-02-16", ...]
  } catch (error) {
    console.log("getWeekMealLogs error:", error);
    return []; // Return empty array on error
  }
}