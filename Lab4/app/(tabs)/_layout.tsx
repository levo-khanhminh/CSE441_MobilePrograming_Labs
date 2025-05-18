import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import BlurTabBarBackground from "@/components/ui/TabBarBackground.ios";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-paper";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#111",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: BlurTabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            backgroundColor: "blue",
            padiding: 15,
            height: 60,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contact",
          tabBarIcon: ({ color }) => (
            <Icon source="menu" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: "Favourite",
          tabBarIcon: ({ color }) => (
            <Icon source="star-check-outline" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
