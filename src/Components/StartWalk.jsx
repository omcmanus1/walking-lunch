import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import StartTimer from "./StartTimer"
import React, { useState } from "react";

export default function StartWalk({setSecondsLeft, totalDuration, secondsLeft}){

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

