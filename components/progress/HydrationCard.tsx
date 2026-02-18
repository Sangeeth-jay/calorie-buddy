import { View, Text, ScrollView } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
import Loading from "../animations/Loading";

interface HydrationData {
  value: number;
  label: string;
}

interface HydrationCardProps {
  data: HydrationData[];
  chartWidth: number;
  height?: number;
  color?: string;
  isMonthView?: boolean;
  loading?: boolean;
}

const HydrationCard: React.FC<HydrationCardProps> = ({
  data,
  chartWidth,
  height = 80,
  color = "#60a5fa",
  isMonthView = false,
  loading,
}) => {
  // Calculate spacing
  const spacing = isMonthView ? 30 : (chartWidth - 40) / (data.length - 1);

  const chartContainerWidth = isMonthView
    ? data.length * spacing + 40
    : chartWidth;

  return (
    <View className="w-full">
      <View className="bg-white rounded-2xl py-4 w-full">
        <Text className="text-lg font-semibold text-gray-800 mb-3 px-4">
          Hydration
        </Text>
        <View className="px-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            scrollEnabled={isMonthView}
          >
            <LineChart
              data={data}
              height={height}
              width={chartContainerWidth}
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
              pointerConfig={{
                pointerStripHeight: height - 20,
                pointerStripColor: color,
                pointerStripWidth: 0.5,
                pointerColor: color,
                radius: 6,
                pointerLabelWidth: 50,
                pointerLabelHeight: height,
                activatePointersOnLongPress: false,
                autoAdjustPointerLabelPosition: true,
                pointerLabelComponent: (items: any) => {
                  return (
                    <View
                      style={{
                        paddingHorizontal: 4,
                        paddingVertical: 2,
                        borderRadius: 16,
                        backgroundColor: color,
                        width: 70,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "white",
                          fontSize: 12,
                        }}
                      >
                        {items[0].value.toFixed(2)}L
                      </Text>
                    </View>
                  );
                },
              }}
            />
            {loading && (
              <View className="w-full h-full absolute top-0 left-0 items-center justify-center">
                <Loading />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default HydrationCard;
