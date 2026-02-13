import { View, Text, Image } from "react-native";
import React from "react";
import CalorieGauge from "./CalorieGauge";

interface CaloriesCardProps {
  selectedDate?: number;
  goalCalories: number;
  consumedCalories: number;
  goalProtein: number;
  consumedProtein: number;
  goalCarbs: number;
  consumedCarbs: number;
  goalFat: number;
  consumedFat: number;
}
const CaloriesCard: React.FC<CaloriesCardProps> = ({ selectedDate, goalCalories, consumedCalories, goalProtein, consumedProtein, goalCarbs, consumedCarbs, goalFat, consumedFat }) => {
  
  const nutritionData = {
    calories: { consumed: consumedCalories, goal: goalCalories },
    protein: { consumed: consumedProtein, goal: goalProtein },
    carbs: { consumed: consumedCarbs, goal: goalCarbs },
    fat: { consumed: consumedFat, goal: goalFat },
  };

  return (
    <View className="bg-white rounded-2xl py-4 px-3 w-full">
      <Text className="text-xl font-bold text-blue-950 mb-4">Calories</Text>

      {/* Gauge will go here */}
      <View className="items-center mb-2">
        <CalorieGauge consumed={nutritionData.calories.consumed} goal={nutritionData.calories.goal} />
      </View>

      
      <View className="flex-row justify-around w-full px-4">
        <View className="flex-row gap-2 items-center">
          <View>
            <Image
              source={require("../../assets/images/meat.png")}
              className="w-8 h-8"
            />
          </View>
          <View>
            <Text className="font-semibold text-gray-400">Protien</Text>
            <Text className="font-semibold">
              {nutritionData.protein.consumed} /
              <Text className="text-sm font-normal">
                {nutritionData.protein.goal}g
              </Text>
            </Text>
          </View>
        </View>
        <View className="flex-row gap-2 items-center">
          <View>
            <Image
              source={require("../../assets/images/icons8-fruit-100.png")}
              className="w-10 h-10"
            />
          </View>
          <View>
            <Text className="font-semibold text-gray-400">Carbs</Text>
            <Text className="font-semibold">
              {nutritionData.carbs.consumed} /
              <Text className="text-sm font-normal">
                {nutritionData.carbs.goal}g
              </Text>
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <View>
            <Image
              source={require("../../assets/images/fat.png")}
              className="w-6 h-12 mr-2"
            />
          </View>
          <View>
            <Text className="font-semibold text-gray-400">Fat</Text>
            <Text className="font-semibold">
              {nutritionData.fat.consumed} /
              <Text className="text-sm font-normal">
                {nutritionData.fat.goal}g
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CaloriesCard;
