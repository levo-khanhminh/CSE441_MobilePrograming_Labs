import { Service } from "@/type";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ServiceResponse extends Service {
  user: {
    name: string;
  };
}

const ServiceDetail = () => {
  const { id } = useLocalSearchParams();
  const [service, setService] = useState<ServiceResponse>();
  const toVND = (value: number) => {
    const formatted = new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replace("₫", "")
      .trim();
    return formatted.replace("VND", "đ");
  };
  useEffect(() => {
    axios
      .get("https://kami-backend-5rs0.onrender.com/services/" + id)
      .then((res) => setService(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Service name:</Text>{" "}
          {service?.name || "Chăm sóc da và dưỡng ẩm tự nhiên"}
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Price:</Text>
          {toVND(service?.price || 0)}
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Creator:</Text>
          {service?.user.name}
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Time:</Text>
          {new Date(service?.createdAt || "").toLocaleString()}
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Final Update:</Text>
          {new Date(service?.updatedAt || "").toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
