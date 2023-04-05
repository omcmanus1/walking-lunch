import { Button } from "@react-native-material/core";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, DevSettings } from "react-native";
import StartTimer from "./StartTimer";
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapJson from "./MapJson";
import MapViewDirections from "react-native-maps-directions";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function StartWalk({
  totalDuration,
  location,
  markerLocations,
  journeyDistancesDurations,
  lastLegWalkingDuration,
  totalDistance,
}) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [completedModal, setCompletedModal] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StartTimer
        setSecondsLeft={setSecondsLeft}
        totalDuration={totalDuration}
        secondsLeft={secondsLeft}
        lastLegWalkingDuration={lastLegWalkingDuration}
      />

      <StatusBar style="auto" />
      <>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          customMapStyle={MapJson}
        >
          <MapViewDirections
            origin={markerLocations[0].coordinate}
            destination={markerLocations[1].coordinate}
            mode="WALKING"
            strokeWidth={5}
            strokeColor="hotpink"
            apikey="AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U"
          />
          <MapViewDirections
            origin={markerLocations[1].coordinate}
            destination={markerLocations[2].coordinate}
            mode="WALKING"
            strokeWidth={5}
            strokeColor="blue"
            apikey="AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U"
          />
          <MapViewDirections
            origin={markerLocations[2].coordinate}
            destination={markerLocations[3].coordinate}
            mode="WALKING"
            strokeWidth={5}
            strokeColor="orange"
            apikey="AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U"
          />
          <>
            {markerLocations.map((location) => {
              return (
                <Marker
                  key={location.id}
                  coordinate={location.coordinate}
                  title={location.name}
                />
              );
            })}
          </>
        </MapView>
      </>
      <View
        style={{
          margin: 15,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {journeyDistancesDurations.map((journey, index) => {
          return (
            <View style={{ padding: 8 }} key={journey.journey_id}>
              <Text style={styles.journeyHeaders}>
                {index === 0
                  ? `Origin -- ${markerLocations[index + 1].name}:`
                  : null}
                {index === 1
                  ? `${markerLocations[index].name} -- ${
                      markerLocations[index + 1].name
                    }:`
                  : null}
                {index === 2 ? `${markerLocations[index].name} -- End:` : null}
              </Text>
              <Text style={styles.text}>Distance: {journey.distance} km</Text>
              {journey.duration.hours ? (
                <Text style={styles.text}>
                  Walking Duration: {journey.duration.hours} hours{" "}
                  {journey.duration.mins} mins{" "}
                </Text>
              ) : (
                <Text style={styles.text}>
                  Walking Duration: {journey.duration.mins} mins{" "}
                </Text>
              )}
            </View>
          );
        })}
      </View>
      <Button
        style={styles.buttons}
        title="End Walk"
        onPress={() => setCompletedModal(true)}
      ></Button>
      <Modal isVisible={completedModal} style={styles.modal}>
        <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
        <Text style={{ fontSize: 20, textAlign: "center", padding: 20 }}>
          Hope you enjoyed your break 😄
        </Text>
        <Text style={{ fontSize: 18, textAlign: "center", padding: 20 }}>
          You walked {totalDistance} km! 🚶🏼‍♂️
        </Text>
        <View style={{ flexDirection: "row", margin: 20 }}>
          <Button
            style={styles.buttons}
            title="See Stats"
            onPress={() => navigation.navigate("User")}
          ></Button>
          <Button
            style={styles.buttons}
            title="New Walk"
            onPress={() => DevSettings.reload()}
          ></Button>
        </View>
        <Button
          style={{
            backgroundColor: "#79bd6a",
            margin: 20,
          }}
          title="Back"
          onPress={() => setCompletedModal(false)}
        ></Button>
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
    height: "50%",
  },
  modal: {
    backgroundColor: "white",
    margin: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "seagreen",
    padding: 3,
    margin: 7,
  },
  journeyHeaders: { fontSize: 14, textAlign: "center", fontStyle: "italic" },
  text: { fontSize: 14, textAlign: "center" },
  totals: { fontSize: 16, textAlign: "center" },
  headers: { fontWeight: "bold", fontSize: 16, textAlign: "center" },
});
