import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Linking,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { CaretRightIcon, ArrowSquareOutIcon } from "phosphor-react-native";

const Profile = () => {
  const openBuyMeACoffee = async () => {
    const url = "https://buymeacoffee.com/sangeethjay";

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Can't open URL:", url);
      }
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  return (
    <SafeAreaView className="w-full flex-1 bg-gray-50">
      <ScrollView
        className="w-full flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full px-6 pt-6 ">
          {/* User Profile */}
          <View className="w-full bg-white rounded-2xl flex-row items-center gap-4 p-4 mb-6 ">
            <View className="w-20 h-20 rounded-full bg-purple-200 items-center justify-center border-4 border-purple-600">
              <Image
                resizeMode="contain"
                source={require("../../assets/images/Male.png")}
                className="w-16 h-20 rounded-full"
              />
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-semibold text-gray-800">
                Hashen Sangeeth
              </Text>
              <Text className="text-base text-slate-400">user@user.com</Text>
            </View>
          </View>

          {/* Nutrition & Goals */}
          <Text className="text-base font-semibold text-slate-600 mb-2">
            Nutrition & Goals
          </Text>
          <View className="w-full bg-white rounded-2xl px-4 py-6 mb-6 ">
            <View className="flex-row items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <View className="flex-row items-center gap-2">
                <Image
                  source={require("../../assets/icons/goal3d.png")}
                  className="w-8 h-8"
                />
                <Text className="text-base text-slate-500 font-medium">
                  Goal Type
                </Text>
              </View>
              <Text className="text-base text-slate-600 font-medium">
                Lose Weight
              </Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <View className="flex-row items-center gap-2">
                <Image
                  source={require("../../assets/icons/fire.png")}
                  className="w-8 h-8"
                />
                <Text className="text-base text-slate-500 font-medium">
                  Daily Calorie Target
                </Text>
              </View>
              <Text className="text-lg text-slate-700 font-semibold">
                2,500{" "}
                <Text className="text-sm font-medium text-slate-400">cal</Text>
              </Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <View className="flex-row items-center gap-2">
                <Image
                  source={require("../../assets/icons/fish3d.png")}
                  className="w-8 h-8"
                />
                <Text className="text-base text-slate-500 font-medium">
                  Target Protein
                </Text>
              </View>
              <Text className="text-lg text-slate-700 font-semibold">
                181{" "}
                <Text className="text-sm font-medium text-slate-400">g</Text>
              </Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <View className="flex-row items-center gap-2">
                <Image
                  source={require("../../assets/icons/apple3d.png")}
                  className="w-8 h-8"
                />
                <Text className="text-base text-slate-500 font-medium">
                  Target Carbs
                </Text>
              </View>
              <Text className="text-lg text-slate-700 font-semibold">
                345{" "}
                <Text className="text-sm font-medium text-slate-400">g</Text>
              </Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <View className="flex-row items-center gap-2">
                <Image
                  source={require("../../assets/icons/avocado3d.png")}
                  className="w-8 h-8"
                />
                <Text className="text-base text-slate-500 font-medium">
                  Target Fats
                </Text>
              </View>
              <Text className="text-lg text-slate-700 font-semibold">
                72 <Text className="text-sm font-medium text-slate-400">g</Text>
              </Text>
            </View>

            <Pressable className="flex-row items-center justify-between w-full pt-2">
              <Text className="text-base text-slate-500">
                Need to change Goal?
              </Text>
              <CaretRightIcon size={24} color="#94a3b8" weight="regular" />
            </Pressable>
          </View>

          {/* Health Profile */}
          <Text className="text-base font-semibold text-slate-600 mb-2">
            Health Profile
          </Text>
          <Pressable className="w-full bg-white rounded-2xl px-4 py-6 mb-6">
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-row gap-3 items-center flex-1">
                <Image
                  source={require("../../assets/icons/medal3d.png")}
                  className="w-12 h-12"
                />
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">
                    69 kg (current weight)
                  </Text>
                  <Text className="text-sm text-slate-400">
                    Moderate Active
                  </Text>
                </View>
              </View>
              <CaretRightIcon size={24} color="#94a3b8" weight="regular" />
            </View>
          </Pressable>

          {/* Notifications */}
          <Text className="text-base font-semibold text-slate-600 mb-2">
            Notifications
          </Text>
          <View className="w-full bg-white rounded-2xl px-4 py-6 mb-6 ">
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-row gap-3 items-center flex-1">
                <Image
                  source={require("../../assets/icons/bell3d.png")}
                  className="w-10 h-10"
                />
                <Text className="text-base font-medium text-gray-800">
                  Daily Tracking Reminders
                </Text>
              </View>
              {/* Toggle Switch - functional version coming next */}
              <View className="w-14 h-8 bg-green-500 rounded-full items-end justify-center px-1">
                <View className="w-6 h-6 bg-white rounded-full" />
              </View>
            </View>
          </View>

          {/* Support to Developer */}
          <Text className="text-base font-semibold text-slate-600 mb-2">
            Support to Developer
          </Text>
          <Pressable
            onPress={openBuyMeACoffee}
            className="w-full bg-white rounded-2xl px-4 py-6 mb-6 "
          >
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-row gap-3 items-center flex-1">
                <Image
                  source={require("../../assets/icons/buy-me-a-coffee.png")}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
                <Text className="text-lg font-semibold text-gray-800">
                  Buy me a coffee
                </Text>
              </View>
              <ArrowSquareOutIcon size={24} color="#94a3b8" weight="regular" />
            </View>
          </Pressable>

          {/* Footer */}
          <View className="w-full items-center py-4">
            <Text className="text-sm text-slate-400">Made with ❤️ by SJay</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
