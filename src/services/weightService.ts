import { supabase } from "../lib/supabase";

export async function addWeight(weightinKg: number) {

    const {data, error} = await supabase.auth.getUser();
    if(error) throw error;
    const user = data.user;

    if(!user) throw new Error("No user");

    const {error: insertError} = await supabase
        .from("weight_progress")
        .insert({user_id: user.id, weight_kg: weightinKg});

    if(insertError) throw insertError;

    return true;
}