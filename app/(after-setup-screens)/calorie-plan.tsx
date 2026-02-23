import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSetup } from "@/src/context/SetupContext";
import { calculateGoalPlan, GoalType } from "@/src/utils/goalPlan";

import DonutChart from "../../components/DonutChart";
import NextFillBtn from "../../components/NextFillBtn";
import { useRouter } from "expo-router";
import { insertUserGoal } from "@/src/services/goalService";
import { completeProfileSetup } from "@/src/services/user.service";

const CaloriePlan = () => {
  const { setupData } = useSetup();
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const plan = calculateGoalPlan({
    goalType: setupData.goalType as GoalType,
    tdee: setupData.tdee ?? 0,
    weightKg: setupData.weight ?? 0,
  });

  // Macro percentages
  const macros = {
    carbs: Math.round(((plan.carbs_g * 4) / plan.calorieTarget) * 100),
    fat: Math.round(((plan.fat_g * 9) / plan.calorieTarget) * 100),
    protein: Math.round(((plan.protein_g * 4) / plan.calorieTarget) * 100),
  };

  // function todayISODate() {
  //   return new Date().toISOString().slice(0, 10);
  // }

  //handle confirm
  const handleConfirm = async () => {
    if (loading) return;

    try {
      setLoading(true);

      //update profile with goal
      await completeProfileSetup(setupData.goalType as GoalType);

      //insert calorie plan into daily_goals
      await insertUserGoal(plan);

    } catch (err) {
      console.error("Error saving calorie plan:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1 justify-between">
        {/* Header */}
        <View className="px-6 py-8 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800 text-center">
            Your personalized calorie{"\n"}plan is ready!
          </Text>
        </View>

        {/* Chart Section */}
        <View className="flex-1 items-center justify-center px-6">
          {/* Donut Chart */}
          <View className="items-center mb-8">
            <DonutChart
              data={[
                { percentage: macros.fat, color: "#407BFF", label: "Fat" }, // Blue - 45%
                { percentage: macros.carbs, color: "#FE4E33", label: "Carbs" }, // Red - 35%
                {
                  percentage: macros.protein,
                  color: "#FEB020",
                  label: "Protein",
                }, // Yellow - 20%
              ]}
              size={280}
              strokeWidth={20}
              centerText={plan.calorieTarget}
            />
          </View>

          {/* Legend */}
          <View className="flex-col justify-center gap-3">
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-[#FE4E33] mr-2" />
              <Text className="text-sm text-gray-700">
                Carbs - {macros.carbs}%
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-[#407BFF] mr-2" />
              <Text className="text-sm text-gray-700">Fat - {macros.fat}%</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-[#FEB020] mr-2" />
              <Text className="text-sm text-gray-700">
                Protein - {macros.protein}%
              </Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View className="px-6 py-6">
          <NextFillBtn
            title={loading ? "Saving..." : "Continue"}
            disabled={loading}
            onPress={() => {
              handleConfirm();
              router.replace("/(main-screens)/home");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CaloriePlan;
