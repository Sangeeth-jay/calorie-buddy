import { View, Text } from "react-native";
import React from "react";

import Breakfast from "@/assets/images/toast-93.svg";
import Lunch from "@/assets/images/meal-2-44.svg";
import Dinner from "@/assets/images/steak-91.svg";

interface MealSummaryCardProps {
  mealType?: "Breakfast" | "Lunch" | "Dinner";
  calorieGoal: number;
  caloriesConsumed: number;
}

const MealSummaryCard: React.FC<MealSummaryCardProps> = ({
  mealType = "Breakfast",
  calorieGoal,
  caloriesConsumed,
}) => {
  return (
    <View className="bg-white rounded-xl flex-row justify-between items-center px-4 py-3">
      <View className="flex-col items-start justify-between gap-2">
        <Text className="font-semibold text-blue-950">{mealType}</Text>
        <View className=" flex-row items-center gap-2">
          <Text className="px-2 py-1 text-lg rounded-lg bg-[#FEECB7]">🔥</Text>
          <Text className="text-xl font-semibold">{caloriesConsumed} - {calorieGoal}</Text>
            <Text className="text-gray-400">kcal</Text>
        </View>
      </View>
      <View>
        {mealType === "Breakfast" && <Breakfast width={96} />}
        {mealType === "Lunch" && <Lunch width={96} />}
        {mealType === "Dinner" && <Dinner width={96} />}
      </View>
    </View>
  );
};

export default MealSummaryCard;
