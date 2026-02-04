import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Confirm = () => {
  return (
    <SafeAreaView className="w-full h-screen-safe py-[62px] px-[20px] bg-white flex-1 justify-center items-center">
      <View className="flex gap-4">
        <Text>Wainting for email confirmation...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </SafeAreaView>
  );
};

export default Confirm;
