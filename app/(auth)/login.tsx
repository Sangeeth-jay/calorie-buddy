import { signInWithGoogle } from "@/src/services/auth/googleOAuth";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EnvelopeIcon } from "phosphor-react-native";
import AuthBtn from "../../components/AuthBtn";
import CustomInput from "../../components/CustomInput";
import PasswordInput from "../../components/PasswordInput";

import GoogleIcon from "../../assets/icons/socialMedia/google.svg";
// import AppleIcon from "../../assets/icons/socialMedia/apple.svg";
import { signInWithEmail } from "@/src/services/auth/authService";
import { useRouter } from "expo-router";
import FacebookIcon from "../../assets/icons/socialMedia/facebook.svg";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = async () => {
    try {
      await signInWithEmail(email, password);
      router.replace("/");
    } catch (e: any) {
      setError(e.message);
    }
  };

  //SSO-google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Google sign-in failed");
    }
  };

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
          <CustomInput
            label="Email"
            Icon={<EnvelopeIcon size={24} color="#999" weight="light" />}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            error={error}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            error={error}
          />
          {error && <Text className="text-red-500 text-center">{error}</Text>}
        </View>

        <Text className="text-sm">
          Need an account ?{" "}
          <Text
            className="text-blue-500"
            onPress={() => {
              router.replace("/sign-up");
            }}
          >
            Sign up
          </Text>
        </Text>
      </View>

      {/* other login option btn */}
      <View className="w-full">
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-gray-300" />
          <Text className="mx-3 text-gray-300 font-medium">
            or continue with
          </Text>
          <View className="flex-1 h-[1px] bg-gray-300" />
        </View>
        <View className="w-full flex justify-center items-center gap-4">
          <Pressable
            className=" w-8/12 px-6 py-2 border border-gray-300 flex-row gap-4 justify-center items-center rounded-full "
            onPress={handleGoogleSignIn}
          >
            <GoogleIcon width={24} height={24} />
            <Text>Sign in with Google</Text>
          </Pressable>
          {/* <Pressable className=" w-8/12 px-6 py-2 border border-gray-300 flex-row gap-4 justify-center items-center rounded-full ">
            <AppleIcon width={24} height={24} />
            <Text>Sign in with Apple</Text>
          </Pressable> */}
          <Pressable
            disabled
            className=" w-8/12 px-6 py-2 border border-gray-300 flex-row gap-4 justify-center items-center rounded-full "
          >
            <FacebookIcon width={24} height={24} />
            <Text>Sign in with Facebook</Text>
          </Pressable>
        </View>
      </View>

      {/* login btn */}
      <View className="w-full px-[32px]">
        <AuthBtn title="Login" onPress={onLogin} loading={false} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
