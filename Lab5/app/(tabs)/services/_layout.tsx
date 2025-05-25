import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

const ServiceLayout = () => {
  const headerStyle = {
    headerTitle: "Service",
    headerShown: true,
    headerTitleStyle: {
      color: "white",
    },
    headerStyle: {
      backgroundColor: "#EF506B",
    },
    headerTintColor: "white",
  };
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-service"
          options={{
            headerTitle: "Service",
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
          name="detail"
          options={{ ...headerStyle, headerTitle: "Service Detail" }}
        />
        {/* <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerTitle: "Home",
        }}
      /> */}
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
      <StatusBar style="light" />
    </>
  );
};

export default ServiceLayout;

const styles = StyleSheet.create({});
