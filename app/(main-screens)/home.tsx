import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Calendar from "@/components/Calendar";
import CaloriesCard from "@/components/home/CaloriesCard";
import HomeHeader from "@/components/home/HomeHeader";
import HydrationCard from "@/components/home/HydrationCard";
import MealSummary from "@/components/home/MealSummary";
import { useHomeHeaderData } from "@/src/hooks/useHomeHeaderData";

import { getHomeSummary } from "@/src/services/mealSummary";
import { supabase } from "@/src/lib/supabase";
import AddWaterModal from "@/components/modals/AddWater/AddWaterModal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getLatestWaterTarget, getTodayWaterIntake } from "@/src/services/waterService";

const Home = () => {
  const { userName, gender } = useHomeHeaderData();

  // -------------------------
  // State
  // -------------------------
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDayISO, setSelectedDayISO] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [isMoadlOpen, setIsModalOpen] = useState(false);

  const [drinked, setDrinked] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3500);
  const [waterLoading, setWaterLoading] = useState(true);

  const refreshHome = () => setRefreshKey((x) => x + 1);

  // -------------------------
  // Derived
  // -------------------------
  const goalCal = summary?.targets?.calories.toFixed(0) ?? 0;
  const consumedCal = summary?.eaten?.calories.toFixed(0) ?? 0;
  const goalProtein = summary?.targets?.protein.toFixed(0) ?? 0;
  const consumedProtein = summary?.eaten?.protein.toFixed(0) ?? 0;
  const goalCarbs = summary?.targets?.carbs.toFixed(0) ?? 0;
  const consumedCarbs = summary?.eaten?.carbs.toFixed(0) ?? 0;
  const goalFat = summary?.targets?.fat.toFixed(0) ?? 0;
  const consumedFat = summary?.eaten?.fat.toFixed(0) ?? 0;

  const totalGoal = summary?.targets?.calories ?? 0;
  const perMealGoal = totalGoal / 3;

  const breakfastGoal = Math.round(perMealGoal);
  const lunchGoal = Math.round(perMealGoal);
  const dinnerGoal = Math.round(perMealGoal);

  const mealCals = summary?.mealCalories ?? {};
  const breakfastConsumed = Math.round(mealCals.Breakfast ?? 0);
  const lunchConsumed = Math.round(mealCals.Lunch ?? 0);
  const dinnerConsumed = Math.round(mealCals.Dinner ?? 0);

  const refreshWater = async () => {
  try {
    setWaterLoading(true);
    const [intake, target] = await Promise.all([
      getTodayWaterIntake(),
      getLatestWaterTarget(),
    ]);

    setDrinked(intake);
    if (target) setWaterGoal(target);
  } catch (e) {
    console.log("refreshWater error:", e);
  } finally {
    setWaterLoading(false);
  }
};

  // -------------------------
  // Effects
  // -------------------------
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);

        const { data } = await supabase.auth.getUser();
        const userId = data.user?.id;
        if (!userId) return;

        const daySummary = await getHomeSummary(userId, selectedDayISO);

        if (!alive) return;
        setSummary(daySummary);
        refreshWater();
        refreshHome();
      } catch (error) {
        console.log("Home screen:", error);
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
        <SafeAreaView className="w-full">
          <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
            <View className="w-full px-6 pt-6 flex-col gap-6">
              <HomeHeader userName={userName} gender={gender} />

              {/* TODO: connect Calendar to selectedDayISO like Diet screen */}
              <Calendar selectedDate={13} onSelectDate={() => {}} />

              {/* pass summary values to card */}
              <CaloriesCard
                selectedDate={13}
                goalCalories={goalCal}
                consumedCalories={consumedCal}
                goalProtein={goalProtein}
                consumedProtein={consumedProtein}
                goalCarbs={goalCarbs}
                consumedCarbs={consumedCarbs}
                goalFat={goalFat}
                consumedFat={consumedFat}
              />

              <HydrationCard
                drinked={drinked}
                waterGoal={waterGoal}
                onPress={() => setIsModalOpen(true)}
                loading={waterLoading}
              />
              <MealSummary
                breakfast={{ goal: breakfastGoal, consumed: breakfastConsumed }}
                lunch={{ goal: lunchGoal, consumed: lunchConsumed }}
                dinner={{ goal: dinnerGoal, consumed: dinnerConsumed }}
              />

              {loading && (
                <Text className="text-xs text-gray-400">Loading...</Text>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>

        <AddWaterModal
          isOpen={isMoadlOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Home;
