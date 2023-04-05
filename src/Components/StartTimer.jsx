import CountDown from "react-native-countdown-component";
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Alert } from "react-native";

export default function StartTimer({
  setSecondsLeft,
  totalDuration,
  secondsLeft,
  lastLegWalkingDuration,
}) {
  useEffect(() => {
    setSecondsLeft(totalDuration);
  }, []);

  useEffect(() => {
    if (secondsLeft === lastLegWalkingDuration * 60) {
      Alert.alert(
        `You should start walking back to the office now, you have ${lastLegWalkingDuration} minutes left!`
      );
    }
  }, [secondsLeft, lastLegWalkingDuration]);

  return (
    <View style={{ margin: 5, marginTop: 15 }}>
      <Text style={{ textAlign: "center", padding: 5, fontSize: 14 }}>
        Time left:{" "}
      </Text>
      <CountDown
        until={totalDuration}
        timeToShow={["H", "M", "S"]}
        timeLabels={{ h: "HH", m: "MM", s: "SS" }}
        digitStyle={{ backgroundColor: "#d5e3d7" }}
        digitTxtStyle={{ color: "seagreen" }}
        onChange={() => setSecondsLeft((currSecs) => currSecs - 1)}
        size={20}
      />
    </View>
  );
}
