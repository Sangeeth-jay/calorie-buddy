import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import Loading from "../animations/Loading";

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
  isMonthView?: boolean;
  loading?: boolean;
}

const MacroIntakesCard: React.FC<MacroIntakesCardProps> = ({
  data,
  chartWidth,
  height = 180,
  isMonthView = false,
  loading,
}) => {
  const [selectedDate, setSelectedDate] = useState<MacroData | null>(null);

  // Transform data for grouped bar chart
  const chartData = data.flatMap((day) => [
    {
      value: day.carbs,
      label: day.day,
      frontColor: "#facc15", // Yellow for carbs
      spacing: 2,
      onPress: () => setSelectedDate(day),
    },
    {
      value: day.protein,
      frontColor: "#f87171", // Red for protein
      onPress: () => setSelectedDate(day),
    },
    {
      value: day.fat,
      frontColor: "#4ade80", // Green for fat
      spacing: 12,
      onPress: () => setSelectedDate(day),
    },
  ]);

  useEffect(() => {
    if(selectedDate) {
      const timer = setTimeout(() => {
        setSelectedDate(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedDate]);

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

          {selectedDate && (
            <View
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: [{ translateX: -40 }],
                backgroundColor: "white",
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 6,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 5,
                width: 100,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  marginBottom: 3,
                  textAlign: "center",
                }}
              >
                {selectedDate.day}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#facc15",
                    marginRight: 6,
                  }}
                />
                <Text style={{ fontSize: 11 }}>
                  Carbs: {selectedDate.carbs.toFixed(1)}g
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#f87171",
                    marginRight: 6,
                  }}
                />
                <Text style={{ fontSize: 11 }}>
                  Protein: {selectedDate.protein.toFixed(1)}g
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#4ade80",
                    marginRight: 6,
                  }}
                />
                <Text style={{ fontSize: 11 }}>Fat: {selectedDate.fat.toFixed(1)}g</Text>
              </View>
            </View>
          )}
          {loading && (
            <View className="w-full h-full absolute top-0 left-0 items-center justify-center">
              <Loading />
            </View>
          )}
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
