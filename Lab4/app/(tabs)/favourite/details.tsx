import ContactThum from "@/components/ContactThum";
import DetailListItem from "@/components/DetailListItem";
import {
  updateContactFavourite,
  useAppDispatch,
  useAppSelector,
} from "@/Store";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

const details = () => {
  const { email } = useLocalSearchParams();
  const contacts = useAppSelector((state) => state.contacts);
  const dispatch = useAppDispatch();
  const contact = contacts.find((item) => item.email === email);
  const fullname = contact?.name.first + " " + contact?.name.last;
  console.log(contact?.email);
  return (
    <View>
      <View style={styles.detailSections}>
        <ContactThum
          name={fullname}
          phone={contact?.phone || ""}
          avatar={contact?.picture.large || ""}
          textColor="white"
        />
        <DetailListItem icon="email" title="Email" subTitle={contact?.email} />
        <DetailListItem icon="phone" title="Work" subTitle={contact?.phone} />
        <DetailListItem
          icon="phone"
          title="Personal"
          subTitle={contact?.cell}
        />
        <View style={{ alignItems: "center" }}>
          <IconButton
            onPress={() => {
              console.log("Pressed !!!!!");
              dispatch(
                updateContactFavourite({
                  email: contact?.email || "",
                  favourite: !contact?.favourite,
                })
              );
            }}
            icon={`${contact?.favourite ? "star-check" : "star-check-outline"}`}
            iconColor="#663399"
            size={30}
          ></IconButton>
        </View>
      </View>
    </View>
  );
};

export default details;

const styles = StyleSheet.create({
  detailSections: {
    flex: 1,
    backgroundColor: "white",
  },
});
