import { View, Text } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
import Loading from "../animations/Loading";

interface WeightData {
  value: number;
  label: string;
}

interface WeightCardProps {
  actualData: WeightData[];
  // targetData: WeightData[];
  chartWidth: number;
  height?: number;
  loading?: boolean;
}

const WeightCard: React.FC<WeightCardProps> = ({
  actualData,
  // targetData,
  chartWidth,
  height = 80,
  loading,
}) => {
  // Calculate dynamic weight range
  const allWeights = [
    ...actualData.map((d) => d.value),
    // ...targetData.map((d) => d.value),
  ];
  const minWeight = Math.min(...allWeights);
  const maxWeight = Math.max(...allWeights);

  // Add buffer (5kg below min, 5kg above max)
  const yAxisOffset = Math.floor(minWeight - 5);
  const maxValue = Math.ceil(maxWeight + 5) - yAxisOffset;
  const stepValue = Math.ceil(maxValue / 4); // 4 sections

  // Calculate dynamic spacing
  const spacing = (chartWidth - 40) / (actualData.length - 1);

  return (
    <View className="w-full">
      <View className="bg-white rounded-2xl py-4">
        <View className="flex-row justify-between items-center mb-3 px-4">
          <Text className="text-lg font-semibold text-gray-800">Weight</Text>
          {/* {onAddPress && (
            <Pressable
              onPress={onAddPress}
              className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center"
            >
              <Text className="text-white text-xl font-bold">+</Text>
            </Pressable>
          )} */}
        </View>

        <View className="mb-3">
          <LineChart
            data={actualData}
            // data2={targetData}
            height={height}
            width={chartWidth}
            yAxisOffset={yAxisOffset}
            maxValue={maxValue}
            stepValue={stepValue}
            noOfSections={4}
            color="#ef4444"
            color2="#60a5fa"
            thickness={2}
            thickness2={2}
            curved
            hideDataPoints={false}
            dataPointsColor1="#ef4444"
            dataPointsColor2="#60a5fa"
            dataPointsRadius={3}
            rulesType="solid"
            rulesColor="#f3f4f6"
            hideYAxisText={false}
            yAxisTextStyle={{ color: "#9ca3af", fontSize: 10 }}
            formatYLabel={(value) => Math.round(Number(value)).toString()}
            xAxisColor="#f3f4f6"
            yAxisColor="transparent"
            xAxisLabelTextStyle={{ color: "#6b7280", fontSize: 10 }}
            spacing={spacing}
            initialSpacing={20}
            endSpacing={20}
            yAxisThickness={0}
            xAxisThickness={1}
            isAnimated
            animationDuration={800}
          />
          {loading && (
            <View className="w-full h-full absolute top-0 left-0 items-center justify-center">
              <Loading />
            </View>
          )}
        </View>

        {/* Legend */}
        <View className="flex-row justify-center gap-4 px-4">
          <View className="flex-row items-center gap-1">
            <View className="w-3 h-0.5 bg-red-500" />
            <Text className="text-xs text-gray-600">Actual</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <View className="w-3 h-0.5 bg-blue-500" />
            <Text className="text-xs text-gray-600">Target</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WeightCard;
