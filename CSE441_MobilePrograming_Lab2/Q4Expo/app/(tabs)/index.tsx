import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Person {
  name: string;
  age: number;
}
interface Product {
  name: string;
  price: number;
  quantity: number;
}
export default function HomeScreen() {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState("");
  // Function to handle number inputs
  const handleNumberInput = (num: string) => {
    if (displayValue === "0") {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorInput = (operator: string | null) => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue("0");
  };
  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);
    if (operator === "+") {
      setDisplayValue((num1 + num2).toString());
    } else if (operator === "-") {
      setDisplayValue((num1 - num2).toString());
    } else if (operator === "*") {
      setDisplayValue((num1 * num2).toString());
    } else if (operator === "/") {
      setDisplayValue((num1 / num2).toString());
    }
    setOperator(null);
    setFirstValue("");
  };
  // Function to handle clear button press
  const handleClear = () => {
    setDisplayValue("0");
    setOperator(null);
    setFirstValue("");
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.displayValue}>{displayValue}</Text>
      </View>
      <View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberInput("7")}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberInput("8")}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberInput("9")}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.operatorButton}
            onPress={() => handleOperatorInput("/")}
          >
            <Text style={styles.operatorButtonText}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberInput("4")}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberInput("5")}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberInput("6")}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.operatorButton}
            onPress={() => handleOperatorInput("*")}
          >
            <Text style={styles.operatorButtonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberInput("1")}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberInput("2")}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberInput("3")}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.operatorButton}
            onPress={() => handleOperatorInput("-")}
          >
            <Text style={styles.operatorButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberInput("0")}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.operatorButton}
            onPress={() => handleOperatorInput("+")}
          >
            <Text style={styles.operatorButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={handleEqual}>
            <Text style={styles.operatorButtonText}>=</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.operatorButton,
              { flex: 1, backgroundColor: "gray" },
            ]}
            onPress={() => handleClear()}
          >
            <Text style={styles.operatorButtonText}>C</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  displayValue: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    columnGap: 9,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  operatorButton: {
    backgroundColor: "#ff9501",
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  },
  operatorButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
