import { View, Text, Pressable } from "react-native";
import React from "react";
import { fmt0, fmt2 } from "@/src/utils/nutritionMath";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

interface Props {
  food: any;
  servingsText: string;
  onServingsChange: (t: string) => void;
  servingSizeText: string;
  onServingSizeChange: (t: string) => void;
  totalCalories: number | null;
  totalCarbs: number | null;
  totalFat: number | null;
  totalProtein: number | null;
  saving: boolean;
  onBack: () => void;
  onConfirm: () => void;
}

const FoodDetailsView: React.FC<Props> = ({food, servingsText, onServingsChange, servingSizeText, onServingSizeChange, totalCalories, totalCarbs, totalFat, totalProtein, saving, onBack, onConfirm}) => {
  return (
    <View className="flex-1 px-4">
      <Text className="text-2xl font-semibold pb-1 border-b border-gray-300">
        {food.name}
      </Text>

      <View className="flex gap-2 py-8">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-lg text-blue-950 font-semibold">
            Number of Servings
          </Text>
          <View className="w-1/3 flex-row gap-0 items-center justify-end bg-gray-100 rounded-2xl px-4 py-1">
            <BottomSheetTextInput
              value={servingsText}
              onChangeText={onServingsChange}
              placeholderTextColor="#9ca3af"
              className="text-base text-right"
              keyboardType="decimal-pad"
            />
            <Text>{food.portion_type}</Text>
          </View>
        </View>
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-lg text-blue-950 font-semibold">
            Serving size
          </Text>
          <View className="w-1/2 flex-row gap-0 items-center justify-end bg-gray-100 rounded-2xl px-4 py-1">
            <BottomSheetTextInput
              value={servingSizeText}
              onChangeText={onServingSizeChange}
              placeholderTextColor="#9ca3af"
              className="text-base text-right"
              keyboardType="decimal-pad"
            />
            <Text>{food.unit}</Text>
          </View>
        </View>
      </View>

      {/** macro details */}
      <View className="w-full py-4 px-6 flex-row items-center justify-between border-t border-gray-300">
        <View className="bg-green-200 w-24 h-24 rounded-full flex items-center justify-center p-3">
          <Text className="text-2xl font-semibold text-green-800">
            {totalCalories == null ? "--" : fmt0(totalCalories)}
          </Text>
          <Text className="text-sm text-green-800">cal</Text>
        </View>
        <View className="flex items-center justify-center gap-0">
          <Text className="text-lg font-medium text-slate-700">
            {totalCarbs == null ? "--" : fmt2(totalCarbs)}
          </Text>
          <Text className="text-lg font-light text-slate-500">Carbs</Text>
        </View>
        <View className="flex items-center justify-center">
          <Text className="text-lg font-medium text-slate-700">
            {totalFat == null ? "--" : fmt2(totalFat)}
          </Text>
          <Text className="text-lg font-light text-slate-500">Fat</Text>
        </View>
        <View className="flex items-center justify-center">
          <Text className="text-lg font-medium text-slate-700">
            {totalProtein == null ? "--" : fmt2(totalProtein)}
          </Text>
          <Text className="text-lg font-light text-slate-500">Protein</Text>
        </View>
      </View>

      <View className="flex-row gap-3 mt-6">
        <Pressable
          onPress={onBack}
          disabled={saving}
          className="flex-1 bg-[#e5e7eb] rounded-full py-4 items-center"
        >
          <Text className="text-lg font-semibold text-gray-700">Back</Text>
        </Pressable>

        <Pressable
          onPress={onConfirm}
          disabled={saving}
          className="flex-1 bg-blue-500 rounded-full py-4 items-center"
        >
          <Text className="text-lg font-semibold text-white">
            {saving ? "Saving..." : "Confirm"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FoodDetailsView;
