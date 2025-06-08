import { Transaction } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

const HeaderDropdownTransaction = ({ id }: { id: string }) => {
  const [visible, setVisible] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();
  const router = useRouter();
  const fetchTransaction = async () => {
    try {
      const res = await axios.get(
        "https://kami-backend-5rs0.onrender.com/transactions/" + id
      );
      setTransaction(res.data);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  useEffect(() => {
    fetchTransaction();
  }, []);

  async function handleCancelTransaction() {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const { token } = JSON.parse(userString);

        const response = await axios.put(
          "https://kami-backend-5rs0.onrender.com/transactions/" + id,
          { ...transaction, status: "Cancelled" },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Succesfully update customer");
        router.push("/(tabs)/transaction");
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
  }
  const handleSelect = (action: "see-more-details" | "cancel-transaction") => {
    setVisible(false);
    if (action === "see-more-details") {
      router.push(`/(tabs)/customer/edit-customer?id=${id}`);
    } else if (action === "cancel-transaction") {
      Alert.alert("Alert ", "Are you sure to cancel the transaction ", [
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
            handleCancelTransaction();
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
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
              onPress={() => handleSelect("see-more-details")}
            >
              <Icon source="pencil" size={18} color="red" />
              <Text style={styles.optionText}>See more details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("cancel-transaction")}
            >
              <Icon source="delete" size={18} color="gray" />
              <Text style={[styles.optionText, { color: "gray" }]}>Cancel</Text>
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

export default HeaderDropdownTransaction;
