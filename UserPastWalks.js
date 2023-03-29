import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function UserPastWalks(){
    return(
        <View style={styles.container}>
        <Text>users</Text>
        <StatusBar style='auto' />
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
  