import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import StartTimer from "./StartTimer";
import React, { useState } from "react";
import Modal from "react-native-modal";

export default function StartWalk({
  kmh,
  setKmh,
  totalDuration,
  setTotalDuration,
  lastLegWalkingDuration,
  totalDistance,
}) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [completedModal, setCompletedModal] = useState(false);

  return (
    <View style={styles.container}>
      <StartTimer
        setSecondsLeft={setSecondsLeft}
        totalDuration={totalDuration}
        secondsLeft={secondsLeft}
        lastLegWalkingDuration={lastLegWalkingDuration}
      />
      <Button title="End Walk" onPress={() => setCompletedModal(true)}></Button>
      <Modal isVisible={completedModal} style={styles.modal}>
        <Text>
          Hope you enjoyed your lunch! You walked {totalDistance}km!!!1!!
        </Text>
        <Button title="Home" onPress={() => setCompletedModal(false)}></Button>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "90%",
    height: "40%",
  },
  modal: {
    backgroundColor: "white",
    margin: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
