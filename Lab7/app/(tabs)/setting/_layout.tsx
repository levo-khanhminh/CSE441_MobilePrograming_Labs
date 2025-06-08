import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const SettingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default SettingLayout;

const styles = StyleSheet.create({});
