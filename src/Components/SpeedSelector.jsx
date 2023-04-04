import { Text, View, Pressable } from "react-native";
import { Button } from "@react-native-material/core";
import { useState } from "react";

export default function SpeedSelector({ setKmh }) {
  const [buttonPressed, setButtonPressed] = useState({
    buttonOne: { backgroundColor: "green", margin: 3 },
    buttonTwo: { backgroundColor: "green", margin: 3 },
    buttonThree: { backgroundColor: "green", margin: 3 },
  });

  const handleSpeedSelection = (speed) => {
    this.style = { backgroundColor: "black" };
    if (speed === "slow") setKmh(3);
    else if (speed === "medium") setKmh(4.5);
    else if (speed === "fast") setKmh(6);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, padding: 15, textAlign: "center" }}>
        How fast do you walk? 
      </Text>
      <View style={{ flexDirection: "row", padding: 5 }}>
        <Button
          style={buttonPressed.buttonOne}
          title="slow 🐢"
          onPress={() => {
            handleSpeedSelection("slow");
            setButtonPressed({
              buttonOne: { backgroundColor: "lightgreen", margin: 3 },
              buttonTwo: { backgroundColor: "green", margin: 3 },
              buttonThree: { backgroundColor: "green", margin: 3 },
            });
          }}
        ></Button>

        <Button
          title="medium🐎"
          style={buttonPressed.buttonTwo}
          onPress={() => {
            handleSpeedSelection("medium");
            setButtonPressed({
              buttonOne: { backgroundColor: "green", margin: 3 },
              buttonTwo: { backgroundColor: "lightgreen", margin: 3 },
              buttonThree: { backgroundColor: "green", margin: 3 },
            });
          }}
        ></Button>
        <Button
          title="fast🚀"
          style={buttonPressed.buttonThree}
          onPress={() => {
            handleSpeedSelection("fast");
            setButtonPressed({
              buttonOne: { backgroundColor: "green", margin: 3 },
              buttonTwo: { backgroundColor: "green", margin: 3 },
              buttonThree: { backgroundColor: "lightgreen", margin: 3 },
            });
          }}
        ></Button>
      </View>
    </View>
  );
}
