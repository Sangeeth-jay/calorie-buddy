import React from "react";
import { View, Text, Pressable } from "react-native";
import  Swipeable  from "react-native-gesture-handler/ReanimatedSwipeable";
import type { MealLog } from "@/src/services/meals";

type Props = {
  item: MealLog;
  onDeletePress: (id: string | number) => void;
};

export default function MealLogRow({ item, onDeletePress }: Props) {
  const renderRightActions = () => {
    return (
      <Pressable
        onPress={() => onDeletePress(item.id)}
        className="bg-red-500 w-24 justify-center items-center rounded-lg"
      >
        <Text className="text-white font-semibold">Delete</Text>
      </Pressable>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View className="w-full bg-gray-100 px-3 py-2 flex-row justify-between items-center rounded-lg">
        <View>
          <Text className="text-gray-800 font-medium">
            {item.food_name_snapshot ?? "Food"}
            <Text>
              {item.servings && item.servings !== 1 ? ` x ${item.servings}` : ""}
            </Text>
          </Text>

          <Text className="font-light">
            {item.serving_size_snapshot}
            {item.unit}
          </Text>
        </View>

        <Text className="text-gray-500">
          {item.calories_snapshot?.toFixed(0) ?? 0} cal
        </Text>
      </View>
    </Swipeable>
  );
}
