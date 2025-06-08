import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";

const HeaderDropdown = ({ id }: { id: string }) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const handleDeleteCustomer = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const { token } = JSON.parse(userString);
        // Alert.alert(token);
        const response = await axios.delete(
          "https://kami-backend-5rs0.onrender.com/customers/" + id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Succesfully delete customer");
        router.push("/(tabs)/customer");
      } else {
        Alert.alert(
          "Permission Denied : You must be authenticated to proceed this action"
        );
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].msg;
        Alert.alert("Error", errorMessage);
      } else {
        Alert.alert("Error", error.message || "An unknown error occurred");
      }
    }
  };
  const handleSelect = (action: "edit" | "delete") => {
    setVisible(false);
    if (action === "edit") {
      router.push(`/(tabs)/customer/edit-customer?id=${id}`);
    } else if (action === "delete") {
      Alert.alert(
        "Alert ",
        "Are you sure remove this client? This will not be possible to return ",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              handleDeleteCustomer();
            },
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Icon source="dots-vertical" color="white" size={24} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        {/* Click anywhere to close */}
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("edit")}
            >
              <Icon source="pencil" size={18} color="red" />
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("delete")}
            >
              <Icon source="delete" size={18} color="gray" />
              <Text style={[styles.optionText, { color: "gray" }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    top: 20,
    right: 5,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: 200,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "red",
  },
});

export default HeaderDropdown;
