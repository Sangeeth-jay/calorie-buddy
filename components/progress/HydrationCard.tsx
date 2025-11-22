import { View, Text } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";

interface HydrationData {
  value: number;
  label: string;
}

interface HydrationCardProps {
  data: HydrationData[];
  chartWidth: number;
  height?: number;
  color?: string;
}

const HydrationCard: React.FC<HydrationCardProps> = ({
  data,
  chartWidth,
  height = 80,
  color = "#60a5fa",
}) => {
  // Calculate spacing
  const spacing = (chartWidth - 40) / (data.length - 1);

  return (
    <View className="w-full">
      <View className="bg-white rounded-2xl py-4 w-full">
        <Text className="text-lg font-semibold text-gray-800 mb-3 px-4">
          Hydration
        </Text>
        <View className="w-full">
          <LineChart
            data={data}
            height={height}
            width={chartWidth}
            maxValue={5}
            noOfSections={2}
            color={color}
            thickness={2}
            curved
            hideDataPoints={false}
            dataPointsColor={color}
            dataPointsRadius={3}
            hideYAxisText={false}
            yAxisTextStyle={{ color: "#9ca3af", fontSize: 10 }}
            rulesType="solid"
            rulesColor="#f3f4f6"
            xAxisColor="transparent"
            xAxisLabelTextStyle={{ color: "#9ca3af", fontSize: 10 }}
            yAxisColor="transparent"
            spacing={spacing}
            initialSpacing={20}
            endSpacing={20}
            yAxisThickness={0}
            xAxisThickness={0}
            isAnimated
            animationDuration={800}
          />
        </View>
      </View>
    </View>
  );
};

export default HydrationCard;
