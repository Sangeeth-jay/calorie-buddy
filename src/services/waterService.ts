// src/services/waterService.ts
import { supabase } from "@/src/lib/supabase";

// helper: YYYY-MM-DD (local)
const todayString = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// Get latest daily goal (latest row)
export async function getLatestDailyGoal() {
  const { data: auth, error: authErr } = await supabase.auth.getUser();
  if (authErr) throw authErr;

  const user = auth.user;
  if (!user) throw new Error("No user");

  const { data, error } = await supabase
    .from("daily_goals")
    .select("effective_from, water_target_ml")
    .eq("user_id", user.id)
    .order("effective_from", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data; // can be null
}

// Update water target in latest daily_goals row
export async function updateWaterTargetInLatestRow(targetMl: number) {
  if (!Number.isFinite(targetMl) || targetMl <= 0) {
    throw new Error("Invalid target");
  }

  const { data: auth, error: authErr } = await supabase.auth.getUser();
  if (authErr) throw authErr;

  const user = auth.user;
  if (!user) throw new Error("No user");

  const latest = await getLatestDailyGoal();
  if (!latest) {
    throw new Error("No daily_goals row yet (create it in setup).");
  }

  const { error } = await supabase
    .from("daily_goals")
    .update({ water_target_ml: targetMl })
    .eq("user_id", user.id)
    .eq("effective_from", latest.effective_from);

  if (error) throw error;
}

// Add water intake for today (1 row per day) using upsert
// NOTE: You should have UNIQUE (user_id, logged_on) in water_progress for safe upsert.
export async function addWaterIntake(amountMl: number) {
  if (!Number.isFinite(amountMl) || amountMl <= 0) {
    throw new Error("Invalid amount");
  }

  const { data: auth, error: authErr } = await supabase.auth.getUser();
  if (authErr) throw authErr;

  const user = auth.user;
  if (!user) throw new Error("No user");

  const today = todayString();

  // read today's current intake (to add on top)
  const { data: row, error: readErr } = await supabase
    .from("water_progress")
    .select("intake_ml")
    .eq("user_id", user.id)
    .eq("logged_on", today)
    .maybeSingle();

  if (readErr) throw readErr;

  const newTotal = (row?.intake_ml ?? 0) + amountMl;

  // UPSERT: insert or update same (user_id, logged_on)
  const { error: upsertErr } = await supabase
    .from("water_progress")
    .upsert(
      { user_id: user.id, logged_on: today, intake_ml: newTotal },
      { onConflict: "user_id,logged_on" }
    );

  if (upsertErr) throw upsertErr;

  return newTotal;
}


// ✅ get today's intake (auto today)
export async function getTodayWaterIntake() {
  const { data: auth, error: authErr } = await supabase.auth.getUser();
  if (authErr) throw authErr;

  const user = auth.user;
  if (!user) throw new Error("No user");

  const today = todayString();

  const { data, error } = await supabase
    .from("water_progress")
    .select("intake_ml")
    .eq("user_id", user.id)
    .eq("logged_on", today)
    .maybeSingle();

  if (error) throw error;
  return data?.intake_ml ?? 0;
}

// ✅ get latest water target (from daily_goals)
export async function getLatestWaterTarget() {
  const latest = await getLatestDailyGoal();
  return latest?.water_target_ml ?? null;
}
