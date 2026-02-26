import { Stack } from "expo-router";
import "../global.css";
import { SetupProvider } from "../src/context/SetupContext";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/ToastConfig";
import NoInternetBanner from "@/components/NoInternetBanner";

export default function RootLayout() {
  return (
    <SetupProvider>
      <NoInternetBanner/>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast config={toastConfig}/>
    </SetupProvider>
  );
}
