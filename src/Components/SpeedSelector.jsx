import { Text } from "react-native";
import { Button } from "@react-native-material/core";

export default function SpeedSelector({ setKmh }) {
  const handleSpeedSelection = (speed) => {
    if (speed === "slow") setKmh(3);
    else if (speed === "medium") setKmh(4.5);
    else if (speed === "fast") setKmh(6);
  };

  return (
    <>
      <Text>How fast do you walk?</Text>
      <Button
        title="slow"
        onPress={() => {
          handleSpeedSelection("slow");
        }}
      ></Button>
      <Button
        title="medium"
        onPress={() => {
          handleSpeedSelection("medium");
        }}
      ></Button>
      <Button
        title="fast"
        onPress={() => {
          handleSpeedSelection("fast");
        }}
      ></Button>
    </>
  );
}
