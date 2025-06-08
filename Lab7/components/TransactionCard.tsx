import { toVND } from "@/service";
import { Transaction } from "@/type";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const TransactionCard = (transaction: Transaction) => {
  const dateTime =
    new Date(transaction.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }) +
    " " +
    new Date(transaction.createdAt).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/transaction/detail?id=${transaction._id}`)}
    >
      <View style={styles.customerInfo}>
        <Text
          numberOfLines={1}
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 9,
          }}
        >
          {transaction.id} - {dateTime}
          <Text style={{ color: "red" }}>
            -{transaction.status.toUpperCase()}
          </Text>
        </Text>
        <View style={styles.serviceContainer}>
          <FlatList
            data={transaction.services}
            renderItem={(item) => (
              <Text numberOfLines={1} style={{ fontSize: 10 }}>
                - {item.item.name}
              </Text>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
        <Text style={{ color: "gray", fontSize: 11 }}>
          Customer : {transaction.customer.name}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Text style={{ color: "#EF506B", fontSize: 9, fontWeight: "900" }}>
          {toVND(transaction.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    height: "auto",
    width: "95%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  customerInfo: {
    width: "78%",
  },
  label: {
    color: "gray",
    fontSize: 11,
  },
  price: {
    color: "#EF506B",
    fontWeight: "bold",
  },
  iconContainer: {
    flex: 1,
    width: "3%",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceContainer: {
    width: "100%",
    height: "auto",
    paddingVertical: 5,
    marginBottom: 5,
    maxHeight: 70,
  },
});
