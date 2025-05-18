import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

type ContactListItemProps = {
  name: string;
  avatar: string;
  phone: string;
  onPress: () => void;
};

const ContactListItem = ({
  name,
  avatar,
  phone,
  onPress,
}: ContactListItemProps) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.container}
      underlayColor="grey"
    >
      <View style={styles.contactInfo}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{phone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 50,
    marginTop: 0,
  },
  contactInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
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
