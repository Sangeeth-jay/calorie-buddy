import { Pressable, Text, View } from "react-native";

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

export default GoalCard;