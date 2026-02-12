import { View, Text, Pressable } from "react-native";
import React from "react";
import Meal from "../../assets/images/meal-2-44.svg";
import { MealLog } from "@/src/services/meals";

type Props = {
  logs: MealLog[];
  onAddItem: () => void;
};

const Lunch: React.FC<Props> = ({ logs, onAddItem }) => {
  const totalCalories = logs.reduce((sum, item) => {
    return sum + (item.calories_snapshot ?? 0);
  }, 0);
  return (
    <View className="w-full bg-white rounded-xl px-4 pb-6 ">
      <View className="w-full flex-row items-center justify-between">
        <View className="w-full flex-col">
          <View className="w-full flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-semibold text-blue-950">
                Lunch
              </Text>
              <Text className="text-gray-500 font-light text-sm">
                {totalCalories}cal{" "}
              </Text>
            </View>
            <View>
              <Meal width={100} height={100} />
            </View>
          </View>

          <View className="w-full gap-1">
            <View className="w-full border-b pb-2 border-gray-300 items-center">
              {logs.length === 0 ? (
                <Text className="text-gray-300 italic">No item log.</Text>
              ) : (
                <View className="gap-2">
                  {logs.map((item) => (
                    <View
                      key={item.id}
                      className="w-full bg-gray-100 px-3 py-2 flex-row justify-between items-center rounded-lg"
                    >
                      <View>
                        <Text className="text-gray-800 font-medium">
                          {item.food_name_snapshot ?? "Food"}
                          <Text>
                            {item.servings && item.servings !== 1
                              ? ` x ${item.servings}`
                              : ""}
                          </Text>
                        </Text>
                        <Text className="font-light">
                          {item.serving_size_snapshot}
                          {item.unit}
                        </Text>
                      </View>

                      <Text className="text-gray-500">
                        {item.calories_snapshot ?? 0} cal
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <Pressable className="items-center mt-2" onPress={onAddItem}>
              <Text className="text-blue-600 font-medium">Add Item +</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Lunch;
