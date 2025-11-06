import { View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import React from "react";
import NextFillBtn from "../../components/NextFillBtn";
import SetUpHeader from "../../components/SetUpHeader";

const Name = () => {
  return (
    <SafeAreaView className="w-full h-screen-safe flex-1 items-center justify-between py-6 bg-white">
      <SetUpHeader
        title="What should I call you?"
        currentStep={1}
        totalSteps={6}
      />
      <View>
        <TextInput
          placeholder="John Doe"
          className="text-5xl border border-blue-400 rounded-xl bg-white px-6 py-4 text-center"
        />
      </View>
      <View className="w-full items-center">
        <NextFillBtn
          title="Next"
          onPress={() => router.push("/(setup-screens)/gender")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Name;
