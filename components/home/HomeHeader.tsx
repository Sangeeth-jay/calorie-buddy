import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { BellIcon } from "phosphor-react-native";

interface HomeHeaderProps {
  userName: string;
  gender: "male" | "female";
}

const avatarSource = {
  male: require("../../assets/images/Male.png"),
  female: require("../../assets/images/Female.png"),
};

const HomeHeader: React.FC<HomeHeaderProps> = ({ userName, gender }: { userName: string; gender: "male" | "female" }) => {


  return (
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="text-2xl font-bold text-blue-950">
          Hello, {userName}
        </Text>
        <Text className="text-sm text-gray-500">Keep Moving Today!</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <Pressable className="w-10 h-10 items-center justify-center border border-gray-400 rounded-full">
          <BellIcon size={24} weight="fill" color="#6b7280" />
        </Pressable>
        <Pressable className="w-12 h-12 items-center justify-center bg-purple-200 rounded-full">
          <Image
            resizeMode="contain"
            source={avatarSource[gender]}
            className="w-10 h-10 rounded-full"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;
