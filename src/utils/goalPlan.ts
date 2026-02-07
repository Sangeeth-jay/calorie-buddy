export type GoalType =
    | "lose_weight"
    | "maintain_weight"
    | "gain_weight"
    | "gain_muscle"
    | "boost_energy"
    | "improve_nutrition";

export type GoalPlanInput = {
    goalType: GoalType;
    tdee: number;
    weightKg: number;
};

export type GoalPlanResult = {
    calorieTarget: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
};

export function calculateGoalPlan(input: GoalPlanInput): GoalPlanResult {

    let calorieTarget = input.tdee;

    if (input.goalType === "lose_weight") {
        calorieTarget = input.tdee - 750;
        if (calorieTarget < 1500) calorieTarget = 1500;
    } else if (input.goalType === "gain_muscle") {
        calorieTarget = input.tdee + 250;
    } else if (input.goalType === "gain_weight") {
        calorieTarget = input.tdee + 300;
    }
    else {
        calorieTarget = input.tdee;
    }

    // Protein rule 
    let protein_g = input.weightKg * 1.2;
    if (input.goalType === "gain_muscle") {
        protein_g = input.weightKg * 1.6;
    }
    const proteinCalories = protein_g * 4;

    // Fat percent by goal
    // default (maintain + most goals)
    let fatPercent = 0.25;

    if (input.goalType === "boost_energy") {
        fatPercent = 0.20; // lower fat -> more carbs
    } else if (input.goalType === "improve_nutrition") {
        fatPercent = 0.30; // more balanced
    }

    const fatCalories = calorieTarget * fatPercent;
    let fat_g = fatCalories / 9;

    // Carbs = remaining calories
    let carbsCalories = calorieTarget - (proteinCalories + fatCalories);
    if (carbsCalories < 0) carbsCalories = 0; // safety
    let carbs_g = carbsCalories / 4;


    return {
        calorieTarget: Math.round(calorieTarget),
        protein_g: Math.round(protein_g),
        carbs_g: Math.round(carbs_g),
        fat_g: Math.round(fat_g),

        
    };
}
