import { SafeAreaView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import NextBtn from "../components/NextBtn";

import EatingImg from "../assets/info/Eating.svg";
import FitnessImg from "../assets/info/Fitness.svg";
import WeightsImg from "../assets/info/Weights-pana.svg";

const slides = [
  {
    id: 1,
    image: <EatingImg width={320} height={320} />,
    title: "Personalized Tracking Made Easy",
    desc: "Log your meals, track activities, steps, weight, BMI, and monitor hydration with tailored insights just for you.",
  },
  {
    id: 2,
    image: <FitnessImg width={320} height={320} />,
    title: "Gain Clear Insights Into Your Progress",
    desc: "See how your daily efforts stack up with detailed graphs and reports on calories, nutrition, and fitness.",
  },
  {
    id: 3,
    image: <WeightsImg width={320} height={320} />,
    title: "Empower Your Health with Expert Advice",
    desc: "Access a wealth of knowledge, nutrition, and wellness articles tailored to your needs, written by our top experts.",
  },
];

const Info = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-8 bg-white gap-8">
      {/* Image + Text */}
      <View className="items-center">
        {current.image}
        <Text className="text-2xl font-semibold text-center text-[#141E57] mt-4">
          {current.title}
        </Text>
        <Text className="text-center text-[#C7C4C4] mt-2">{current.desc}</Text>
      </View>

      {/* Dots */}
      <View className="flex flex-row items-center justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <View
            key={i}
            className={`${
              i === index ? "w-4 bg-[#407BFF]" : "w-2 bg-[#C7C4C4]"
            } h-2 rounded-full`}
          />
        ))}
      </View>

      {/* Button */}
      <NextBtn
        title={index === slides.length - 1 ? "Start" : "Skip"}
        onPress={() => console.log("Button pressed!")}
        className="mt-4"
      />
    </SafeAreaView>
  );
};

export default Info;
