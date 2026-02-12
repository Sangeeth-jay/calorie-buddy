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
import { supabase } from "@/src/lib/supabase";

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

  //states for screen swap
  const [mode, setMode] = useState<"search" | "details">("search");
  const [selectedFood, setSelectedFood] = useState<any | null>(null);

  //states for searching
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [status, setStatus] = useState<FoodSearchResult["status"]>("idle");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  //states for serving & qty
  const [servingSizeText, setServingSizeText] = useState("");
  const [servingsText, setServingsText] = useState("1");
  const [baseServingSize, setBaseServingSize] = useState<number>(0);

  //saving data states
  const [saving, setSaving] = useState(false);

  //handle servings change
  const baseSize = baseServingSize > 0 ? baseServingSize : 1;
  const currentSize = Math.max(1, parseFloat(servingSizeText) || baseSize);
  const sizeMult = currentSize / baseSize;

  const mul = (value: any) => {
    if (value === null || value === undefined) return null;
    const n = Number(value);
    if (Number.isNaN(n)) return null;
    return n * sizeMult;
  };

  const totalCalories = mul(selectedFood?.calories);
  const totalCarbs = mul(selectedFood?.carbs_g);
  const totalFat = mul(selectedFood?.fat_g);
  const totalProtein = mul(selectedFood?.protein_g);

  //------------------------------------------------------------------------

  useEffect(() => {
    if (isOpen) {
      setMode("search");
      setSelectedFood(null);
      setQuery("");

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

      setStatus(res.status as FoodSearchResult["status"]);
      setResult(res.data);
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  //handle serving size change
  const handleServingSize = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");

    // allow empty while typing, so user can delete and type again
    setServingSizeText(cleaned === "" ? "" : cleaned);
  };

  //handle number of servings change
  const handleNumbOfServings = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    const n = Math.max(1, parseFloat(cleaned) || 1);

    setServingsText(cleaned);
    setServingSizeText(String(baseServingSize * n));
  };

  //handle confirm
  const handleConfirm = async () => {
    if (!selectedFood) return;

    try {
      setSaving(true);

      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser();
      if (userErr) throw userErr;
      if (!user) throw new Error("User not found");

      //snapshots of macros
      const calories = Number(totalCalories) || 0;
      const protein = Number(totalProtein) || 0;
      const carbs = Number(totalCarbs) || 0;
      const fat = Number(totalFat) || 0;

      //payload
      const payload = {
        user_id: user.id,
        food_id: selectedFood.id ? Number(selectedFood.id) : null,
        meal_type: mealType,
        servings: Number(servingsText) || 1,
        food_name_snapshot: selectedFood.name,
        serving_size_snapshot: servingSizeText || null,
        unit: selectedFood.unit || null,
        calories_snapshot: calories,
        protein_g_snapshot: protein,
        carbs_g_snapshot: carbs,
        fat_g_snapshot: fat,
      };

      const { error: insErr } = await supabase
        .from("meal_logs")
        .insert(payload);

      if (insErr) throw insErr;

      setMode("search");
      setSelectedFood(null);
      setServingsText("1");
    } catch (error) {
      console.log("Meal log insert error:", error);
    } finally {
      setSaving(false);
    }
  };

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

        {/* search view */}
        {mode === "search" && (
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
                <Text className="text-white text-sm font-semibold">
                  Scan meal
                </Text>
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
                        onPress={() => {
                          setSelectedFood(item);
                          setMode("details");
                          const base = Number(item.serving_size ?? 0);
                          setBaseServingSize(base);
                          setServingSizeText(String(base || ""));
                          setServingsText("1");
                        }}
                        className="w-full px-4 py-3 mb-3 bg-gray-100 rounded-xl active:bg-gray-200 flex-row items-center justify-between"
                      >
                        <View>
                          <Text className="font-normal text-lg">
                            {item.name}
                          </Text>
                          <Text className="font-light text-sm">
                            {item.calories ?? "--"} cal,{" "}
                            {item.portion ?? "1 serving"}
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
                <Text className="text-lg font-semibold text-gray-700">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={onClose}
                className="flex-1 bg-blue-500 rounded-full py-4 items-center"
              >
                <Text className="text-lg font-semibold text-white">Done</Text>
              </Pressable>
            </View>
          </>
        )}

        {/*detailed view*/}
        {mode === "details" && selectedFood && (
          <View className="flex-1 px-4">
            <Text className="text-2xl font-semibold pb-1 border-b border-gray-300">
              {selectedFood.name}
            </Text>

            <View className="flex gap-2 py-8">
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-lg text-blue-950 font-semibold">
                  Number of Servings
                </Text>
                <View className="w-1/3 flex-row gap-0 items-center justify-end bg-gray-100 rounded-2xl px-4 py-1">
                  <BottomSheetTextInput
                    value={servingsText}
                    onChangeText={handleNumbOfServings}
                    placeholderTextColor="#9ca3af"
                    className="text-base text-right"
                    keyboardType="decimal-pad"
                  />
                  <Text>{selectedFood.portion_type}</Text>
                </View>
              </View>
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-lg text-blue-950 font-semibold">
                  Serving size
                </Text>
                <View className="w-1/2 flex-row gap-0 items-center justify-end bg-gray-100 rounded-2xl px-4 py-1">
                  <BottomSheetTextInput
                    value={servingSizeText}
                    onChangeText={handleServingSize}
                    placeholderTextColor="#9ca3af"
                    className="text-base text-right"
                    keyboardType="decimal-pad"
                  />
                  <Text>{selectedFood.unit}</Text>
                </View>
              </View>
            </View>

            {/** macro details */}
            <View className="w-full py-4 px-6 flex-row items-center justify-between border-t border-gray-300">
              <View className="bg-green-200 w-24 h-24 rounded-full flex items-center justify-center p-3">
                <Text className="text-2xl font-semibold text-green-800">
                  {totalCalories ?? "--"}
                </Text>
                <Text className="text-sm text-green-800">cal</Text>
              </View>
              <View className="flex items-center justify-center gap-0">
                <Text className="text-lg font-medium text-slate-700">
                  {totalCarbs == null
                    ? "--"
                    : Number(totalCarbs).toFixed(2).replace(/\.00$/, "")}
                </Text>
                <Text className="text-lg font-light text-slate-500">Carbs</Text>
              </View>
              <View className="flex items-center justify-center">
                <Text className="text-lg font-medium text-slate-700">
                  {totalFat == null
                    ? "--"
                    : Number(totalFat).toFixed(2).replace(/\.00$/, "")}
                </Text>
                <Text className="text-lg font-light text-slate-500">Fat</Text>
              </View>
              <View className="flex items-center justify-center">
                <Text className="text-lg font-medium text-slate-700">
                  {totalProtein == null
                    ? "--"
                    : Number(totalProtein).toFixed(2).replace(/\.00$/, "")}
                </Text>
                <Text className="text-lg font-light text-slate-500">
                  Protien
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3 mt-6">
              <Pressable
                onPress={() => setMode("search")}
                className="flex-1 bg-[#e5e7eb] rounded-full py-4 items-center"
              >
                <Text className="text-lg font-semibold text-gray-700">
                  Back
                </Text>
              </Pressable>

              <Pressable
                onPress={handleConfirm}
                className="flex-1 bg-blue-500 rounded-full py-4 items-center"
              >
                <Text className="text-lg font-semibold text-white">
                  {saving ? "Saving..." : "Confirm"}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AddFoodModal;
