import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import BreakFast from "@/components/diet/BreakFast";
import Lunch from "@/components/diet/Lunch";
import Dinner from "@/components/diet/Dinner";
import Calendar from "@/components/Calendar";
import AddFoodModal from "@/components/modals/AddFood/AddFoodModal";

const Diet = () => {
  const [selectedDate, setSelectedDate] = useState(13);

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
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
              <View className="mb-4">
                <Text className="text-sm text-gray-500">
                  Week calendar goes here
                </Text>
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
                <BreakFast onAddItem={() => handleAddItem("Breakfast")}/>
                <Lunch onAddItem={() => handleAddItem("Lunch")} />
                <Dinner onAddItem={() => handleAddItem("Dinner")} />
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
