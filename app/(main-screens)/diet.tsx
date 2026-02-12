import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import BreakFast from "@/components/diet/BreakFast";
import Lunch from "@/components/diet/Lunch";
import Dinner from "@/components/diet/Dinner";
import Calendar from "@/components/Calendar";
import AddFoodModal from "@/components/modals/AddFood/AddFoodModal";

import { supabase } from "@/src/lib/supabase";
import { fetchMealLogsForDay, MealLog } from "@/src/services/meals";
import { groupMealLogs } from "@/src/services/mealGroup";

const Diet = () => {
  const [selectedDateNumber, setSelectedDateNumber] = useState(
    new Date().getDate(),
  );
  const [selectedDayISO, setSelectedDayISO] = useState(
    new Date().toISOString().slice(0, 10),
  );

  const [logs, setLogs] = useState<MealLog[]>([]);
  const [loading, setLoading] = useState(false);

  // Get current week dates
  const getCurrentWeek = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const week: { date: number; fullDate: Date }[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - currentDay + i);
      week.push({ date: d.getDate(), fullDate: d });
    }
    return week;
  };

  const weekDates = useMemo(() => getCurrentWeek(), []);

  const handleSelectDayNumber = (dayNum: number) => {
    setSelectedDateNumber(dayNum);

    const match = weekDates.find((d) => d.date === dayNum);
    if (!match) return;

    const iso = match.fullDate.toISOString().slice(0, 10);
    setSelectedDayISO(iso);
  };

  const grouped = useMemo(() => groupMealLogs(logs), [logs]);

  useEffect(() => {
    let alive = true;

    (async () => {
      const userRes = await supabase.auth.getUser();
      const userId = userRes.data.user?.id;
      if (!userId) return;

      setLoading(true);
      try {
        const data = await fetchMealLogsForDay(userId, selectedDayISO);
        if (alive) setLogs(data);
      } catch (e) {
        console.log("load meal logs error:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [selectedDayISO]);

  // Modal state
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<
    "Breakfast" | "Lunch" | "Dinner"
  >("Breakfast");

  // Open modal with meal type
  const handleAddItem = (mealType: "Breakfast" | "Lunch" | "Dinner") => {
    setSelectedMeal(mealType);
    setIsFoodModalOpen(true);
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1 bg-gray-50">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="px-6 pt-6">
              <Calendar
                selectedDate={selectedDateNumber}
                onSelectDate={handleSelectDayNumber}
              />
              <View className="mb-4">
                {loading && (
                  <Text className="text-sm text-center text-gray-400 mt-2">
                    Loading meals...
                  </Text>
                )}
              </View>

              {/* Calories Remaining Card */}
              <View className="w-full bg-white rounded-xl px-4 py-6 mb-6">
                <Text className="text-lg text-blue-950 font-semibold mb-4">
                  Calories Remaining
                </Text>
                <View className="flex-row items-center justify-center gap-6">
                  <View className="items-center">
                    <Text className="text-gray-600 text-2xl font-semibold">
                      2217
                    </Text>
                    <Text className="text-gray-400 text-xs">Goal</Text>
                  </View>
                  <Text className="text-gray-400 text-xl">-</Text>
                  <View className="items-center">
                    <Text className="text-gray-600 text-2xl font-semibold">
                      0
                    </Text>
                    <Text className="text-gray-400 text-xs">Food</Text>
                  </View>
                  <Text className="text-gray-400 text-xl">=</Text>
                  <View className="items-center">
                    <Text className="text-blue-600 text-3xl font-bold">
                      2217
                    </Text>
                    <Text className="text-gray-400 text-xs">Remaining</Text>
                  </View>
                </View>
              </View>

              {/* Meals Section */}
              <View className="gap-4 mb-6">
                <BreakFast
                  logs={grouped.Breakfast}
                  onAddItem={() => handleAddItem("Breakfast")}
                />
                <Lunch
                  logs={grouped.Lunch}
                  onAddItem={() => handleAddItem("Lunch")}
                />
                <Dinner
                  logs={grouped.Dinner}
                  onAddItem={() => handleAddItem("Dinner")}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* Add food item modal */}
        <AddFoodModal
          isOpen={isFoodModalOpen}
          mealType={selectedMeal}
          onClose={() => setIsFoodModalOpen(false)}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Diet;
