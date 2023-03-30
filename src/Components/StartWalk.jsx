import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import Timer from "./Timer";
import SpeedSelector from "./SpeedSelector";



export default function StartWalk({setKmh}){

    return(
        <View style={styles.container}>
        <Text>Start Walk!!</Text>
        <Timer/>
        <SpeedSelector setKmh={setKmh} />

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

