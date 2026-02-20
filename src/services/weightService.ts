import { supabase } from "../lib/supabase";
import { formatToLocalDateStr } from "../utils/dateRangeHelpers";


//add weight
export async function addWeight(weightinKg: number) {

    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    const user = data.user;

    if (!user) throw new Error("No user");

    const { error: insertError } = await supabase
        .from("weight_progress")
        .insert({ user_id: user.id, weight_kg: weightinKg });

    if (insertError) throw insertError;

    return true;
}


//retrive weight history
export async function getWeightProgress(startDate: Date, endDate: Date) {
    const { data:auth, error:authErr } = await supabase.auth.getUser();
    if (authErr) throw authErr;
    const user = auth.user;

    if (!user) throw new Error("No user");

    const {data, error} = await supabase
        .from("weight_progress")
        .select("logged_on, weight_kg")
        .eq("user_id", user.id)
        .gte("logged_on", formatToLocalDateStr(startDate))
        .lte("logged_on", formatToLocalDateStr(endDate))
        .order("logged_on", { ascending: true });

    if (error) throw error;

    return data ?? [];
}