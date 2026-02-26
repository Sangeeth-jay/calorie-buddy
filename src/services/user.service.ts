import { supabase } from "../lib/supabase";

export async function getAuthUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
};

export async function getProfile() {
    const user = await getAuthUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from("profiles")
        .select("id, user_name, gender, date_of_birth, height_cm, starting_weight_kg, active_level, current_goal, has_completed_setup")
        .eq("id", user.id)
        .maybeSingle();

    if (error) throw error;
    return data;
};

export async function getCurrentGoals() {
    const user = await getAuthUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from("daily_goals")
        .select("user_id, effective_from, calorie_target, protein_target_g, carbs_target_g, fat_target_g, water_target_ml")
        .eq("user_id", user.id)
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
        getProfile(),
        getCurrentGoals(),
    ])

    return { user, profile, goals };
}

export async function createProfile(profileData: {
    name: string;
    gender: string;
    dob: string;
    height: number;
    weight: number;
    activeLevel: number;
}) {

    const user = await getAuthUser();
    if (!user) throw new Error("No User");

    const { error } = await supabase
        .from("profiles")
        .insert({
            id: user.id,
            user_name: profileData.name,
            gender: profileData.gender,
            date_of_birth: profileData.dob,
            height_cm: profileData.height,
            starting_weight_kg: profileData.weight,
            active_level: profileData.activeLevel,
        });

    if (error) throw error;
}

export async function completeProfileSetup(goalType: string) {

    const user = await getAuthUser();
    if (!user) throw new Error("No User");

    const { error } = await supabase
        .from("profiles")
        .update({
            current_goal: goalType,
            has_completed_setup: true,
        })
        .eq("id", user.id);

    if (error) throw error;
}