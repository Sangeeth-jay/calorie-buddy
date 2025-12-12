import { View, Text } from "react-native";
import React from "react";
import Svg, { Line } from "react-native-svg";

import Glass from "@/assets/images/cocktail-33.svg";

const HydrationCard = () => {
  //below should add context api data
  const drinked = 1650;
  const waterGoal = 3500;
  const precentage: any = ((drinked / waterGoal) * 100).toFixed(0);

  //for progress bar
  const totalWidth = 200;
  const progressWidth: number = (precentage / 100) * totalWidth;

  return (
    <View className="bg-[#C6E5FF] w-full p-4 rounded-xl flex-row justify-between">
      <View className="flex gap-2 w-2/3">
        <Text className="text-xl font-semibold text-blue-950">Hydration</Text>
        <View className="flex-row items-center gap-4">
          <Text className="text-5xl font-semibold text-white">
            {precentage}
            <Text className="text-3xl text-blue-500 font-medium">%</Text>
          </Text>
          <View className="h-full border-r-2 border-r-white" />
          <View className="">
            <Text className="text-blue-500 font-medium">{drinked}ml</Text>
            <Text className="text-blue-500 font-medium">of {waterGoal}ml</Text>
          </View>
        </View>

        <Svg height="10" width="100%">
          <Line
            x1="0"
            y1="5"
            x2={totalWidth} // full width
            y2="5"
            stroke="#EBEBEB"
            strokeWidth="8"
            strokeLinecap="round" // makes ends rounded
          />
          <Line
            x1="0"
            y1="5"
            x2={progressWidth} // full width
            y2="5"
            stroke="#407BFF"
            strokeWidth="8"
            strokeLinecap="round" // makes ends rounded
          />
        </Svg>
      </View>
      <View className="scale-x-[-1]">
        <Glass width={100} height={100} />
      </View>
    </View>
  );
};

export default HydrationCard;
