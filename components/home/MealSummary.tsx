import { View, Text } from "react-native";
import React from "react";
import MealSummaryCard from "./MealSummaryCard";

const MealSummary = () => {
  return (
    <View>
      <Text className="text-xl font-semibold text-blue-950 mb-4">My meals</Text>

      <View className="flex-col gap-2">
        <MealSummaryCard
          mealType="Breakfast"
          calorieGoal={512}
          caloriesConsumed={420}
        />
        <MealSummaryCard
          mealType="Lunch"
          calorieGoal={512}
          caloriesConsumed={420}
        />
        <MealSummaryCard
          mealType="Dinner"
          calorieGoal={512}
          caloriesConsumed={420}
        />
      </View>
    </View>
  );
};

export default MealSummary;
