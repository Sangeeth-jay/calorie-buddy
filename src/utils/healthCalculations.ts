export type Gender = "Male" | "Female" | string;

export type SetupInput = {
    gender: Gender;
    heightCm: number;
    weightKg: number;
    dateOfBirth: { year: number, month: number, day: number };
    activityLevel: number;
};

export type HealthMetrics = {
    bmi: { value: number, category: "Under" | "Normal" | "Over" | "Obese" };
    bmr: number;
    tdee: number;
    idealWeight: number;
    bodyFat: number;
};

//age calculation function
function getAge(dob: { year: number, month: number, day: number }) {
    const today = new Date();
    let age = today.getFullYear() - dob.year;

    const m = today.getMonth() + 1;
    const d = today.getDate();

    if (m < dob.month || (m === dob.month && d < dob.day)) {
        age--;
    }

    return age;
}

//activity level multiplier
function getActivityMultiplier(level: number) {
    switch (level) {
        case 1: return 1.2; // Sedentary
        case 2: return 1.375; // Light
        case 3: return 1.55; // Moderate
        case 4: return 1.725; // Active
        case 5: return 1.9; // Very Active
        default: return 1.2;
    }
}

export function calculateHealthMetrics(input: SetupInput): HealthMetrics {

    //bmi calculation
    const heightM = input.heightCm / 100;
    const bmiValue = input.weightKg / (heightM * heightM);

    let bmiCategory: HealthMetrics["bmi"]["category"] = "Normal";

    if (bmiValue < 18.5) bmiCategory = "Under";
    else if (bmiValue < 25) bmiCategory = "Normal";
    else if (bmiValue < 30) bmiCategory = "Over";
    else bmiCategory = "Obese";


    //bmr calculation
    const age = getAge(input.dateOfBirth);
    const gender = input.gender.toLowerCase();
    const isMale = gender === "male";

    const bmr =
        10 * input.weightKg +
        6.25 * input.heightCm -
        5 * age +
        (isMale ? 5 : -161);

    //tdee, ideal weight and body fat calculations 
    const multiplier = getActivityMultiplier(input.activityLevel);

    const tdee = bmr * multiplier;
    const idealWeight = 22.5 * (heightM * heightM); // Using BMI of 22.5 for ideal weight
    const bodyFat = (1.20 * bmiValue) + (0.23 * age) - (10.8 * (isMale ? 1 : 0)) - 5.4;


    return {
        bmi: { value: Number(bmiValue.toFixed(2)), category: bmiCategory },
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        idealWeight: Math.round(idealWeight),
        bodyFat: Number(bodyFat.toFixed(2)),
    };
}