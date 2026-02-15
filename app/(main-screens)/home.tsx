import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
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
import {
  getLatestWaterTarget,
  getTodayWaterIntake,
} from "@/src/services/waterService";
import { useFocusEffect } from "expo-router";

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
  const [selectedDateNumber, setSelectedDateNumber] = useState(
    new Date().getDate(),
  );
  const [isMoadlOpen, setIsModalOpen] = useState(false);

  const [drinked, setDrinked] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3500);

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

  // -------------------------
  // Handlers
  // -------------------------
  const handleSelectDayNumber = (dayNum: number, isoDate: string) => {
    setSelectedDateNumber(dayNum);
    setSelectedDayISO(isoDate);
    // console.log(selectedDateNumber);
  };

  const handleOnclose = async () => {
    try {
      const [intake, target] = await Promise.all([
        getTodayWaterIntake(selectedDayISO),
        getLatestWaterTarget(),
      ]);
      setDrinked(intake);
      if (target) setWaterGoal(target);
    } catch (e) {
      console.log("refreshWater error:", e);
    } 
    setIsModalOpen(false);
  };
  // -------------------------
  // Effects
  // -------------------------
  useFocusEffect(
    useCallback(() => {
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

          const [intake, target] = await Promise.all([
            getTodayWaterIntake(selectedDayISO),
            getLatestWaterTarget(),
          ]);
          setDrinked(intake);
          if (target) setWaterGoal(target);
        } catch (error) {
          console.log("Home screen:", error);
        } finally {
          if (alive) {
            setLoading(false);
          }
        }
      })();

      return () => {
        alive = false;
      };
    }, [selectedDayISO]),
  );

  // -------------------------
  // UI
  // -------------------------
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView className="w-full">
          <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
            <View className="w-full px-6 pt-6 flex-col gap-6 ">
              <HomeHeader userName={userName} gender={gender} />

              <Calendar
                selectedDate={selectedDateNumber}
                onSelectDate={handleSelectDayNumber}
              />

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
                loading={loading}
              />

              <HydrationCard
                drinked={drinked}
                waterGoal={waterGoal}
                onPress={() => setIsModalOpen(true)}
                loading={loading}
              />

              <MealSummary
                breakfast={{
                  goal: breakfastGoal,
                  consumed: breakfastConsumed,
                }}
                lunch={{ goal: lunchGoal, consumed: lunchConsumed }}
                dinner={{ goal: dinnerGoal, consumed: dinnerConsumed }}
                loading={loading}
              />
            </View>
          </ScrollView>
        </SafeAreaView>

        <AddWaterModal isOpen={isMoadlOpen} onClose={handleOnclose} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Home;
