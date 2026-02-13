import { View, Text } from "react-native";
import React from "react";
import MealSummaryCard from "./MealSummaryCard";

type Props = {
  breakfast: { goal: number; consumed: number };
  lunch: { goal: number; consumed: number };
  dinner: { goal: number; consumed: number };
};

const MealSummary: React.FC<Props> = ({breakfast, lunch, dinner}) => {
  return (
    <View>
      <Text className="text-xl font-semibold text-blue-950 mb-4">My meals</Text>

      <View className="flex-col gap-2">
        <MealSummaryCard
          mealType="Breakfast"
          calorieGoal={breakfast.goal}
          caloriesConsumed={breakfast.consumed}
        />
        <MealSummaryCard
          mealType="Lunch"
          calorieGoal={lunch.goal}
          caloriesConsumed={lunch.consumed}
        />
        <MealSummaryCard
          mealType="Dinner"
          calorieGoal={dinner.goal}
          caloriesConsumed={dinner.consumed}
        />
      </View>
    </View>
  );
};

export default MealSummary;
