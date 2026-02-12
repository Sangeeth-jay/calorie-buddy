import { View, Text, Pressable } from "react-native";
import React from "react";
import Steak from "../../assets/images/steak-91.svg";

interface DinnerProps {
  onAddItem: () => void;
}

const Dinner: React.FC<DinnerProps> = ({ onAddItem }) => {
  return (
    <View className="w-full bg-white rounded-xl px-4 py-6 ">
      <View className="w-full flex-row items-center justify-between">
        <View className="w-1/2 flex-col gap-4">
          <View>
            <Text className="text-2xl font-semibold text-blue-950">
              Dinner
            </Text>
            <Text className="text-gray-500 font-light text-sm">{356}cal </Text>
          </View>
          <View className="w-full gap-1">
            <View className="w-full border-b border-gray-300 items-center">
              <Text className="text-gray-300 font-light italic">
                No item log.
              </Text>
            </View>
            <Pressable onPress={onAddItem}>
              <Text className="text-blue-600 font-medium">Add Item +</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Steak width={100} height={100} />
        </View>
      </View>
    </View>
  );
};

export default Dinner;
