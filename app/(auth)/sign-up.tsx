import { View, Text, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";

import { EnvelopeIcon } from "phosphor-react-native";
import CustomInput from "../../components/CustomInput";
import PasswordInput from "../../components/PasswordInput";
import AuthBtn from "../../components/AuthBtn";

import GoogleIcon from "../../assets/icons/socialMedia/google.svg";
// import AppleIcon from "../../assets/icons/socialMedia/apple.svg";
import FacebookIcon from "../../assets/icons/socialMedia/facebook.svg";
import { useRouter } from "expo-router";
import { supabase } from "@/src/lib/supabase";

const Signup = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState('');

  const onSignUp = async (email: string, password: string) => {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
    });

    if(error){
      console.log("sign error : ", error);
      setError(error.message);};

    console.log("Succes : ", data.session);

    if(data.session?.access_token) router.replace("/");

  };

  //SSO-google
    const handleGoogleSignOn = async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
  
      if (error) {
        console.log("Google SSO error : ", error);
        Alert.alert("Error", error.message);
        return;
      }
  
      console.log("Google SSO Success : ", data);
      router.replace("/");
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
      <View className="w-full flex-col justify-between items-center gap-2">
        <View className="w-full px-4">
          <CustomInput
            label="Email"
            Icon={<EnvelopeIcon size={24} color="#999" weight="light" />}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            error={error}
          />
          <PasswordInput label="Password" placeholder="Password" onChangeText={setPassword} value={password} error={error}/>
          {error && <Text className="text-red-500 text-center">{error}</Text>}
        </View>
        <View className="flex-row items-center font-thin gap-2 mb-8">
          <Checkbox className=""  onValueChange={setCheckbox} value={checkbox}/>
          <Text className="text-sm">
            I agree to C&apos;Buddy{" "}
            <Text className="text-blue-500">Terms & Conditions.</Text>
          </Text>
        </View>
        <Text className="text-sm">
          Already have an account?{" "}
          <Text className="text-blue-500" onPress={() => {router.replace("/login")}}>Log in</Text>
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
          <Pressable className=" w-8/12 px-6 py-2 border border-gray-300 flex-row gap-4 justify-center items-center rounded-full " onPress={handleGoogleSignOn}>
            <GoogleIcon width={24} height={24} />
            <Text>Sign in with Google</Text>
          </Pressable>
          {/* <Pressable className=" w-8/12 px-6 py-2 border border-gray-300 flex-row gap-4 justify-center items-center rounded-full ">
            <AppleIcon width={24} height={24} />
            <Text>Sign in with Apple</Text>
          </Pressable> */}
          <Pressable disabled className=" w-8/12 px-6 py-2 border border-gray-300 flex-row gap-4 justify-center items-center rounded-full ">
            <FacebookIcon width={24} height={24} />
            <Text>Sign in with Facebook</Text>
          </Pressable>
        </View>
      </View>

      {/* sign btn */}
      <View className="w-full px-[32px]">
        <AuthBtn disabled={!checkbox} title="Sign Up" onPress={() => onSignUp(email, password)} loading={false}/>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
