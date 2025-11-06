import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useSetup } from "../context/SetupContext";
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
  const { setupData, updateSetupData, submitAllData } = useSetup();
  const [selectedActive, setSelectedActive] = useState(setupData.activeLvl);
  const [loading, setLoading] = useState(false);

    const handleFinish = async () => {
    setLoading(true);
    try {
      // Submit with the current activeLevel value
      await submitAllData({ activeLvl: selectedActive });

    } catch (error) {
      alert('Failed to save your data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="w-full h-screen-safe flex-1 items-center justify-between pb-6 bg-white">
      <SetUpHeader title="How active are you?" currentStep={6} totalSteps={6} />

      <View className="w-full flex-col justify-center items-center gap-4">
        {activeLvl.map((item, index) => (
          <Pressable
            key={item.id}
            onPress={() => setSelectedActive(item.id)}
            className={`w-10/12 my-2 bg-gray-100 rounded-2xl ${selectedActive === item.id ? "border border-blue-500" : ""}`}
          >
            <View className="w-full p-3 flex flex-col items-center justify-between">
              <Text className="text-xl  text-blue-950">{item.title}</Text>
              <Text className="text-md text-gray-400">{item.desc}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      {/* Show loading spinner when submitting */}
      {loading && (
        <View className="absolute inset-0 bg-black/20 items-center justify-center">
          <ActivityIndicator size="large" color="#407BFF" />
          <Text className="mt-4 text-white">Saving your data...</Text>
        </View>
      )}

      <NextFillBtn
        title={loading ? "Saving..." : "Finish"}
        onPress={handleFinish}
      />
    </SafeAreaView>
  );
};

export default Active;
