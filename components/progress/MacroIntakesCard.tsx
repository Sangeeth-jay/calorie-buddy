import { View, Text } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";

interface MacroData {
  day: string;
  carbs: number;
  protein: number;
  fat: number;
}

interface MacroIntakesCardProps {
  data: MacroData[];
  chartWidth: number;
  height?: number;
}

const MacroIntakesCard: React.FC<MacroIntakesCardProps> = ({
  data,
  chartWidth,
  height = 180,
}) => {
  // Transform data for grouped bar chart
  const chartData = data.flatMap((day) => [
    {
      value: day.carbs,
      label: day.day,
      frontColor: "#facc15", // Yellow for carbs
      spacing: 2,
    },
    {
      value: day.protein,
      frontColor: "#f87171", // Red for protein
    },
    {
      value: day.fat,
      frontColor: "#4ade80", // Green for fat
      spacing: 12,
    },
  ]);

  return (
    <View className="w-full">
      <View className="flex-col  justify-between bg-white rounded-2xl py-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-gray-800 pl-4">
            Macro Intakes
          </Text>
        </View>
        <View className="pl-2 pr-3">
          <BarChart
            data={chartData}
            height={height}
            width={chartWidth - 20}
            barWidth={8}
            spacing={3}
            noOfSections={4}
            maxValue={300}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisColor="transparent"
            yAxisTextStyle={{ color: "#9ca3af", fontSize: 10 }}
            xAxisLabelTextStyle={{
              color: "#9ca3af",
              fontSize: 10,
              width: 40,
              textAlign: "center",
            }}
            rulesType="solid"
            rulesColor="#f3f4f6"
            hideYAxisText={false}
            showGradient={false}
            isAnimated
            animationDuration={800}
          />
        </View>
        {/* Legend */}
        <View className="flex-row justify-center gap-4 mt-3">
          <View className="flex-row items-center gap-1">
            <View className="w-3 h-3 rounded-full bg-yellow-400" />
            <Text className="text-xs text-gray-600">Carbs</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <View className="w-3 h-3 rounded-full bg-red-400" />
            <Text className="text-xs text-gray-600">Protein</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <View className="w-3 h-3 rounded-full bg-green-400" />
            <Text className="text-xs text-gray-600">Fat</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MacroIntakesCard;
