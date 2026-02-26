import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSetup } from "../../src/context/SetupContext";

import { router } from "expo-router";
import NextFillBtn from "../../components/NextFillBtn";
import SetUpHeader from "../../components/SetUpHeader";

const SCREEN_WIDTH = Dimensions.get("window").width;
const RULER_WIDTH = SCREEN_WIDTH * 3;
const MIN_HEIGHT = 100;
const MAX_HEIGHT = 220;
const TICK_SPACING = 10;

//Genrate array for heights
const generateHeights = () => {
  const heights = [];
  for (let i = MIN_HEIGHT; i <= MAX_HEIGHT; i++) {
    heights.push(i);
  }
  return heights;
};

export default function Height() {
  const { setupData, updateSetupData } = useSetup();

  // -------------------------
  // Refs
  // -------------------------
  const scrollViewRef = useRef<ScrollView | null>(null);

  // -------------------------
  // States
  // -------------------------
  const [units, setUnits] = useState(setupData.heightUnit);
  const [heightInCm, setHeightInCm] = useState(setupData.height);

  // -------------------------
  // Effects
  // -------------------------
  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        const initialPercentage =
          (heightInCm - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT);
        const initialScroll = initialPercentage * (RULER_WIDTH - SCREEN_WIDTH);

        scrollViewRef.current.scrollTo({
          x: initialScroll,
          animated: false,
        });
      }
    }, 100);
    //eslint-disable-next-line
  }, []);

  // -------------------------
  // Handlers
  // -------------------------
  const heights = generateHeights();

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: any } };
  }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const centerPosition = offsetX + SCREEN_WIDTH / 2;
    const heightIndex = Math.round(
      (centerPosition - SCREEN_WIDTH / 2) / TICK_SPACING,
    );

    const calculatedHeight = MIN_HEIGHT + heightIndex;

    if (calculatedHeight >= MIN_HEIGHT && calculatedHeight <= MAX_HEIGHT) {
      setHeightInCm(calculatedHeight);
    }
  };

  //cm and ft conversion
  const cmToFeet = (cm: number) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.floor(totalInches % 12);
    return { feet, inches, decimal: (totalInches / 12).toFixed(1) };
  };

  //Display height
  const getDesiplayHeight = () => {
    if (units === "cm") {
      return heightInCm.toFixed(1);
    } else {
      const converted = cmToFeet(heightInCm);
      return `${converted.feet}' ${converted.inches}"`;
    }
  };

  const handleUnitChange = (newUnit: React.SetStateAction<string>) => {
    setUnits(newUnit);
  };

  const handleNext = () => {
    updateSetupData("height", heightInCm);
    updateSetupData("heightUnit", units);
    router.push("/(setup-screens)/weight");
  };

  return (
    <SafeAreaView className="w-full h-screen-safe flex-1 items-center justify-between pb-6 bg-white">
      <SetUpHeader
        title="What is your height?"
        currentStep={4}
        totalSteps={6}
      />

      <View className="w-full flex-col justify-center items-center">
        {/* height units toggle btn*/}
        <View
          className={`w-full flex-row justify-center items-center gap-4 mb-20`}
        >
          <TouchableOpacity
            onPress={() => {
              handleUnitChange("cm");
            }}
            className={` flex justify-center items-center w-2/12 py-2 rounded-full ${units === "cm" ? "bg-blue-200 border border-blue-500" : "bg-transparent border border-gray-400"}`}
          >
            <Text
              className={`text-2xl font-semibold ${units === "cm" ? "text-blue-600" : "text-gray-600"}`}
            >
              cm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleUnitChange("ft");
            }}
            className={` flex justify-center items-center w-2/12 py-2 rounded-full ${units === "ft" ? "bg-blue-200 border border-blue-500" : "bg-transparent border border-gray-400"}`}
          >
            <Text
              className={`text-2xl font-semibold ${units === "ft" ? "text-blue-600" : "text-gray-600"}`}
            >
              ft
            </Text>
          </TouchableOpacity>
        </View>

        {/* height display */}
        <Text className="text-6xl font-bold text-gray-800 mb-4">
          {getDesiplayHeight()}
        </Text>

        {/* height ruler */}

        <View className="relative w-full" style={{ height: 100 }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={TICK_SPACING}
            decelerationRate={"fast"}
            style={{ height: 100 }}
            contentContainerStyle={{
              paddingHorizontal: SCREEN_WIDTH / 2,
              alignItems: "flex-end",
            }}
          >
            {heights.map((h, index) => {
              const isLabeledTick = h % 10 === 0;

              return (
                <View
                  key={h}
                  style={{ width: TICK_SPACING, height: 80 }}
                  className="items-center justify-start"
                >
                  <View
                    className="bg-gray-400"
                    style={{
                      width: isLabeledTick ? 2 : 1,
                      height: isLabeledTick ? 70 : 30,
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>

          <View
            className="absolute bg-blue-500 rounded-full"
            style={{
              width: 5,
              height: 60,
              left: SCREEN_WIDTH / 2 - 1.5,
              top: 20,
            }}
            pointerEvents="none"
          ></View>
        </View>
      </View>

      {/* height */}

      <NextFillBtn title="Next" onPress={handleNext} />
    </SafeAreaView>
  );
}
