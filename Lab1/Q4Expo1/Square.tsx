import {Alert, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {styles} from './style.ts';
interface Props {
  text: string;
}
function ClickOnTheSquare(text: string) {
  Alert.alert(text);
}
const Square = ({text}: Props) => {
  return (
    <View style={[styles.box, {backgroundColor: '#f8f8f8'}]}>
      <Text>{text}</Text>
      <Button title="Click" onPress={() => ClickOnTheSquare(text)} />
    </View>
  );
};

export default Square;
