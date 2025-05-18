import { useAppSelector } from "@/Store";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Favourite = () => {
  const router = useRouter();
  const contacts = useAppSelector((state) => state.contacts);
  return (
    <View style={styles.container}>
      {/* <Text>Hahah</Text> */}
      <View
        style={{
          backgroundColor: "#f8f8f8",
          flexDirection: "row",
          height: "100%",
          flexWrap: "wrap",
          rowGap: 20,
        }}
      >
        {contacts
          .filter((item) => item.favourite)
          .map((item) => (
            <TouchableOpacity
              key={item.email}
              onPress={() => {
                console.log("Press contact image");
                router.push(`/favourite/details?email=${item.email}`);
              }}
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: item.picture.large }}
                  style={styles.avatar}
                />
              </View>
            </TouchableOpacity>
          ))}
        {/* <FlatList
          data={contacts.filter((item) => item.favourite)}
          renderItem={({ item }) => (
           
          )}
          horizontal={true}
          keyExtractor={(item) => item.email}
        /> */}
      </View>
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // paddingTop: 100,
    // flexDirection: "row",
    marginTop: 20,
    // backgroundColor: "red",
    width: "100%",
    // height: 130,
    height: "100%",
  },
  name: {
    color: "#111",
  },
  avatarContainer: {
    width: "33%",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "white",
    borderWidth: 2,
  },
});
