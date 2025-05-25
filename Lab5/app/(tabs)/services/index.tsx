import ServiceCard from "@/components/ServiceCard";
import { Service, User } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";
export default function HomeScreen() {
  const [user, setUser] = useState<User>();
  const [services, setServices] = useState<Service[]>();
  const router = useRouter();
  useEffect(() => {
    try {
      axios
        .get("https://kami-backend-5rs0.onrender.com/services")
        .then((res) => {
          setServices(res.data);
        });
      getUserAndToken();
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }, []);
  async function getUserAndToken() {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        setUser(JSON.parse(userString));
        Alert.alert(user?.token || "");
      } else {
        Alert.alert("Erorr with  json string");
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }
  return (
    <View style={styles.container}>
      {/* Header Part */}
      <View style={styles.headerContainer}>
        <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}>
          {user?.name}
        </Text>
        <View style={styles.avatar}>
          <Icon source="account" size={30} color={"gray"} />
        </View>
      </View>
      {/* Logo Part */}
      <View style={styles.logoContainer}>
        <Image
          style={{
            width: "100%",
            height: 200,
            backgroundColor: "#fff",
            padding: 40,
          }}
          source={require("@/assets/images/spa-icon.jpg")}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.bodyHeader}>
          <View>
            <Text style={styles.bodyTitle}>Danh sách dịch vụ</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#EF506B",
                padding: 5,
                borderRadius: "50%",
              }}
              onPress={() => router.push("/services/add-service")}
            >
              <Icon source="plus" size={25} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Render Service Component  */}
        <FlatList
          data={services}
          renderItem={(item) => (
            <ServiceCard
              price={item.item.price}
              name={item.item.name}
              _id={item.item._id}
            />
          )}
          keyExtractor={(item) => item._id}
        />
        {/* <ServiceCard
          name={"Chăm sóc da mặt và dưỡng ẩm tự nhiên"}
          price={250000}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#EF506B",

    paddingTop: 30,
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    // alignItems: "center",
    // width: "100%",
    // height: 100,
    backgroundColor: "gray",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EF506B",
    marginBottom: 24,

    // marginTop: 72,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#fff",
    padding: 5,
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
  body: {
    flex: 1,
    padding: 15,
  },
  bodyHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bodyTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
