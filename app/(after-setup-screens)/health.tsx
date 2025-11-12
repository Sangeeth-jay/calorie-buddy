import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const Health = () => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="flex-1">
        {/* header */}
        <View className="px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800 text-center">
            Your Health Matrics
          </Text>
        </View>

        {/* content */}
        <View className="px-6 py-6">
          {/* bmi */}
          <View className="flex justify-start">
            <Text className="text-sm text-gray-500 ml-1">BMI</Text>
            <View className="bg-gray-50 rounded-2xl p-4 mb-1 ">
              <View className="flex-row items-center">
                <View className="border-r border-gray-200 mr-2">
                  <View className="w-24 h-24 bg-white p-2  items-center justify-center mr-2 rounded-xl">
                    <Image
                      source={require("../../assets/images/apple-100.png")}
                      className="w-full h-full"
                    />
                  </View>
                </View>

                {/* BMI Info */}
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <Text className="text-4xl font-bold text-gray-800">
                      BMI :{" "}
                    </Text>
                    <View className="bg-yellow-400 px-2 py-0.5 rounded">
                      <Text className="text-xl font-semibold text-gray-800">
                        26.34
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
              </View>
            </View>
            {/* Description */}
            <Text className="text-xs font-light text-gray-400  ml-2">
              Body Mass Index - Estimate of body fat based on height and weight
            </Text>
          </View>

          {/* BMR */}
          <View className="flex justify-start mt-4">
            <Text className="text-sm text-gray-500 ml-1">BMR</Text>
            <View className="bg-gray-50 rounded-2xl p-4 mb-1">
              <View className="flex-row items-center gap-2">
                <View className="border-r border-gray-200 mr-2">
                  <View className="w-24 h-24 bg-white p-2 items-center justify-center mr-2 rounded-xl">
                    <Image
                      source={require("../../assets/images/kite.png")}
                      className="w-full h-full"
                    />
                  </View>
                </View>

                {/* BMR Info */}
                <View className="flex-1">
                  <Text className="text-xl font-semibold text-gray-700 mb-1">
                    Basal Metabolic Rate
                  </Text>
                  <Text className="text-4xl font-bold text-blue-500">
                    1600
                    <Text className="text-base font-medium"> Calories/Day</Text>
                  </Text>
                </View>
              </View>
            </View>
            {/* Description */}
            <Text className="text-xs font-light text-gray-400 ml-2">
              Represents your body&apos;s daily energy needs at rest
            </Text>
          </View>

          {/* TDEE */}
          <View className="flex justify-start mt-4">
            <Text className="text-sm text-gray-500 ml-1">TDEE</Text>
            <View className="bg-gray-50 rounded-2xl p-4 mb-1">
              <View className="flex-row items-center gap-2">
                <View className="border-r border-gray-200 mr-2">
                  <View className="w-24 h-24 bg-white p-2 items-center justify-center mr-2 rounded-xl">
                    <Image
                      source={require("../../assets/images/meal-2-61 1.png")}
                      className="w-full h-full"
                    />
                  </View>
                </View>

                {/* TDEE Info */}
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-700 mb-1">
                    Total Daily Energy Expenditure
                  </Text>
                  <Text className="text-4xl font-bold text-green-500">
                    2751
                    <Text className="text-base font-medium"> Calories/Day</Text>
                  </Text>
                </View>
              </View>
            </View>
            {/* Description */}
            <Text className="text-xs font-light text-gray-400 ml-2">
              Your total daily energy needs in a day
            </Text>
          </View>

          {/* IBW and Body Fat Row */}
          <View className="flex-row gap-3 mt-4">
            {/* IBW Card */}
            <View className="flex w-1/2">
              <Text className="text-sm text-gray-500 ml-1 mb-1">IBW</Text>
              <View className="bg-gray-50 rounded-2xl p-4">
                <View className="flex-row items-center gap-2">
                  <View className="w-24 h-24 bg-white p-2 items-center justify-center rounded-xl mb-2">
                    <Image
                      source={require("../../assets/images/Bunny 1.png")}
                      className="w-full h-full"
                    />
                  </View>
                  <View className="h-full border-r border-gray-200"/>
                  <Text className="text-3xl font-bold text-gray-600">
                    70 kg
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
              <View className="bg-gray-50 rounded-2xl p-4">
                <View className="items-center">
                  <Text className="text-3xl font-bold text-purple-500">
                    23.7%
                  </Text>
                </View>
              </View>
              <Text className="text-xs font-light text-gray-400 ml-2 mt-1">
                *This was recalculate
              </Text>
            </View>
          </View>
        </View>
        <View className="px-6 py-4">
          <Text>Button will go here</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Health;
