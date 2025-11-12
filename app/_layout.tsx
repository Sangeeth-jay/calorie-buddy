import "../global.css";
import { Stack } from "expo-router";
import { SetupProvider } from "./context/SetupContext";

export default function RootLayout() {
  return (
    <SetupProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="info" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(setup-screens)" />
        <Stack.Screen name="(after-setup-screens)" />
        <Stack.Screen name="(main-screens)" />
        <Stack.Screen name="(after-main-screens)" />
      </Stack>
    </SetupProvider>
  );
}
