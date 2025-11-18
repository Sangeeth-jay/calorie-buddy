import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import NextFillBtn from "../../components/NextFillBtn";
import DonutChart from "../../components/DonutChart";

const CaloriePlan = () => {
  // Macro percentages
  const macros = {
    carbs: 35,
    fat: 45,
    protein: 20,
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
            />
          </View>

          {/* Legend */}
          <View className="flex-col justify-center gap-3">
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-[#FE4E33] mr-2" />
              <Text className="text-sm text-gray-700">Carbs - {macros.carbs}%</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-[#407BFF] mr-2" />
              <Text className="text-sm text-gray-700">Fat - {macros.fat}%</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-[#FEB020] mr-2" />
              <Text className="text-sm text-gray-700">Protein - {macros.protein}%</Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View className="px-6 py-6">
          <NextFillBtn
            title="Continue"
            onPress={() => {
              console.log("Calorie plan completed");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CaloriePlan;
