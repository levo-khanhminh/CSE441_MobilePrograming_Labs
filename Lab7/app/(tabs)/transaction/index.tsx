import TransactionCard from "@/components/TransactionCard";
import { Transaction } from "@/type";
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

const TransactionScreen = () => {
  async function fetchCustomerData() {
    try {
      const res = await axios.get(
        "https://kami-backend-5rs0.onrender.com/transactions"
      );
      setTransactions(res.data);
    } catch (error: any) {
      Alert.alert("Error : " + error.message);
    }
  }
  useEffect(() => {
    fetchCustomerData();
  }, []);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <View style={styles.container}>
      <View style={styles.transactionContainer}>
        <FlatList
          data={transactions}
          renderItem={(item) => <TransactionCard {...item.item} />}
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
            bottom: 60,
            right: 30,
            position: "absolute",
          }}
          onPress={() => router.push("/transaction/add-transaction")}
        >
          <Icon source="plus" size={40} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  transactionContainer: {
    width: "100%",
    height: "100%",
    marginLeft: 10,
    position: "relative",
  },
});
