import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";

type ContactThumProps = {
  name: string | undefined;
  phone: string | undefined;
  avatar: string;
  textColor: string;
  onPress?: () => void;
};
const ContactThum = ({
  name,
  phone,
  avatar,
  onPress,
  textColor,
}: ContactThumProps) => {
  const colorStyle = {
    color: textColor,
  };
  const ImageContact = onPress ? TouchableOpacity : View;
  return (
    <View style={styles.container}>
      <ImageContact onPress={onPress}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        {name !== "" && <Text style={[styles.name, colorStyle]}>{name}</Text>}
        {phone !== "" && (
          <View style={styles.phoneSection}>
            <Icon source="phone" size={16} color={textColor} />
            <Text style={[styles.phone, colorStyle]}>{phone}</Text>
          </View>
        )}
      </ImageContact>
    </View>
  );
};

export default ContactThum;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 25,
    marginHorizontal: 15,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    height: 320,
    borderRadius: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "white",
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 2,
    fontWeight: "bold",
  },
  phoneSection: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
});
