import Modal from "react-native-modal";
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";

export default function CompletedWalk({
  totalDistance,
  secondsLeft,
  markerLocations,
  completedModal,
  setCompletedModal,
}) {
  if (secondsLeft < 540 && completedModal === true) {
    return (
      <View style={styles.container}>
        <Modal isVisible={true} style={styles.modal}>
          <Text>
            Hope you enjoyed your lunch! You walked {totalDistance}km!!!1!!
          </Text>

          <Button
            title="Home"
            onPress={() => setCompletedModal(false)}
          ></Button>
        </Modal>
      </View>
    );
  }
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
