import { supabase } from "../lib/supabase";

export async function getAuthUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
};

export async function getProfile(userId: string) {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, user_name, gender, date_of_birth, height_cm, starting_weight_kg, active_level, current_goal, has_completed_setup")
        .eq("id", userId)
        .maybeSingle();

    if (error) throw error;
    return data;
};

export async function getCurrentGoals(userId: string) {
    const { data, error } = await supabase
        .from("daily_goals")
        .select("user_id, effective_from, calorie_target, protein_target_g, carbs_target_g, fat_target_g, water_target_ml")
        .eq("user_id", userId)
        .order("effective_from", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) throw error;
    return data;
};

export async function getUserBundle() {
    const user = await getAuthUser();
    if (!user) return null;

    const [profile, goals] = await Promise.all([
        getProfile(user.id),
        getCurrentGoals(user.id),
    ])

    return { user, profile, goals };
}

export async function completeProfileSetup(goalType: string) {

    const { data: auth, error: authErr } = await supabase.auth.getUser();
    if (authErr) throw authErr;
    const user = auth.user;
    if (!user) throw new Error("No User");

    const { error } = await supabase
        .from("profiles")
        .update({
            current_goal: goalType,
            has_completed_setup: true,
        })
        .eq("id", user.id);

    if(error) throw error;
}