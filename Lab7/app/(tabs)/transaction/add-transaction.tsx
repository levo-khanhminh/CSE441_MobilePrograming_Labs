import { Customer, Service } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from "react-native-element-dropdown";

type CustomerDropdown = {
  label: string;
  value: string;
};

const executors = [
  { label: "Executor 1", value: "exec1" },
  { label: "Executor 2", value: "exec2" },
];

const AddTransactionScreen = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedServices, setSelectedServices] = useState<any>({});
  const [services, setServices] = useState<Service[]>();
  const [customers, setCustomers] = useState<Customer[]>();
  const handleAddTransaction = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const { token } = JSON.parse(userString);
        // Alert.alert(token);
        const response = await axios.post(
          "https://kami-backend-5rs0.onrender.com/transactions",
          {
            customerId: selectedCustomer,
            services: formattedServices,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Succesfully add service");
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
  };
  const fetchServices = async () => {
    try {
      const res = await axios.get(
        "https://kami-backend-5rs0.onrender.com/services"
      );
      setServices(res.data);
    } catch (error: any) {
      Alert.alert("Error : " + error.message);
    }
  };
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "https://kami-backend-5rs0.onrender.com/customers"
      );
      setCustomers(res.data);
    } catch (error: any) {
      Alert.alert("Error : " + error.message);
    }
  };
  useEffect(() => {
    fetchCustomers();
    fetchServices();
  }, []);
  const customerDropdowns =
    customers?.map((item) => {
      return { label: item.name, value: item._id };
    }) || [];
  const formattedServices = Object.values(selectedServices).map(
    (item: any) => ({
      _id: item._id,
      quantity: item.quantity,
      userId: item.createdBy,
    })
  );
  console.log(formattedServices);
  const toggleService = (service: any) => {
    setSelectedServices((prev: any) => {
      const isSelected = !!prev[service.id];
      if (isSelected) {
        const updated = { ...prev };
        delete updated[service.id];
        return updated;
      } else {
        return {
          ...prev,
          [service._id]: {
            ...service,
            quantity: 1,
            executor: null,
          },
        };
      }
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelectedServices((prev: any) => {
      const updated = { ...prev };
      updated[id].quantity = Math.max(1, updated[id].quantity + delta);
      return updated;
    });
  };

  const updateExecutor = (id: string, value: string) => {
    setSelectedServices((prev: any) => {
      const updated = { ...prev };
      updated[id].executor = value;
      return updated;
    });
  };

  const total = Object.values(selectedServices).reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const limitedServices = services?.slice(0, 6);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Customer *</Text>
      <Dropdown
        style={styles.dropdown}
        data={customerDropdowns}
        labelField="label"
        valueField="value"
        placeholder="Select customer"
        value={selectedCustomer}
        onChange={(item) => setSelectedCustomer(item.value)}
      />

      {services?.map((service) => (
        <View key={service._id} style={{ marginTop: 10 }}>
          <BouncyCheckbox
            isChecked={!!selectedServices[service._id]}
            text={service.name}
            textStyle={{ textDecorationLine: "none" }}
            useBuiltInState={false}
            onPress={() => toggleService(service)}
            fillColor="#F28B54"
          />

          {!!selectedServices[service._id] && (
            <View style={styles.selectedBox}>
              <View style={styles.inlineRow}>
                <TouchableOpacity
                  onPress={() => updateQuantity(service._id, -1)}
                >
                  <Text style={styles.qtyBtn}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNum}>
                  {selectedServices[service._id].quantity}
                </Text>

                <TouchableOpacity
                  onPress={() => updateQuantity(service._id, 1)}
                >
                  <Text style={styles.qtyBtn}>+</Text>
                </TouchableOpacity>

                <Dropdown
                  style={styles.executorDropdownCompact}
                  data={executors}
                  labelField="label"
                  valueField="value"
                  placeholder="Executor"
                  value={selectedServices[service._id].executor}
                  onChange={(item) => updateExecutor(service._id, item.value)}
                />

                <Text style={styles.compactPrice}>
                  {service.price.toLocaleString()} đ
                </Text>
              </View>
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity
        style={styles.summaryBtn}
        onPress={handleAddTransaction}
      >
        <Text style={styles.summaryText}>
          See summary: ({total.toLocaleString()} đ)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f06262",
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  selectedBox: {
    paddingLeft: 10,
    paddingVertical: 8,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    fontSize: 20,
    width: 30,
    textAlign: "center",
    backgroundColor: "#eee",
    borderRadius: 4,
    marginHorizontal: 4,
  },
  qtyNum: {
    fontSize: 16,
    width: 30,
    textAlign: "center",
  },
  executorDropdown: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 4,
  },
  priceText: {
    marginTop: 5,
    fontSize: 14,
  },
  summaryBtn: {
    backgroundColor: "#f06262",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  summaryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },

  executorDropdownCompact: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 4,
    height: 35,
    marginLeft: 4,
  },

  compactPrice: {
    fontSize: 12,
    marginLeft: 6,
    color: "red",
    fontWeight: "bold",
  },
});

export default AddTransactionScreen;
