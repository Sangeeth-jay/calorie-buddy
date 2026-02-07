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
    // console.log(gender);
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
            <View className={`p-6  rounded-full border  ${selectedGender === "Male" ? "border-blue-600 bg-blue-100 " : "bg-gray-100 border-gray-400"}`}>
              <GenderMaleIcon size={72} color={`${selectedGender === "Male" ? "#407BFF" : "#9CA3AF"}`} />
            </View>
            <Text className={`text-4xl ${selectedGender === "Male" ? "text-blue-600" : "text-gray-400"}`}>Male</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleGenderSelect("Female");
            }}
            className="flex justify-center items-center gap-2"
          >
            <View className={`p-6  rounded-full border  ${selectedGender === "Female" ? "border-blue-600 bg-blue-100 " : "bg-gray-100 border-gray-400"}`}>
              <GenderFemaleIcon size={72} color={`${selectedGender === "Female" ? "#407BFF" : "#9CA3AF"}`} />
            </View>
            <Text className={`text-4xl ${selectedGender === "Female" ? "text-blue-600" : "text-gray-400"}`}>Female</Text>
          </Pressable>
        </View>
        <Pressable
        disabled={true}
          onPress={() => {
            handleGenderSelect("LG TV+");
          }}
          className="px-4 py-2 border border-gray-400 rounded-full"
        >
          <Text className="text-blue-500 text-xl">Prefer not to say</Text>
        </Pressable>
      </View>
      <NextFillBtn disabled={selectedGender === ""} title="Next" onPress={handleNext} />
    </SafeAreaView>
  );
};

export default Gender;
