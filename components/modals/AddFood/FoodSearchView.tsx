import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import {
  MagnifyingGlassIcon,
  BarcodeIcon,
  CubeFocusIcon,
  PlusIcon,
} from "phosphor-react-native";

interface Props {
  query: string;
  setQuery: (t: string) => void;
  status: "idle" | "loading" | "success" | "empty" | "error";
  result: any[];
  onPickFood: (item: any) => void;
  onClose: () => void;
}

const FoodSearchView: React.FC<Props> = ({ query, setQuery, status, result, onPickFood, onClose }) => {

  return (
    <>
      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mx-4 mb-4 gap-2">
        <MagnifyingGlassIcon size={20} color="#9ca3af" />
        <BottomSheetTextInput
          className="flex-1 text-base"
          placeholder="Search"
          placeholderTextColor="#9ca3af"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-3 px-4 mb-4">
        <Pressable className="flex-1 bg-blue-500 rounded-xl py-5 items-center gap-2">
          <CubeFocusIcon size={32} color="#fff" />
          <Text className="text-white text-sm font-semibold">Scan meal</Text>
        </Pressable>
        <Pressable className="flex-1 bg-blue-500 rounded-xl py-5 items-center gap-2">
          <BarcodeIcon size={32} color="#fff" />
          <Text className="text-white text-sm font-semibold">Scan barcode</Text>
        </Pressable>
      </View>

      {/* Recently Added Foods */}
      <View className="flex-1 px-4">
        <Text className="text-xs text-gray-400 mb-2">Recently added foods</Text>
        <View className="flex-1 justify-center items-center">
          {/* Loading */}
          {status === "loading" && (
            <Text className="text-sm text-gray-400 mt-2">
              Searching food...
            </Text>
          )}

          {/* Results */}
          {status === "success" && result.length > 0 && (
            <ScrollView
              className="mt-2 w-full"
              contentContainerClassName="px-4 pb-6"
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: result.length > 4 ? 320 : undefined }}
            >
              {result.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => onPickFood(item)}
                  className="w-full px-4 py-3 mb-3 bg-gray-100 rounded-xl active:bg-gray-200 flex-row items-center justify-between"
                >
                  <View>
                    <Text className="font-normal text-lg">{item.name}</Text>
                    <Text className="font-light text-sm">
                      {item.calories ?? "--"} cal, {item.portion ?? "1 serving"}
                    </Text>
                  </View>

                  <View className="p-2 bg-blue-100 rounded-full">
                    <PlusIcon size={18} color="#3b82f8" />
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          )}

          {/* Empty */}
          {status === "empty" && (
            <View className="mt-4 items-center">
              <Text className="text-gray-400 text-sm">N/A</Text>
            </View>
          )}
        </View>
      </View>

      {/* Bottom Buttons */}
      <View className="flex-row gap-3 px-4 py-4">
        <Pressable
          onPress={onClose}
          className="flex-1 bg-[#e5e7eb] rounded-full py-4 items-center"
        >
          <Text className="text-lg font-semibold text-gray-700">Cancel</Text>
        </Pressable>
        <Pressable
          onPress={onClose}
          className="flex-1 bg-blue-500 rounded-full py-4 items-center"
        >
          <Text className="text-lg font-semibold text-white">Done</Text>
        </Pressable>
      </View>
    </>
  );
};

export default FoodSearchView;
