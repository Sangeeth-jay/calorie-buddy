import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NextFillBtn from "../../components/NextFillBtn";

const goals = [
  { id: "lose-weight", emoji: "🔥", label: "Lose weight" },
  { id: "gain-muscle", emoji: "💪", label: "Gain muscle" },
  { id: "maintain-weight", emoji: "⚖️", label: "Maintain weight" },
  { id: "boost-energy", emoji: "⚡", label: "Boost energy" },
  { id: "improve-nutrition", emoji: "🥗", label: "Improve nutrition" },
  { id: "gain-weight", emoji: "🎈", label: "Gain weight" },
];

const Goal = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

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
                onPress={() => setSelectedGoal(goal.id)}
              />
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <View className="px-6 py-6">
          <NextFillBtn
            title="Continue"
            onPress={() => {
              console.log("Selected goal:", selectedGoal);
            }}
            disabled={!selectedGoal}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

interface GoalCardProps {
  emoji: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
  emoji,
  label,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-gray-50 rounded-2xl p-4 mb-3 border ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-transparent"
      }`}
    >
      <View className="flex-row justify-center items-center">
        <Text className="text-2xl mr-3">{emoji}</Text>
        <Text className="text-base font-medium text-gray-800">{label}</Text>
      </View>
    </Pressable>
  );
};
export default Goal;
