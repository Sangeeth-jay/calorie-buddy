import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NextBtn from "../components/NextBtn";

import { useRouter } from "expo-router";
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
    image: <FitnessImg width={360} height={360} />,
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
  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;

  const router = useRouter();

  useEffect(() => {
    const fadeToNext = (nextIndex: number) => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIndex(nextIndex);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    };

    const interval = setInterval(() => {
      fadeToNext((index + 1) % slides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [index, opacity]);

  const current = slides[index] ?? slides[0];

  function handleSkip() {
    router.replace("/(auth)/login");
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-8 bg-white gap-8">
      <View className=" h-2/3 flex flex-col justify-end">
        {/* Animated Slide */}
        <Animated.View style={{ opacity }} className="items-center">
          {current.image}
          <Text className="text-2xl font-semibold text-center text-[#141E57] mt-4">
            {current.title}
          </Text>
          <Text className="text-center text-[#C7C4C4] mt-2">
            {current.desc}
          </Text>
        </Animated.View>
      </View>

      <View className="1/3">
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
          onPress={handleSkip}
          className="mt-4"
        />
      </View>
    </SafeAreaView>
  );
};

export default Info;
