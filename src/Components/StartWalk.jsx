import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import StartTimer from "./StartTimer"
import React, { useState } from "react";


export default function StartWalk({kmh, setKmh, totalDuration, setTotalDuration }){
const [secondsLeft, setSecondsLeft] = useState(0);


  

    return(
        <View style={styles.container}>
          <StartTimer setSecondsLeft={setSecondsLeft} totalDuration={totalDuration} secondsLeft={secondsLeft}/>
        <StatusBar style='auto' />
        </View>
    )
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

