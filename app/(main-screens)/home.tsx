import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "@/components/home/HomeHeader";
import Calendar from "@/components/Calendar";
import CaloriesCard from "@/components/home/CaloriesCard";

const home = () => {
  return (
    <SafeAreaView className="w-full">
      <ScrollView className="w-full " showsVerticalScrollIndicator={false}>
        <View className="w-full px-6 pt-6 flex-col gap-6">
          <HomeHeader userName="John Doe" />
          <Calendar selectedDate={13} onSelectDate={() => {}} />
          <CaloriesCard selectedDate={13} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
