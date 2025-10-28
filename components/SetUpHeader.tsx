import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native";
import ProgresBar from "./ProgresBar";

type Props = {
  title: string;
  currentStep: number;
  totalSteps: number;
};

const SetUpHeader: React.FC<Props> = ({ title, currentStep, totalSteps }) => {
  const router = useRouter();
  return (
    <View className="w-full px-4 flex items-center justify-center gap-2">
      <View className=" w-full  flex flex-row justify-between items-center gap-2">
        <TouchableOpacity
          className="active:p-4 active:bg-white active:rounded-full"
          onPress={() => router.back()}
        >
          <CaretLeftIcon size={36} color="#999" weight="light" />
        </TouchableOpacity>
        <ProgresBar currentStep={currentStep} totalSteps={totalSteps} />
        <View>
          <Text className="font-semibold text-2xl text-gray-500 p-4">
            {currentStep.toString()}/{totalSteps.toString()}
          </Text>
        </View>
      </View>
      <Text className="font-semibold text-xl text-blue-950">
        {title}
      </Text>
    </View>
  );
};

export default SetUpHeader;
