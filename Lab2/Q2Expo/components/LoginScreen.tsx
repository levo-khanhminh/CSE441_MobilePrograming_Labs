import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from  "../css/styles"
const LoginScreen = () => {
  return (
   <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput placeholder='Phone' style={styles.input}/>
          <TextInput placeholder='Password' secureTextEntry style={styles.input}/>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
      </View>

   </ScrollView>
  )
}

export default LoginScreen

