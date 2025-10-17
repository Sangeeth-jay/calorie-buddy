import { Image, Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex w-full h-full flex-col bg-blue-500 items-center justify-center gap-4">
      <View className="bg-[#f4f4f4] w-36 h-36 flex items-center justify-center rounded-full">
        <Image
          source={require("../assets/images/logo.png")}
          className="w-fit h-fit"
        />
      </View>
      <Text className="text-white text-2xl font-semibold">Hello world</Text>
    </View>
  );
}
