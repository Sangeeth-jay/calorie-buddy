import { supabase } from "../lib/supabase";



export async function searchFoods(query: string) {
    const text = query.trim();

    try {
        const { data, error } = await supabase
            .from("meal_items")
            .select("*")
            .ilike("name", `%${text}%`)
            .limit(10);

        if (error) throw error;

        if (!data || data.length === 0) {
            return {
                status: "empty",
                data: [],
            };
        }

        return {
            status: "success",
            data,
        }
    } catch (error) {
        console.error("Food search error:", error);

        return {
            status: "error",
            data: [],
        };
    }
}