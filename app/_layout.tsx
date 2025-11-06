import "../global.css";
import { Stack } from "expo-router";
import { SetupProvider } from "./context/SetupContext";

export default function RootLayout() {
  return (
    <SetupProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(main-screens)" />
      </Stack>
    </SetupProvider>
  );
}
