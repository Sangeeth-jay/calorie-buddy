import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NextFillBtn from '../../components/NextFillBtn'
import React from "react";

interface MetricCardProps {
  label: string;
  icon: any; // React Native's image source type
  description: string;
  children: React.ReactNode;
  className?: string;
}

const Health = () => {
  // TODO: These will come from context/props later
  const healthData = {
    bmi: { value: 26.34, category: 'Over' },
    bmr: 1600,
    tdee: 2751,
    idealWeight: 70,
    bodyFat: 23.7
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800 text-center">
            Your Health Metrics
          </Text>
        </View>

        {/* Content */}
        <View className="px-6 py-6">
          {/* BMI Card */}
          <MetricCard
            label="BMI"
            icon={require("../../assets/images/apple-100.png")}
            description="Body Mass Index - Estimate of body fat based on height and weight"
          >
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Text className="text-4xl font-bold text-gray-800">BMI : </Text>
                <View className="bg-yellow-400 px-2 py-0.5 rounded">
                  <Text className="text-xl font-semibold text-gray-800">
                    {healthData.bmi.value}
                  </Text>
                </View>
                <Text className="text-xs text-gray-500 ml-1">Kgm⁻²</Text>
              </View>

              {/* Labels */}
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs text-gray-400">Under</Text>
                <Text className="text-xs text-gray-400">Normal</Text>
                <Text className="text-xs text-gray-400">Over</Text>
                <Text className="text-xs text-gray-400">Obese</Text>
              </View>

              {/* Color Scale */}
              <View className="flex-row h-4 rounded-full overflow-hidden">
                <View className="flex-1 bg-blue-500" />
                <View className="flex-1 bg-green-500" />
                <View className="flex-1 bg-yellow-500" />
                <View className="flex-1 bg-orange-500" />
                <View className="flex-1 bg-red-500" />
              </View>
            </View>
          </MetricCard>

          {/* BMR Card */}
          <MetricCard
            label="BMR"
            icon={require("../../assets/images/kite.png")}
            description="Represents your body's daily energy needs at rest"
            className="mt-4"
          >
            <View className="flex-1">
              <Text className="text-xl font-semibold text-gray-700 mb-1">
                Basal Metabolic Rate
              </Text>
              <Text className="text-4xl font-bold text-blue-500">
                {healthData.bmr}
                <Text className="text-base font-medium"> Calories/Day</Text>
              </Text>
            </View>
          </MetricCard>

          {/* TDEE Card */}
          <MetricCard
            label="TDEE"
            icon={require("../../assets/images/meal-2-61 1.png")}
            description="Your total daily energy needs in a day"
            className="mt-4"
          >
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-700 mb-1">
                Total Daily Energy Expenditure
              </Text>
              <Text className="text-4xl font-bold text-green-500">
                {healthData.tdee}
                <Text className="text-base font-medium"> Calories/Day</Text>
              </Text>
            </View>
          </MetricCard>

          {/* IBW and Body Fat Row */}
          <View className="flex-row gap-3 mt-4">
            {/* IBW Card */}
            <View className="flex-1">
              <Text className="text-sm text-gray-500 ml-1 mb-1">IBW</Text>
              <View className="bg-gray-50 rounded-2xl p-4">
                <View className="flex-row items-center gap-2">
                  <View className="w-20 h-20 bg-white p-2 items-center justify-center rounded-xl">
                    <Image
                      source={require("../../assets/images/Bunny 1.png")}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  </View>
                  <View className="h-full border-r border-gray-200 mx-2" />
                  <Text className="text-2xl font-bold text-gray-600">
                    {healthData.idealWeight} kg
                  </Text>
                </View>
              </View>
              <Text className="text-xs font-light text-gray-400 ml-2 mt-1">
                Ideal Body Weight
              </Text>
            </View>

            {/* Body Fat Card */}
            <View className="flex-1">
              <Text className="text-sm text-gray-500 ml-1 mb-1">Body Fat</Text>
              <View className="bg-gray-50 rounded-2xl p-4 h-[100px] justify-center">
                <View className="items-center">
                  <Text className="text-3xl font-bold text-purple-500">
                    {healthData.bodyFat}%
                  </Text>
                </View>
              </View>
              <Text className="text-xs font-light text-gray-400 ml-2 mt-1">
                *This was recalculated
              </Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View className="px-6 py-6">
          <NextFillBtn 
            title="Continue" 
            onPress={() => {
              // TODO: Navigate to next screen
              console.log("Navigating to goal screen");
            }} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MetricCard:React.FC<MetricCardProps> = ({ label, icon, description, children, className = "" }) => {
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

export default Health;