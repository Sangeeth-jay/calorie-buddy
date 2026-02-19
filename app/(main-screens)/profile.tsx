import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getUserBundle } from "@/src/services/user.service";

import { supabase } from "@/src/lib/supabase";
import { ArrowSquareOutIcon, CaretRightIcon } from "phosphor-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AddWeightModal from "@/components/modals/AddWeight/AddWeightModal";

const goalType: Record<string, string> = {
  lose_weight: "Lose weight",
  maintain_weight: "Maintain weight",
  gain_weight: "Gain weight",
  gain_muscle: "Gain muscle",
  boost_energy: "Boost energy",
  improve_nutrition: "Improve nutrition",
};

const activeLvl: Record<number, string> = {
  1: "Sedentary Active",
  2: "Light Active",
  3: "Moderate Active",
  4: "Active",
  5: "Very Active",
};

const avatarSource = {
  male: require("../../assets/images/Male.png"),
  female: require("../../assets/images/Female.png"),
};

const Profile = () => {
  const router = useRouter();

  // -------------------------
  // State
  // -------------------------
  const [loading, setLoading] = useState(true);
  const [bundle, setBundle] = useState<{
    user: any;
    profile: any;
    goals: any;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // -------------------------
  // handlers
  // -------------------------

  // Open BuyMeACoffee
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("logout error : ", error);
    }

    router.replace("/(auth)/login");
  };

  const handleOnClose = () => {
    setIsModalOpen(false);
    console.log("Modal closed");
  };

  // -------------------------
  // Effects
  // -------------------------

  // Get user bundle
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await getUserBundle();
        if (alive && res) setBundle(res);
      } catch (error) {
        console.log("Profile load error: ", error);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView className="w-full bg-gray-50">
          <ScrollView className="w-full " showsVerticalScrollIndicator={false}>
            <View className="w-full px-6 pt-6 ">
              {/* User Profile */}
              <View className="w-full bg-white rounded-2xl flex-row items-center gap-4 p-4 mb-6 ">
                <View className="w-20 h-20 rounded-full bg-purple-200 items-center justify-center border-4 border-purple-600">
                  <Image
                    resizeMode="contain"
                    source={
                      avatarSource[
                        bundle?.profile.gender as keyof typeof avatarSource
                      ]
                    }
                    className="w-16 h-20 rounded-full"
                  />
                </View>
                <View className="">
                  <Text className="text-2xl font-semibold text-gray-800">
                    {loading ? "Loading..." : bundle?.profile.user_name}
                  </Text>
                  <Text className="text-base text-slate-400">
                    {loading ? "Loading..." : bundle?.user.email}
                  </Text>
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
                    {loading
                      ? "Loading..."
                      : goalType[bundle?.profile.current_goal as string]}
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
                    {loading ? "Loading..." : bundle?.goals.calorie_target}{" "}
                    <Text className="text-sm font-medium text-slate-400">
                      kcal
                    </Text>
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
                    {loading ? "Loading..." : bundle?.goals.protein_target_g}{" "}
                    <Text className="text-sm font-medium text-slate-400">
                      g
                    </Text>
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
                    {loading ? "Loading..." : bundle?.goals.carbs_target_g}{" "}
                    <Text className="text-sm font-medium text-slate-400">
                      g
                    </Text>
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
                    {loading ? "Loading..." : bundle?.goals.fat_target_g}{" "}
                    <Text className="text-sm font-medium text-slate-400">
                      g
                    </Text>
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
              <Pressable
                onPress={() => {
                  setIsModalOpen(true);
                }}
                className="w-full bg-white rounded-2xl px-4 py-6 mb-6"
              >
                <View className="flex-row items-center justify-between w-full">
                  <View className="flex-row gap-3 items-center ">
                    <Image
                      source={require("../../assets/icons/medal3d.png")}
                      className="w-12 h-12"
                    />
                    <View className="">
                      <Text className="text-lg font-semibold text-gray-800">
                        69 kg (current weight)
                      </Text>
                      <Text className="text-sm text-slate-400">
                        {loading
                          ? "Loading..."
                          : activeLvl[bundle?.profile.active_level]}
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
                  <View className="flex-row gap-3 items-center ">
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
                  <View className="flex-row gap-3 items-center ">
                    <Image
                      source={require("../../assets/icons/buy-me-a-coffee.png")}
                      className="w-10 h-10"
                      resizeMode="contain"
                    />
                    <Text className="text-lg font-semibold text-gray-800">
                      Buy me a coffee
                    </Text>
                  </View>
                  <ArrowSquareOutIcon
                    size={24}
                    color="#94a3b8"
                    weight="regular"
                  />
                </View>
              </Pressable>

              {/* Logout Button */}
              <View className="w-full items-center flex">
                <Pressable
                  className="w-8/12  bg-red-100 rounded-2xl px-4 py-4 mb-6 active:bg-red-200 active:scale-95 "
                  onPress={handleLogout}
                >
                  <View className="w-full flex gap-3 items-center">
                    <Text className="font-bold text-xl text-red-500">
                      Logout
                    </Text>
                  </View>
                </Pressable>
              </View>

              {/* Footer */}
              <View className="w-full items-center py-4">
                <Text className="text-sm text-slate-400">
                  Made with ❤️ by SJay
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        <AddWeightModal isOpen={isModalOpen} onClose={handleOnClose} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Profile;
