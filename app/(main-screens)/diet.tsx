import { View, Text, ScrollView, Alert } from "react-native";
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
import {
  deleteMealLog,
  fetchMealLogsForDay,
  MealLog,
} from "@/src/services/meals";
import { groupMealLogs } from "@/src/services/mealGroup";
import { getHomeSummary } from "@/src/services/mealSummary";

type MealType = "Breakfast" | "Lunch" | "Dinner";

const Diet = () => {
  // -------------------------
  // State
  // -------------------------
  const [selectedDateNumber, setSelectedDateNumber] = useState(
    new Date().getDate(),
  );
  const [selectedDayISO, setSelectedDayISO] = useState(
    new Date().toISOString().slice(0, 10),
  );

  const [logs, setLogs] = useState<MealLog[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Modal state
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>("Breakfast");

  // -------------------------
  // Helpers (pure functions)
  // -------------------------
  // const getCurrentWeek = () => {
  //   const today = new Date();
  //   const currentDay = today.getDay(); // 0..6
  //   const week: { date: number; fullDate: Date }[] = [];

  //   for (let i = 0; i < 7; i++) {
  //     const d = new Date(today);
  //     d.setDate(today.getDate() - currentDay + i);
  //     week.push({ date: d.getDate(), fullDate: d });
  //   }
  //   return week;
  // };

  // -------------------------
  // Derived values
  // -------------------------
  const grouped = useMemo(() => groupMealLogs(logs), [logs]);

  const goalCalories = summary?.targets?.calories ?? 0;
  const eatenCalories = summary?.eaten?.calories ?? 0;
  const remainingCalories = Math.max(0, goalCalories - eatenCalories);

  const refreshDiet = () => setRefreshKey((x) => x + 1);

  // -------------------------
  // Handlers
  // -------------------------
  const handleSelectDayNumber = (dayNum: number, isoDate: string) => {
    setSelectedDateNumber(dayNum);
    setSelectedDayISO(isoDate);
    // console.log(selectedDateNumber);
  };

  const handleAddItem = (mealType: MealType) => {
    setSelectedMeal(mealType);
    setIsFoodModalOpen(true);
  };

  const handleDelete = (logId: string | number) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const user = await supabase.auth.getUser();
            const userId = user.data.user?.id;
            if (!userId) return;

            await deleteMealLog(userId, logId);

            refreshDiet();
          } catch (error) {
            console.log("delete meal log error", error);
          }
        },
      },
    ]);
  };

  // -------------------------
  // Effects
  // -------------------------
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);

        const userRes = await supabase.auth.getUser();
        const userId = userRes.data.user?.id;
        if (!userId) return;

        const [dayLogs, daySummary] = await Promise.all([
          fetchMealLogsForDay(userId, selectedDayISO),
          getHomeSummary(userId, selectedDayISO),
        ]);

        if (!alive) return;

        setLogs(dayLogs);
        setSummary(daySummary);
      } catch (e) {
        console.log("Diet load error:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [selectedDayISO, refreshKey]);

  // -------------------------
  // UI
  // -------------------------

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
                      {goalCalories.toFixed(0)}
                    </Text>
                    <Text className="text-gray-400 text-xs">Goal</Text>
                  </View>
                  <Text className="text-gray-400 text-xl">-</Text>
                  <View className="items-center">
                    <Text className="text-gray-600 text-2xl font-semibold">
                      {eatenCalories.toFixed(0)}
                    </Text>
                    <Text className="text-gray-400 text-xs">Food</Text>
                  </View>
                  <Text className="text-gray-400 text-xl">=</Text>
                  <View className="items-center">
                    <Text className="text-blue-600 text-3xl font-bold">
                      {remainingCalories.toFixed(0)}
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
                  onDelete={handleDelete}
                />
                <Lunch
                  logs={grouped.Lunch}
                  onAddItem={() => handleAddItem("Lunch")}
                  onDelete={handleDelete}
                />
                <Dinner
                  logs={grouped.Dinner}
                  onAddItem={() => handleAddItem("Dinner")}
                  onDelete={handleDelete}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* Add food item modal */}
        <AddFoodModal
          isOpen={isFoodModalOpen}
          mealType={selectedMeal}
          onClose={() => {
            setIsFoodModalOpen(false);
            refreshDiet();
          }}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Diet;
