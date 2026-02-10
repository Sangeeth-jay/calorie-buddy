import { View, Text, Pressable } from "react-native";
import React, { useCallback, useRef, useEffect, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import {
  MagnifyingGlassIcon,
  BarcodeIcon,
  CubeFocusIcon,
  PlusIcon,
} from "phosphor-react-native";
import { searchFoods } from "@/src/services/foodSearch";
import { ScrollView } from "react-native-gesture-handler";

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: "Breakfast" | "Lunch" | "Dinner";
  onSave?: (data: any) => void;
}

type FoodSearchResult = {
  status: "idle" | "loading" | "success" | "empty" | "error";
  data: any[];
};

const AddFoodModal: React.FC<AddFoodModalProps> = ({
  isOpen,
  onClose,
  mealType,
  onSave,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [status, setStatus] = useState<FoodSearchResult["status"]>("idle");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  //searching debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setStatus("idle");
      setResult([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setStatus("loading");

      const res = await searchFoods(query);

      // console.log("STATUS:", res.status);
      // console.log("RESULT:", res.data);
      // console.log("RESULT LENGTH:", res.data.length);

      setStatus(res.status as FoodSearchResult["status"]);
      setResult(res.data);
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      snapPoints={["90%"]}
      handleStyle={{
        backgroundColor: "#3b82f6",
        borderTopEndRadius: 14,
        borderTopStartRadius: 14,
      }}
      handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
    >
      <BottomSheetView className="flex-1 bg-white">
        {/* Meal Type Badge */}
        <View className="bg-blue-500 py-5 items-center rounded-b-full mb-4">
          <Text className="text-white text-3xl font-semibold">{mealType}</Text>
        </View>

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
            <Text className="text-white text-sm font-semibold">
              Scan barcode
            </Text>
          </Pressable>
        </View>

        {/* Recently Added Foods */}
        <View className="flex-1 px-4">
          <Text className="text-xs text-gray-400 mb-2">
            Recently added foods
          </Text>
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
                    className="w-full px-4 py-3 mb-3 bg-gray-100 rounded-xl active:bg-gray-200 flex-row items-center justify-between"
                  >
                    <View>
                      <Text className="font-normal text-lg">{item.name}</Text>
                      <Text className="font-light text-sm">
                        {item.calories ?? "--"} cal,{" "}
                        {item.portion ?? "1 serving"}
                      </Text>
                    </View>

                    <View className="p-2 bg-blue-100 rounded-full">
                      <PlusIcon size={28} color="#3b82f6" />
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
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AddFoodModal;
