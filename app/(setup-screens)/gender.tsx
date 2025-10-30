import { View, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import SetUpHeader from "../../components/SetUpHeader";
import NextFillBtn from "../../components/NextFillBtn";

import { GenderFemaleIcon, GenderMaleIcon } from "phosphor-react-native";
import { router } from "expo-router";

const gender = () => {
  return (
    <SafeAreaView className="w-full h-screen-safe flex-1 items-center justify-between py-6">
      <SetUpHeader title="Are you?" currentStep={2} totalSteps={6} />
      <View className="w-full flex justify-center items-center gap-8">
        <View className="w-full flex-row justify-center items-center gap-8">
          <Pressable
            onPress={() => {
              console.log("Male");
            }}
            className="flex justify-center items-center gap-2"
          >
            <View className="p-6 bg-blue-100 rounded-full border border-blue-600">
              <GenderMaleIcon size={72} color="#407BFF" />
            </View>
            <Text className="text-4xl text-blue-600">Male</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log("Female");
            }}
            className="flex justify-center items-center gap-2"
          >
            <View className="p-6 bg-blue-100 rounded-full border border-blue-600">
              <GenderFemaleIcon size={72} color="#407BFF" />
            </View>
            <Text className="text-4xl text-blue-600">Female</Text>
          </Pressable>
        </View>
        <Pressable 
         onPress={() => {
              console.log("'_'");
            }}
        className="px-4 py-2 border border-gray-400 rounded-full">
          <Text className="text-blue-500 text-xl">Prefer not to say</Text>
        </Pressable>
      </View>
      <NextFillBtn
        title="Next"
        onPress={() => router.push("/(setup-screens)/bdate")}
      />
    </SafeAreaView>
  );
};

export default gender;
