import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { supabase } from "@/src/lib/supabase";

import NextFillBtn from "../../components/NextFillBtn";
import SetUpHeader from "../../components/SetUpHeader";
import { useSetup } from "../../src/context/SetupContext";

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
  const { setupData, updateSetupData } = useSetup();
  const [selectedActive, setSelectedActive] = useState<number | null>(
    setupData.activeLvl ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = !!selectedActive && !loading;

  const router = useRouter();

  const handleFinish = async () => {
    if (!selectedActive) {
      setError("Please select your activity level before proceeding.");
      return;
    }

    setLoading(true);

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error("No user found");

      const userId = userData.user.id;

      // Prepare the date of birth in the required format
      const { year, month, day } = setupData.bdate;
      const yyyy = String(year);
      const mm = String(month).padStart(2, "0");
      const dd = String(day).padStart(2, "0");
      const dob = `${yyyy}-${mm}-${dd}`;

      // Update the user's profile with all the collected data
      const {error} = await supabase.from("profiles")
        .insert({
          id: userId,
          user_name: setupData.name,
          gender: setupData.gender,
          date_of_birth: dob,
          height_cm: setupData.height,
          starting_weight_kg: setupData.weight,
          active_level: selectedActive,
        })
        .eq("id", userId);

        if (error) throw error;

      router.replace("/(after-setup-screens)/health");
    } catch (e: any) {
      console.log("Submitting err:", e);

      setError(
        e.message +
          " An error occurred while saving your data. Please try again.",
      );
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
            onPress={() => {setSelectedActive(item.id); updateSetupData("activeLvl", item.id);}}
            className={`w-10/12 my-2 bg-gray-100 rounded-2xl ${selectedActive === item.id ? "border border-blue-500" : ""}`}
          >
            <View className="w-full p-3 flex flex-col items-center justify-between">
              <Text className="text-xl  text-blue-950">{item.title}</Text>
              <Text className="text-md text-gray-400">{item.desc}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      {error ? (
        <Text className="text-red-500 text-center mt-2 px-4">{error}</Text>
      ) : null}

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
        disabled={!canSubmit}
      />
    </SafeAreaView>
  );
};

export default Active;
