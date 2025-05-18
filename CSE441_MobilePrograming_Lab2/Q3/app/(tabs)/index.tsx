import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [income, setIncome] =  useState('');
  const [tax, setTax] =  useState('');
  const calculateTax  = () => {
    const incomeAmount  = parseFloat(income);
    if(isNaN(incomeAmount) || incomeAmount < 0){
       setTax("Invalid income");
       return;
    }
    let taxAmount = 0;
    if(incomeAmount <= 10000000){
      taxAmount  =  incomeAmount * 0.1;
    }else if(incomeAmount <= 50000000){
      taxAmount  = 10000000 * 0.1  + (incomeAmount  - 10000) *0.2;
    }else{
      taxAmount =  10000000 * 0.1 + 40000000 * 0.2 + (incomeAmount  - 50000000) * 0.3;
    };
    setTax(`Income Tax : ${taxAmount.toFixed(2)}đ`)

  }
  return (
        <View  style={styles.container}>
          <Text>Income Tax Calculator</Text>
          <TextInput  textAlign='center'  style={styles.input} 
          placeholder='Enter your income'  keyboardType='numeric' value={income} onChangeText={text =>  setIncome(text)}/>
          <Button title="Caculate Tax" onPress={calculateTax}/>
            <Text style={styles.result}>{tax}</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex :1,
    justifyContent:"center",
    alignItems :"center",
    padding :16,
  },
  title :  {
    fontSize : 20,
    marginBottom:10,
  },
  input: {
    width:200,
    height :40,
    borderColor :"gray",
    borderWidth:1,
    marginBottom :10,
    padding :10,
  },
  result : {
    marginTop : 20,
    fontSize  : 16,
  }
});
