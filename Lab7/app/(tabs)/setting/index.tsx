import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SettingScreen = () => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      router.push("/");
    } catch (error) {}
  };
  return (
    <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: "#EF506B",
    borderRadius: 10,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 16,
    marginLeft: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
