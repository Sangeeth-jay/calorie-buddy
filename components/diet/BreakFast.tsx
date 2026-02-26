import { View, Text, Pressable } from "react-native";
import React from "react";
import Toast from "../../assets/images/toast-93.svg";
import { MealLog } from "@/src/services/meals";
import MealLogRow from "./MealLogRow";
import Loading from "../animations/Loading";

type Props = {
  logs: MealLog[];
  onAddItem: () => void;
  onDelete: (id: string | number) => void;
  loading: boolean;
};

const BreakFast: React.FC<Props> = ({ logs, onAddItem, onDelete, loading }) => {
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
                Breakfast
              </Text>
              <Text className="text-gray-500 font-light text-sm">
                {totalCalories.toFixed(2)} kcal{" "}
              </Text>
            </View>
            <View>
              <Toast width={100} height={100} />
            </View>
          </View>

          <View className="w-full gap-1">
            <View className="w-full border-b pb-2 border-gray-300 items-center">
              {loading ? (
                <Loading />
              ) : (
                <>
                  {logs.length === 0 ? (
                    <Text className="text-gray-300 italic">No item log.</Text>
                  ) : (
                    <View className="gap-2">
                      {logs.map((item) => (
                        <MealLogRow
                          key={item.id}
                          item={item}
                          onDeletePress={onDelete}
                        />
                      ))}
                    </View>
                  )}
                </>
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

export default BreakFast;
