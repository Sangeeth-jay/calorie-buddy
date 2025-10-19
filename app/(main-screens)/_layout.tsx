import { Tabs } from "expo-router";
import { House, BowlSteam, ChartLineIcon, UserIcon } from "phosphor-react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false,}}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <House
              size={24}
              color={color}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="diet"
        options={{
          tabBarLabel: "Diet",
          tabBarIcon: ({ color, focused }) => (
            <BowlSteam size={24} color={color} weight={focused ? "fill" : "regular"}/>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarLabel: "Progress",
          tabBarIcon: ({ color, focused }) => (
            <ChartLineIcon size={24} color={color} weight={focused ? "fill" : "regular"}/>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "My Profile",
          tabBarIcon: ({ color, focused }) => (
            <UserIcon size={24} color={color} weight={focused ? "fill" : "regular"}/>
          ),
        }}
      />
    </Tabs>
  );
}
