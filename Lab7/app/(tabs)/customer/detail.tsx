import HeaderDropdown from "@/components/HeaderDropdown";
import TransactionCard from "@/components/TransactionCard";
import { toVND } from "@/service";
import { CustomerDetail } from "@/type";
import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

const CustomerDetailScreen = () => {
  const navigation = useNavigation();

  const { id } = useLocalSearchParams();
  const normalizedId = Array.isArray(id) ? id[0] : id ?? "unknown-id";
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Customer Detail",
      headerShown: true,
      headerTitleStyle: {
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#EF506B",
      },
      headerTintColor: "white",
      headerRight: () => <HeaderDropdown id={normalizedId} />,
    });
  }, []);

  const fetchCustomerDetail = async () => {
    try {
      const res = await axios.get(
        "https://kami-backend-5rs0.onrender.com/customers/" + id
      );
      setCustomerDetail(res.data);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  useEffect(() => {
    fetchCustomerDetail();
  }, []);
  const [customerDetail, setCustomerDetail] = useState<CustomerDetail>();
  let dateTime = customerDetail
    ? new Date(customerDetail.updatedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }) +
      " " +
      new Date(customerDetail.updatedAt).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString();

  return (
    <SafeAreaView style={styles.container}>
      {/* General Information */}
      <Card style={[styles.card]}>
        <Card.Content>
          <Text style={styles.sectionTitle}>General information</Text>
          <Text style={{ fontSize: 11 }}>
            Name <Text style={styles.bold}>{customerDetail?.name}</Text>
          </Text>
          <Text style={{ fontSize: 11 }}>
            Phone:
            <Text style={styles.bold}>{customerDetail?.phone}</Text>
          </Text>
          <Text style={{ fontSize: 11 }}>
            Total Spent:{" "}
            <Text style={styles.bold}>
              {toVND(customerDetail?.totalSpent || 0)}
            </Text>
          </Text>
          <Text style={{ fontSize: 11 }}>
            Time: <Text style={styles.bold}>{dateTime}</Text>
          </Text>
          <Text style={{ fontSize: 11 }}>
            LastTime: <Text style={styles.bold}>{dateTime}</Text>
          </Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { maxHeight: 500 }]}>
        <Card.Content
          style={{
            width: "100%",
            paddingHorizontal: 0,
            maxHeight: 460,
            marginHorizontal: 0,
            marginLeft: 10,
          }}
        >
          <Text style={styles.sectionTitle}>Transaction History</Text>

          <FlatList
            data={customerDetail?.transactions}
            renderItem={(item) => <TransactionCard {...item.item} />}
            keyExtractor={(item) => item._id}
          />
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

export default CustomerDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    fontSize: 11,
  },
  card: {
    marginBottom: 20,
    borderRadius: 8,
    elevation: 2,
    fontSize: 11,
    width: "100%",
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
