import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

type DetailListItemProps = {
  icon: string;
  title: string;
  subTitle: string | undefined;
};

const DetailListItem = ({ icon, title, subTitle }: DetailListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.contactInfo}>
        <Icon source={icon} color="black" size={30} />
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 40,
  },
  contactInfo: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 60,
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  details: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 25,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitle: {
    color: "blue",
    fontSize: 14,
    marginTop: 4,
  },
});
