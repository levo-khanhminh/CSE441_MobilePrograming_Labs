import CustomerCard from "@/components/CustomerCard";
import { Customer } from "@/type";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";

const CustomerScreen = () => {
  async function fetchCustomerData() {
    try {
      const res = await axios.get(
        "https://kami-backend-5rs0.onrender.com/customers"
      );
      setCustomers(res.data);
    } catch (error: any) {
      Alert.alert("Error : " + error.message);
    }
  }
  useEffect(() => {
    fetchCustomerData();
  }, []);
  const [customers, setCustomers] = useState<Customer[]>([]);
  return (
    <View style={styles.container}>
      <View style={styles.customerContainer}>
        <FlatList
          data={customers}
          renderItem={(item) => <CustomerCard {...item.item} />}
          keyExtractor={(item) => item._id}
        />
      </View>
      <View
        style={{
          alignItems: "flex-end",
          width: "100%",
          paddingHorizontal: 30,
          paddingTop: 40,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#EF506B",
            padding: 5,
            borderRadius: "50%",
          }}
          onPress={() => router.push("/customer/add-customer")}
        >
          <Icon source="plus" size={40} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  customerContainer: {
    paddingHorizontal: 30,
    width: "100%",
    height: "85%",
  },
});
