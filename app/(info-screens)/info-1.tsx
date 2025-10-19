import { View, Text } from "react-native";
import React from "react";
import EatingImg from "../../assets/info/Eating.svg";

const Info1 = () => {
  return (
    <View className="w-full h-screen-safe flex-1 justify-center items-center px-16 bg-white">
      <EatingImg width={320} height={320} />
      <Text className="text-2xl font-semibold text-center">Personalized Tracking Made Easy</Text>
      <Text className="text-center">
        Log your meals, track activities, steps, weight, BMI, and monitor
        hydration with tailored insights just for you.
      </Text>
    </View>
  );
};

export default Info1;
