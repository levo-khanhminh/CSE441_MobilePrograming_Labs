import HeaderDropdownTransaction from "@/components/HeaderDropdownTransaction";
import { toVND } from "@/service";
import { Transaction } from "@/type";
import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

const TransactionDetailScreen = () => {
  const navigation = useNavigation();
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
  const [transaction, setTransaction] = useState<Transaction>();
  const { id } = useLocalSearchParams();
  const normalizedId = Array.isArray(id) ? id[0] : id ?? "unknown-id";
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Transaction Detail",
      headerShown: true,
      headerTitleStyle: {
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#EF506B",
      },
      headerTintColor: "white",
      headerRight: () => <HeaderDropdownTransaction id={normalizedId} />,
    });
  }, []);
  let dateTime = transaction
    ? new Date(transaction.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }) +
      " " +
      new Date(transaction.createdAt).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString();
  const totalPrice: number | undefined = transaction?.services.reduce(
    (acc, current): number => {
      return acc + current.price * current.quantity;
    },
    0
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* General Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>General information</Text>
          <Text style={{ fontSize: 11 }}>
            Transaction code: <Text style={styles.bold}>{transaction?.id}</Text>
          </Text>
          <Text style={{ fontSize: 11 }}>
            Customer:{" "}
            <Text style={styles.bold}>
              {transaction?.customer.name} -{transaction?.customer.phone}
            </Text>
          </Text>
          <Text style={{ fontSize: 11 }}>
            Creation time: <Text style={styles.bold}>{dateTime}</Text>
          </Text>
        </Card.Content>
      </Card>

      {/* Services List */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Services list</Text>

          <FlatList
            data={transaction?.services}
            renderItem={(item) => (
              <View style={styles.row}>
                <Text style={styles.wrapText}>{item.item.name}</Text>
                <Text style={{ fontSize: 11, color: "gray", marginRight: 15 }}>
                  x{item.item.quantity}
                </Text>
                <Text style={{ fontSize: 11 }}>{toVND(item.item.price)}</Text>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />

          <Divider style={styles.divider} />
          <Text style={styles.totalText}>Total: {toVND(totalPrice || 0)}</Text>
        </Card.Content>
      </Card>

      {/* Cost */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Cost</Text>
          <View style={styles.row}>
            <Text style={{ fontSize: 11 }}>Amount of money</Text>
            <Text style={{ fontSize: 11 }}>{toVND(totalPrice || 0)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ fontSize: 11 }}>Discount</Text>
            <Text style={{ fontSize: 11 }}>{toVND(0)}</Text>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.totalPayment}>
            Total payment: {toVND(totalPrice || 0)}
          </Text>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    fontSize: 11,
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    fontSize: 11,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e91e63",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 11,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    fontSize: 11,
  },
  wrapText: {
    flex: 1,
    marginRight: 8,
    fontSize: 11,
  },
  totalText: {
    marginTop: 8,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 11,
  },
  totalPayment: {
    marginTop: 10,
    textAlign: "left",
    fontSize: 11,
    fontWeight: "bold",
    color: "#e91e63",
  },
  divider: {
    marginVertical: 8,
  },
});
