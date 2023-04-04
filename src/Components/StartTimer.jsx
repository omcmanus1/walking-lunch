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
    <View style={{ margin: 10, marginTop: 15 }}>
      <Text style={{ textAlign: "center", padding: 5, fontSize: 14 }}>
        Time left:{" "}
      </Text>
      <CountDown
        until={totalDuration}
        timeToShow={["M", "S"]}
        timeLabels={{ m: "MM", s: "SS" }}
        onChange={() => setSecondsLeft((currSecs) => currSecs - 1)}
        size={20}
      />
    </View>
  );
}
