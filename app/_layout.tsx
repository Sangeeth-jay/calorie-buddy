import { Stack } from "expo-router";
import "../global.css";
import { SetupProvider } from "../src/context/SetupContext";

export default function RootLayout() {
  return (
    <SetupProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SetupProvider>
  );
}
