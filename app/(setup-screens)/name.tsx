import { router } from "expo-router";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NextFillBtn from "../../components/NextFillBtn";
import SetUpHeader from "../../components/SetUpHeader";
import { useSetup } from "../../src/context/SetupContext";

const Name = () => {
  const { setupData, updateSetupData } = useSetup();
  const [name, setName] = useState(setupData.name);

  const handleNext = () => {
    updateSetupData("name", name);
    router.push("/(setup-screens)/gender");
  };

  return (
    <SafeAreaView className="w-full h-screen-safe flex-1 items-center justify-between pb-6 bg-white">
      <SetUpHeader
        title="What should I call you?"
        currentStep={1}
        totalSteps={6}
      />
      <View>
        <TextInput
          placeholder="John Doe"
          className="text-5xl border border-blue-400 rounded-xl bg-white px-6 py-4 text-center"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View className="w-full items-center">
        <NextFillBtn disabled={!name} title="Next" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

export default Name;
