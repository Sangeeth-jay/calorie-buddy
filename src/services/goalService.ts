import { supabase } from "../lib/supabase";
import { calculateGoalPlan, GoalType } from "../utils/goalPlan";
import { calculateHealthMetrics } from "../utils/healthCalculations";
import { getProfile } from "./user.service";
import { getLatestWeight } from "./weightService";


export async function updateUserGoal(newGoal: GoalType) {
    const { data: auth, error: authErr } = await supabase.auth.getUser();
    if (authErr) throw authErr;
    const user = auth.user;
    if (!user) throw new Error("No User");

    const profile = await getProfile(user.id);
    if (!profile) throw new Error("Profile not found");
    const latestWeight = await getLatestWeight();

    const [year, month, day] = profile.date_of_birth.split("-").map(Number);

    const metrics = calculateHealthMetrics({
        gender: profile.gender,
        heightCm: profile.height_cm,
        weightKg: latestWeight?.weight_kg ?? profile.starting_weight_kg,
        dateOfBirth: { year, month, day },
        activityLevel: Number(profile.active_level),
    });

    const plan = calculateGoalPlan({
        goalType: newGoal,
        tdee: metrics.tdee,
        weightKg: latestWeight?.weight_kg ?? profile.starting_weight_kg,
    });

    const { error: profileErr } = await supabase
        .from("profiles")
        .update({
            starting_weight_kg: latestWeight?.weight_kg ?? profile.starting_weight_kg,
            current_goal: newGoal,
        })
        .eq("id", user.id);

    if (profileErr) throw profileErr;


    const { error: goalErr } = await supabase
        .from("daily_goals")
        .insert({
            user_id: user.id,
            effective_from: new Date().toISOString().slice(0, 10),
            calorie_target: plan.calorieTarget,
            protein_target_g: plan.protein_g,
            fat_target_g: plan.fat_g,
            carbs_target_g: plan.carbs_g,
        });

    if (goalErr) throw goalErr;

}