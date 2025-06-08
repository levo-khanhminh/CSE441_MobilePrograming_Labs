import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const CustomerLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Customer",
          headerShown: true,
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#EF506B",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="add-customer"
        options={{
          title: "Customer",
          headerShown: true,
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#EF506B",
          },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
};

export default CustomerLayout;

const styles = StyleSheet.create({});
