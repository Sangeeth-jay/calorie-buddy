import { SafeAreaView, View, Text } from "react-native";
import React, { useState } from "react";

import { EnvelopeIcon } from "phosphor-react-native";
import CustomInput from "../../components/CustomInput";
import PasswordInput from "../../components/PasswordInput";
import AuthBtn from "../../components/AuthBtn";

import GoogleIcon from "../../assets/icons/google.svg";
import AppleIcon from "../../assets/icons/apple.svg";
import FacebookIcon from "../../assets/icons/facebook.svg";

const Login = () => {

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="w-full h-screen-safe py-[62px] px-[20px] bg-white flex-1 justify-around items-center">
      <View>
        <Text className="text-2xl font-semibold text-blue-950">
          Join C’Buddy Today ✨
        </Text>
        <Text className="text-sm text-gray-400">
          Create a C&apos;Buddy account to track your meals, stay active, and
          achieve your health goals.
        </Text>
      </View>

      {/* login form */}
      <View className="w-full flex-col justify-between items-center gap-8">
        <View className="w-full px-4">
          <CustomInput label="Email" Icon={<EnvelopeIcon size={24} color="#999" weight="light" />} placeholder="Email" />
          <PasswordInput label="Password" placeholder="Password"/>
        </View>

        <Text className="text-sm">Need an account ? <Text className="text-blue-500">Sign up</Text></Text>
      </View>

      {/* other login option btn */}
      <View className="w-full">
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-gray-300"/>
          <Text className="mx-3 text-gray-300 font-medium">or continue with</Text>
          <View className="flex-1 h-[1px] bg-gray-300"/>
        </View>
        <View className="w-full flex flex-row justify-center items-center gap-4">
          <View className=" px-6 py-2 border border-gray-300 items-center rounded-full ">
            <GoogleIcon width={24} height={24} />
          </View>
          <View className=" px-6 py-2 border border-gray-300 items-center rounded-full ">
            <AppleIcon width={24} height={24} />
          </View>
          <View className=" px-6 py-2 border border-gray-300 items-center rounded-full ">
            <FacebookIcon width={24} height={24} />
          </View>
        </View>
      </View>

      {/* login btn */}
      <View className="w-full px-[32px]">
        <AuthBtn title="Login" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
