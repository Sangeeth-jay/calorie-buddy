import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSetup } from "@/src/context/SetupContext";

import GoalCard from "@/components/cards/GoalCard";
import NextFillBtn from "../../components/NextFillBtn";

import { router } from "expo-router";

const goals = [
  { id: "lose_weight", emoji: "🔥", label: "Lose weight" },
  { id: "gain_muscle", emoji: "💪", label: "Gain muscle" },
  { id: "maintain_weight", emoji: "⚖️", label: "Maintain weight" },
  { id: "boost_energy", emoji: "⚡", label: "Boost energy" },
  { id: "improve_nutrition", emoji: "🥗", label: "Improve nutrition" },
  { id: "gain_weight", emoji: "🎈", label: "Gain weight" },
];

const Goal = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const { updateSetupData } = useSetup();

  const handleGoalSelect = (id: string) => {
    setSelectedGoal(id);
    updateSetupData("goalType", id);
  };

  const handleNext = () => {
    router.push("/(after-setup-screens)/calorie-plan");
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1 justify-between">
        {/* Header */}
        <View className="px-6 py-8 border-b border-gray-200">
          <Text className="text-2xl font-bold text-blue-950 text-center">
            What is your main goal{"\n"}with C&apos;Buddy?
          </Text>
        </View>

        <View className="flex-1 px-6 py-8">
          <View className="flex-1 justify-center gap-2 px-6 py-8">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                emoji={goal.emoji}
                label={goal.label}
                isSelected={selectedGoal === goal.id}
                onPress={() => handleGoalSelect(goal.id)}
              />
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <View className="px-6 py-6">
          <NextFillBtn
            title="Continue"
            onPress={handleNext}
            disabled={!selectedGoal}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Goal;
