import { Text, View } from "react-native";
import { Button } from "@react-native-material/core";

export default function SpeedSelector({ setKmh }) {
  const handleSpeedSelection = (speed) => {
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
          style={{ backgroundColor: "seagreen", margin: 3 }}
          title="slow"
          onPress={() => {
            handleSpeedSelection("slow");
          }}
        ></Button>
        <Button
          style={{ backgroundColor: "seagreen", margin: 3 }}
          title="medium"
          onPress={() => {
            handleSpeedSelection("medium");
          }}
        ></Button>
        <Button
          style={{ backgroundColor: "seagreen", margin: 3 }}
          title="fast"
          onPress={() => {
            handleSpeedSelection("fast");
          }}
        ></Button>
      </View>
    </View>
  );
}
