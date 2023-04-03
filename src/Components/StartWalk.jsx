import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import StartTimer from "./StartTimer"
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import MapJson from "./MapJson";
import PlotRoute from "./PlotRoute";
import MapViewDirections from "react-native-maps-directions";


export default function StartWalk({
  kmh,
  setKmh,
  totalDuration,
  setTotalDuration,
  location,
  markerLocations,
  journeyDistancesDurations,
}) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  console.log("journeyDistancesDurations>>>", journeyDistancesDurations);

  return (
    <View style={styles.container}>
      <StartTimer
        setSecondsLeft={setSecondsLeft}
        totalDuration={totalDuration}
        secondsLeft={secondsLeft}
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
            // onReady={(result) => {
            //   //setDistanceA(result.distance);
            //   console.log(result)
            // }}
          />
          <MapViewDirections
            origin={markerLocations[1].coordinate}
            destination={markerLocations[2].coordinate}
            mode="WALKING"
            strokeWidth={5}
            strokeColor="blue"
            apikey="AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U"
            // onReady={(result) => {
            //   setDistanceB(result.distance);
            // }}
          />
          <MapViewDirections
            origin={markerLocations[2].coordinate}
            destination={markerLocations[3].coordinate}
            mode="WALKING"
            strokeWidth={5}
            strokeColor="orange"
            apikey="AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U"
            // onReady={(result) => {
            //   setDistanceC(result.distance);
            // }}
          />
        </MapView>
      </>
      {journeyDistancesDurations.map((journey) => {
        return (
          <View key={journey.journey_id}>
            <Text>Journey {journey.journey_id}:</Text>
            <Text>Distance: {journey.distance} km</Text>
            {journey.duration.hours ? (
              <Text>
                Walking Duration: {journey.duration.hours} hours{" "}
                {journey.duration.mins} mins{" "}
              </Text>
            ) : (
              <Text>Walking Duration: {journey.duration.mins} mins </Text>
            )}
          </View>
        );
      })}
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
  });

