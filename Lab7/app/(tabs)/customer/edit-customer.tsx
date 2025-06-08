import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EditCustomerScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const fetchCustomerDetail = async () => {
    try {
      const res = await axios.get(
        "https://kami-backend-5rs0.onrender.com/customers/" + id
      );
      setName(res.data.name);
      setPhone(res.data.phone);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  useEffect(() => {
    fetchCustomerDetail();
  }, []);
  const { id } = useLocalSearchParams();

  async function handleUpdateCustomer() {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const { token } = JSON.parse(userString);
        // Alert.alert(token);
        const response = await axios.put(
          "https://kami-backend-5rs0.onrender.com/customers/" + id,
          {
            name,
            phone,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Succesfully update customer");
        router.push("/customer");
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Customer</Text>
      <View style={{ width: "100%", marginBottom: 15 }}>
        <Text>Customer name*</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Customer name..."
          style={styles.input}
        />
      </View>
      <View style={{ width: "100%" }}>
        <Text>Phone</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone ...."
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleUpdateCustomer} style={styles.button}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EF506B",
    marginBottom: 24,
    marginTop: 72,
  },
  input: {
    borderColor: "#EF506B",
    borderWidth: 1,
    width: "100%",
    marginTop: 12,
    borderRadius: 10,
    paddingLeft: 12,
  },
  button: {
    backgroundColor: "#EF506B",
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
