import { View, Text, Pressable } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import GoalCard from "@/components/cards/GoalCard";
import { updateUserGoal } from "@/src/services/goalService";
import { GoalType } from "@/src/utils/goalPlan";

interface UpdateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  weight: number;
}

const goals = [
  { id: "lose_weight", emoji: "🔥", label: "Lose weight" },
  { id: "gain_muscle", emoji: "💪", label: "Gain muscle" },
  { id: "maintain_weight", emoji: "⚖️", label: "Maintain weight" },
  { id: "boost_energy", emoji: "⚡", label: "Boost energy" },
  { id: "improve_nutrition", emoji: "🥗", label: "Improve nutrition" },
  { id: "gain_weight", emoji: "🎈", label: "Gain weight" },
];

const UpdateGoal: React.FC<UpdateGoalModalProps> = ({
  isOpen,
  onClose,
  weight,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!selectedGoal) return;

    setIsLoading(true);
    try {
      await updateUserGoal(selectedGoal as GoalType);
      onClose();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      handleStyle={{
        backgroundColor: "#3b82f6",
        borderTopEndRadius: 14,
        borderTopStartRadius: 14,
      }}
      handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
    >
      <BottomSheetView style={{ padding: 20, width: "100%" }}>
        <View className="w-full items-center border-b border-gray-200 pb-4">
          <Text className="text-3xl text-blue-600 font-semibold text-center">
            Update Goal
          </Text>
          <Text className="text-gray-500 ">
            Your current weight is : {weight} kg
          </Text>
        </View>
        <View className="flex-1">
          <View className="flex-1 justify-center gap-2 px-2 py-8">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                emoji={goal.emoji}
                label={goal.label}
                isSelected={selectedGoal === goal.id}
                onPress={() => {
                  setSelectedGoal(goal.id);
                }}
              />
            ))}
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "#e5e7eb",
              borderRadius: 24,
              padding: 16,
              alignItems: "center",
            }}
            disabled={isLoading}
            onPress={onClose}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#374151" }}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "#3b82f6",
              borderRadius: 24,
              padding: 16,
              alignItems: "center",
            }}
            onPress={handleSave}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
              {isLoading ? "Saving..." : "Save"}
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default UpdateGoal;
