import Modal from "react-native-modal";
import SetTimer from "./SetTimer";
import SpeedSelector from "./SpeedSelector";
import { useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { Button } from "@react-native-material/core";
import { buttons } from "../styles/buttons";

export default function PreferencesModal({ setKmh, setTotalDuration }) {
  const [showModal, setShowModal] = useState(true);

  return (
    <Modal isVisible={showModal} style={styles.modal}>
      <Image
        style={{
          objectFit: "contain",
          width: 200,
          height: 200,
          marginTop: 40,
        }}
        source={require("../logo2.png")}
      ></Image>
      <Text
        style={{
          fontSize: 22,
          padding: 20,
          textAlign: "center",
          fontFamily: "",
        }}
      >
        Get ready for your Walking Lunch!
      </Text>
      <SpeedSelector setKmh={setKmh} />
      <SetTimer setTotalDuration={setTotalDuration}></SetTimer>
      <Button
        style={{
          backgroundColor: "seagreen",
          margin: 20,
          marginBottom: 40,
          padding: 10,
        }}
        title="Set Preferences"
        onPress={() => setShowModal(false)}
      ></Button>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttons: buttons,
  modal: {
    backgroundColor: "white",
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});
