import { toVND } from "@/service";
import { Customer } from "@/type";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
const CustomerCard = ({ _id, name, phone, totalSpent, loyalty }: Customer) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.customerInfo}>
        <Text style={styles.label}>
          Customer : <Text style={{ color: "black" }}>{name || "Hung"}</Text>
        </Text>
        <Text style={styles.label}>
          Phone : <Text style={{ color: "black" }}>{phone || "123"}</Text>
        </Text>
        <Text style={styles.label}>
          Total Money : <Text style={styles.price}> {toVND(totalSpent)}</Text>
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon source="crown" size={40} color="#EF506B" />
        <Text style={{ color: "#EF506B", fontSize: 11 }}>
          {loyalty === "normal" ? "Guest" : "Member"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    height: "auto",
    width: "90%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  customerInfo: {
    width: "70%",
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
    width: "25%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
