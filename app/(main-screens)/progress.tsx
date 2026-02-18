import { View, Text, Pressable, Dimensions, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CaretRightIcon, CaretLeftIcon } from "phosphor-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import HydrationCard from "../../components/progress/HydrationCard";
import WeightCard from "../../components/progress/WeightCard";
import MacroIntakesCard from "../../components/progress/MacroIntakesCard";
import AddWeightModal from "../../components/modals/AddWeightModal";
import {
  formatDateLabel,
  formatDayLable,
  formatToLocalDateStr,
  getMonthRange,
  getWeekRange,
} from "@/src/utils/dateRangeHelpers";
import { getWaterIntakeByDateRange } from "@/src/services/waterService";
import { useFocusEffect } from "@react-navigation/native";

type ChartDataPoint = {
  value: number;
  label: string;
};

const Progress = () => {
  // Get screen width
  const { width: screenWidth } = Dimensions.get("window");
  const chartWidth = screenWidth - 80;

  // -------------------------
  // State
  // -------------------------

  const [loading, setLoading] = useState(false);
  // Period management
  const periods = ["Week", "Month"];
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
  const selectedPeriod = periods[selectedPeriodIndex];
  //weight modal state
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [hydrationData, setHydrationData] = useState<
    { value: number; label: string }[]
  >([]);

  // -------------------------
  // handlers
  // -------------------------

  const fetchHydration = async () => {

    let alive = true;

    try {
      setLoading(true);
      const { startDate, endDate } =
        selectedPeriod === "Week" ? getWeekRange() : getMonthRange();

      const rawData = await getWaterIntakeByDateRange(startDate, endDate);

      //formating date chart data
      const totalDays = selectedPeriod === "Week" ? 7 : 30;
      const transformed: ChartDataPoint[] = [];

      for (let i = 0; i < totalDays; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);

        const dayStr = formatToLocalDateStr(day);

        const match = rawData.find((entry) => entry.logged_on === dayStr);
        transformed.push({
          value: match ? match.intake_ml / 1000 : 0,
          label:
            selectedPeriod === "Week"
              ? formatDayLable(day)
              : formatDateLabel(day),
        });
      }

      if (alive) {
        setLoading(false);
      }

      setHydrationData(transformed);
    } catch (error) {
      console.log("Hydration data fetching error:", error);
    } finally {
      if (alive) {
        setLoading(false);
      }
    }
  };

  // Navigate periods
  const goToPreviousPeriod = () => {
    setSelectedPeriodIndex((prev) =>
      prev === 0 ? periods.length - 1 : prev - 1,
    );
  };

  const goToNextPeriod = () => {
    setSelectedPeriodIndex((prev) =>
      prev === periods.length - 1 ? 0 : prev + 1,
    );
  };

  // Handle saving weight entry
  const handleSaveWeight = (data: { weight: number; date: Date }) => {
    console.log("Weight saved:", data);
    // TODO: Save to context/backend later
  };

  // -------------------------
  // effects
  // -------------------------

  useFocusEffect(
    useCallback(() => {
      fetchHydration();
    }, [selectedPeriod]),
  );
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

  // ];
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="bg-gray-50">
          {/* Header */}
          <View className="px-6 py-4 bg-white border-b border-gray-200 w-full flex-row items-center justify-center gap-4">
            <Pressable onPress={goToPreviousPeriod}>
              <CaretLeftIcon size={24} color="#9ca3af" />
            </Pressable>
            <Text className="text-2xl w-24 text-center font-medium text-slate-600">
              {selectedPeriod}
            </Text>
            <Pressable onPress={goToNextPeriod}>
              <CaretRightIcon size={20} color="#9ca3af" />
            </Pressable>
          </View>

          {/* Content */}

          <ScrollView>
            <View className="flex-1 gap-4 px-6 py-10">
              {/* Macro Intakes Section */}
              <MacroIntakesCard data={macroData} chartWidth={chartWidth} />
              {/* Hydration Section */}
              <HydrationCard
                key={`hydration-${selectedPeriod}-${hydrationData.length}`}
                data={hydrationData}
                chartWidth={chartWidth}
                isMonthView={selectedPeriod === "Month"}
                loading={loading}
              />

              {/* Weight Section */}
              <WeightCard
                actualData={actualWeightData}
                targetData={targetWeightData}
                chartWidth={chartWidth}
                onAddPress={() => setIsWeightModalOpen(true)}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
        <AddWeightModal
          isOpen={isWeightModalOpen}
          onClose={() => setIsWeightModalOpen(false)}
          onSave={handleSaveWeight}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Progress;
