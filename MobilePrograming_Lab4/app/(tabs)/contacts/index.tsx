import ContactListItem from "@/components/ContactListItem";
import { Contact } from "@/modules/type";
import { fetchContactsSuccess, useAppDispatch } from "@/Store";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then((res) => res.json())
      .then((d) => {
        setContacts(d.results);
        dispatch(fetchContactsSuccess(d.results));
      })
      .catch((err) => console.log(err));
  }, []);
  const [contacts, setContacts] = useState<Contact[]>();

  function handleClickContactCard(email: string) {
    router.push(`/contacts/details?email=${email}`);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.login.uuid}
        renderItem={(item) => (
          <ContactListItem
            name={item.item.name.first + " " + item.item.name.last}
            avatar={item.item.picture.large}
            phone={item.item.phone}
            onPress={() => handleClickContactCard(item.item.email)}
          />
        )}
      />
      {/* <ContactListItem
        name="khanh minh"
        avatar="haha.png"
        phone="123"
        onPress={() => console.log("Pressed")}
      /> */}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
  },
});
