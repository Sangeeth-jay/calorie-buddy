import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import SetUpHeader from "../../components/SetUpHeader";
import NextFillBtn from "../../components/NextFillBtn";

const activeLvl = [
  {
    id: 1,
    title: "Sedentary",
    desc: "Little or no exercise",
  },
  {
    id: 2,
    title: "Light",
    desc: "Exercise 1-3 times a week",
  },
  {
    id: 3,
    title: "Moderate",
    desc: "Exercise 4-5 times a week",
  },
  {
    id: 4,
    title: "Active",
    desc: "Daily exercise or physical job",
  },
  {
    id: 5,
    title: "Very Active",
    desc: "Intense exercise 6-7 times a week",
  },
];

const Active = () => {
  const [selectedActive, setSelectedActive] = useState(0);

  return (
    <SafeAreaView className="w-full h-screen-safe flex-1 items-center justify-between py-6 bg-white">
      <SetUpHeader title="How active are you?" currentStep={6} totalSteps={6} />

      <View className="w-full flex-col justify-center items-center gap-4">
        {activeLvl.map((item, index) => (
          <Pressable key={item.id} onPress={() => setSelectedActive(item.id)} className={`w-10/12 my-2 bg-gray-200 rounded-2xl ${selectedActive === item.id ? "border border-blue-500" : ""}`}>
            <View className="w-full p-3 flex flex-col items-center justify-between">
              <Text className="text-xl  text-blue-950">{item.title}</Text>
              <Text className="text-md text-gray-400">{item.desc}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <NextFillBtn
        title="Continue"
        onPress={() => {
          alert(selectedActive);
        }}
      />
    </SafeAreaView>
  );
};

export default Active;
