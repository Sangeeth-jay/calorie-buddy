import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSetup } from "../../src/context/SetupContext";

import NextFillBtn from "../../components/NextFillBtn";
import SetUpHeader from "../../components/SetUpHeader";

import { router } from "expo-router";
import { GenderFemaleIcon, GenderMaleIcon } from "phosphor-react-native";

const Gender = () => {
  const { setupData, updateSetupData } = useSetup();
  const [selectedGender, setSelectedGender] = useState(setupData.gender);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    updateSetupData("gender", gender);
    console.log(gender);
  };

  const handleNext = () => {
    router.push("/(setup-screens)/bdate");
  };

  return (
    <SafeAreaView className="w-full h-screen-safe flex-1 items-center justify-between pb-6 bg-white">
      <SetUpHeader title="Are you?" currentStep={2} totalSteps={6} />
      <View className="w-full flex justify-center items-center gap-8">
        <View className="w-full flex-row justify-center items-center gap-8">
          <Pressable
            onPress={() => {
              handleGenderSelect("Male");
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
              handleGenderSelect("Female");
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
            handleGenderSelect("LG TV+");
          }}
          className="px-4 py-2 border border-gray-400 rounded-full"
        >
          <Text className="text-blue-500 text-xl">Prefer not to say</Text>
        </Pressable>
      </View>
      <NextFillBtn title="Next" onPress={handleNext} />
    </SafeAreaView>
  );
};

export default Gender;
