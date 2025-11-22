import { View, Text, Pressable, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CaretRightIcon, CaretLeftIcon } from "phosphor-react-native";

import HydrationCard from "../../components/progress/HydrationCard";
import WeightCard from "../../components/progress/WeightCard";
import MacroIntakesCard from "../../components/progress/MacroIntakesCard";

const Progress = () => {
  // Get screen width
  const { width: screenWidth } = Dimensions.get("window");
  const chartWidth = screenWidth - 80;

  // Period management
  const periods = ["Week", "Month", "Year"];
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
  const selectedPeriod = periods[selectedPeriodIndex];

  // Navigate periods
  const goToPreviousPeriod = () => {
    setSelectedPeriodIndex((prev) =>
      prev === 0 ? periods.length - 1 : prev - 1
    );
  };

  const goToNextPeriod = () => {
    setSelectedPeriodIndex((prev) =>
      prev === periods.length - 1 ? 0 : prev + 1
    );
  };
  // Macro Intakes data
  const macroData = [
    { day: "Mon", carbs: 250, protein: 100, fat: 60 },
    { day: "Tue", carbs: 280, protein: 110, fat: 65 },
    { day: "Wed", carbs: 260, protein: 105, fat: 58 },
    { day: "Thu", carbs: 270, protein: 100, fat: 62 },
    { day: "Fri", carbs: 255, protein: 95, fat: 60 },
    { day: "Sat", carbs: 265, protein: 105, fat: 64 },
    { day: "Sun", carbs: 275, protein: 98, fat: 61 },
  ];

  // Hydration data (in liters, 0-3.5 scale)
  const hydrationData = [
    { value: 2.0, label: "Mon" },
    { value: 3.2, label: "Tue" },
    { value: 2.8, label: "Wed" },
    { value: 3.5, label: "Thu" },
    { value: 2.2, label: "Fri" },
    { value: 3.0, label: "Sat" },
    { value: 3.3, label: "Sun" },
  ];
  // Weight data - actual recorded weight
  const actualWeightData = [
    { value: 82, label: "12/07" },
    { value: 81.5, label: "11/08" },
    { value: 81, label: "10/09" },
    { value: 82, label: "10/10" },
  ];

  // Weight data - system calculated target
  const targetWeightData = [
    { value: 82, label: "12/07" },
    { value: 81.7, label: "11/08" },
    { value: 81.4, label: "10/09" },
    { value: 81.1, label: "10/10" },
  ];

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 w-full">
        <View className="flex-1 justify-center items-center w-full">
          {/* Header */}
          <View className="px-6 py-4 bg-white border-b border-gray-200 w-full flex-row items-center justify-center gap-4">
            <Pressable onPress={goToPreviousPeriod}>
              <CaretLeftIcon size={24} color="#9ca3af" />
            </Pressable>
            <Text className="text-2xl font-medium text-slate-600">
              {selectedPeriod}
            </Text>
            <Pressable onPress={goToNextPeriod}>
              <CaretRightIcon size={24} color="#9ca3af" />
            </Pressable>
          </View>

          {/* Content */}
          <ScrollView className="flex-1 w-full">
            <View className="flex-1 items-center justify-around gap-8 w-full px-6 pt-10">
              {/* Macro Intakes Section */}
              <MacroIntakesCard data={macroData} chartWidth={chartWidth} />
              {/* Hydration Section */}
              <HydrationCard data={hydrationData} chartWidth={chartWidth} />

              {/* Weight Section */}
              <WeightCard
                actualData={actualWeightData}
                targetData={targetWeightData}
                chartWidth={chartWidth}
                onAddPress={() => console.log("Add new weight entry")}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Progress;
