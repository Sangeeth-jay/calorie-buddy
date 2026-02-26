import { Image, Text, View } from "react-native";

interface MetricCardProps {
  label: string;
  icon: any; // React Native's image source type
  description: string;
  children: React.ReactNode;
  className?: string;
}
const MetricCard: React.FC<MetricCardProps> = ({
  label,
  icon,
  description,
  children,
  className = "",
}) => {
  return (
    <View className={`flex justify-start ${className}`}>
      <Text className="text-sm text-gray-500 ml-1">{label}</Text>
      <View className="bg-gray-50 rounded-2xl p-4 mb-1">
        <View className="flex-row items-center gap-2">
          <View className="border-r border-gray-200 pr-2">
            <View className="w-24 h-24 bg-white p-2 items-center justify-center rounded-xl">
              <Image
                source={icon}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
          </View>
          {children}
        </View>
      </View>
      <Text className="text-xs font-light text-gray-400 ml-2">
        {description}
      </Text>
    </View>
  );
};

export default MetricCard;
