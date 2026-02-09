import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Calendar from "@/components/Calendar";
import CaloriesCard from "@/components/home/CaloriesCard";
import HomeHeader from "@/components/home/HomeHeader";
import HydrationCard from "@/components/home/HydrationCard";
import MealSummary from "@/components/home/MealSummary";
import { useHomeHeaderData } from "@/src/hooks/useHomeHeaderData";

const Home = () => {
  const { userName, gender } = useHomeHeaderData();

  return (
    <SafeAreaView className="w-full ">
      <ScrollView className="w-full " showsVerticalScrollIndicator={false}>
        <View className="w-full px-6 pt-6 flex-col gap-6">
          <HomeHeader userName={userName} gender={gender} />

          <Calendar selectedDate={13} onSelectDate={() => {}} />

          <CaloriesCard selectedDate={13} />

          <HydrationCard />

          <MealSummary />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
