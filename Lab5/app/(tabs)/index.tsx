import { Image, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}>
          Huyền Trinh
        </Text>
        <View style={styles.avatar}>
          <Icon source="account" size={40} color={"white"} />
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={{ width: "100%", height: 300 }}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB6cWl_ybQzuxCE7VQ4Qm_KIsBVPDyW9vRiQ&s",
          }}
        />
      </View>
      <Text style={styles.title}>Homepage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    backgroundColor: "#EF506B",

    height: 70,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
    height: 100,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EF506B",
    marginBottom: 24,
    // marginTop: 72,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "gray",
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
});
