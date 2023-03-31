import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import StartTimer from "./StartTimer"
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import MapJson from "./MapJson";


export default function StartWalk({kmh, setKmh, totalDuration, setTotalDuration, location }){
const [secondsLeft, setSecondsLeft] = useState(0);


  console.log("location>>>", location)

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
          ></MapView>
        </>
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

