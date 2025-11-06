import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef, useEffect } from "react";

import SetUpHeader from "../../components/SetUpHeader";
import NextFillBtn from "../../components/NextFillBtn";
import { router } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;
const RULER_WIDTH = SCREEN_WIDTH * 3;
const MIN_WEIGHT = 30;
const MAX_WEIGHT = 200;
const TICK_SPACING = 10;

export default function Weight() {
  const [units, setUnits] = useState("kg");
  const [weightInKg, setWeightInKg] = useState(70);

  const scrollViewRef = useRef<ScrollView | null>(null);

  //Genrate array for heights
  const generateHeights = () => {
    const weights = [];
    for (let i = MIN_WEIGHT; i <= MAX_WEIGHT; i++) {
      weights.push(i);
    }
    return weights;
  };

  const weights = generateHeights();

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: any } };
  }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const centerPosition = offsetX + SCREEN_WIDTH / 2;
    const weightIndex = Math.round(
      (centerPosition - SCREEN_WIDTH / 2) / TICK_SPACING
    );

    const calculatedWeight = MIN_WEIGHT + weightIndex;

    if (calculatedWeight >= MIN_WEIGHT && calculatedWeight <= MAX_WEIGHT) {
      setWeightInKg(calculatedWeight);
    }
  };

  //kg and lbs conversion
const kgToLbs = (kg: number) => {
  return (kg * 2.205).toFixed(1);
};

const lbsToKg = (lbs: number) => {
  return (lbs / 2.205).toFixed(1);
};

  //Display height
  const getDesiplayWeight = () => {
    if (units === "kg") {
      return weightInKg.toFixed(1);
    } else {
      const converted = kgToLbs(weightInKg);
      return converted;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        const initialPercentage =
          (weightInKg - MIN_WEIGHT) / (MAX_WEIGHT - MIN_WEIGHT);
        const initialScroll = initialPercentage * (RULER_WIDTH - SCREEN_WIDTH);

        scrollViewRef.current.scrollTo({
          x: initialScroll,
          animated: false,
        });
      }
    }, 100);
  }, []);

  const handleUnitChange = (newUnit: React.SetStateAction<string>) => {
    setUnits(newUnit);
  };

  return (
    <SafeAreaView className="w-full h-screen-safe flex-1 items-center justify-between py-6 bg-white">
      <SetUpHeader
        title="What is your current weight?"
        currentStep={5}
        totalSteps={6}
      />

      <View className="w-full flex-col justify-center items-center">
        {/* height units toggle btn*/}
        <View
          className={`w-full flex-row justify-center items-center gap-4 mb-20`}
        >
          <TouchableOpacity
            onPress={() => {
              handleUnitChange("kg");
            }}
            className={` flex justify-center items-center w-2/12 py-2 rounded-full ${units === "kg" ? "bg-blue-200 border border-blue-500" : "bg-transparent border border-gray-400"}`}
          >
            <Text
              className={`text-2xl font-semibold ${units === "kg" ? "text-blue-600" : "text-gray-600"}`}
            >
              kg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleUnitChange("lbs");
            }}
            className={` flex justify-center items-center w-2/12 py-2 rounded-full ${units === "lbs" ? "bg-blue-200 border border-blue-500" : "bg-transparent border border-gray-400"}`}
          >
            <Text
              className={`text-2xl font-semibold ${units === "lbs" ? "text-blue-600" : "text-gray-600"}`}
            >
              lbs
            </Text>
          </TouchableOpacity>
        </View>

        {/* height display */}
        <Text className="text-6xl font-bold text-gray-800 mb-4">
          {getDesiplayWeight()}
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
            {weights.map((w, index) => {
              const isLabeledTick = w % 10 === 0;

              return (
                <View
                  key={w}
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
                  {/* {isLabeledTick && (
                  <Text className="text-sm text-gray-400 mt-2">{h}</Text>
                )} */}
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

      <NextFillBtn
        title="Next"
        onPress={() => {
          console.log(weightInKg.toFixed(1));
          router.push("/(setup-screens)/active");
        }}
      />
    </SafeAreaView>
  );
}
