import { View, Text } from "react-native";
import React, { useCallback, useRef, useEffect, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import { createMealLog } from "@/src/services/mealLogs";
import { useFoodSearch } from "@/src/hooks/useFoodSearch";
import { scaleFoodTotals } from "@/src/utils/nutritionMath";
import FoodSearchView from "./FoodSearchView";
import FoodDetailsView from "./FoodDetailsView";
import { getAuthUser } from "@/src/services/user.service";
import Toast from "react-native-toast-message";
interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: "Breakfast" | "Lunch" | "Dinner";
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({
  isOpen,
  onClose,
  mealType,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  //states for screen swap
  const [mode, setMode] = useState<"search" | "details">("search");
  const [selectedFood, setSelectedFood] = useState<any | null>(null);

  //states for search
  const { query, setQuery, result, status } = useFoodSearch();

  //states for serving & qty
  const [servingSizeText, setServingSizeText] = useState("");
  const [servingsText, setServingsText] = useState("1");
  const [baseServingSize, setBaseServingSize] = useState<number>(0);

  //saving data states
  const [saving, setSaving] = useState(false);

  //handle servings change
  const totals = selectedFood
    ? scaleFoodTotals(selectedFood, baseServingSize, servingSizeText)
    : null;

  const totalCalories = totals ? totals.calories : null;
  const totalCarbs = totals ? totals.carbs : null;
  const totalFat = totals ? totals.fat : null;
  const totalProtein = totals ? totals.protein : null;

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
  }, [isOpen, setQuery]);

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
      const user = await getAuthUser();

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

      const { error: insErr } = await createMealLog(payload);

      if (insErr) throw insErr;
      setMode("search");
      setSelectedFood(null);
      setServingsText("1");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed logging meal",
      });
      throw error;
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
      enableContentPanningGesture={false}
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
          <FoodSearchView
            query={query}
            setQuery={setQuery}
            status={status}
            result={result}
            onPickFood={(item) => {
              setSelectedFood(item);
              const base = Number(item.serving_size ?? 0);
              setBaseServingSize(base);
              setServingSizeText(String(base || ""));
              setServingsText("1");
              setMode("details");
            }}
            onClose={onClose}
          />
        )}

        {/*detailed view*/}
        {mode === "details" && selectedFood && (
          <FoodDetailsView
            food={selectedFood}
            servingsText={servingsText}
            onServingsChange={handleNumbOfServings}
            servingSizeText={servingSizeText}
            onServingSizeChange={handleServingSize}
            totalCalories={totalCalories}
            totalCarbs={totalCarbs}
            totalFat={totalFat}
            totalProtein={totalProtein}
            saving={saving}
            onBack={() => setMode("search")}
            onConfirm={handleConfirm}
          />
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AddFoodModal;
