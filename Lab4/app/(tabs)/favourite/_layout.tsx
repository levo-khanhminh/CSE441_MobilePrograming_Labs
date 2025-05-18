import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Favourite",
          statusBarHidden: true,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerShown: true,
          headerTitle: "Card Profile",
          statusBarHidden: true,
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
