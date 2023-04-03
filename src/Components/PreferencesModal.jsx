import Modal from "react-native-modal";
import SetTimer from "./SetTimer";
import SpeedSelector from "./SpeedSelector";
import { useState } from "react";
import { Button, Text, StyleSheet } from "react-native";
import { wipeMarkers } from "../utils/functions/wipe-markers";




export default function PreferencesModal({setKmh, setTotalDuration}){
    const [showModal, setShowModal] =useState(true);

    return(
      
<Modal isVisible={showModal} style={styles.modal}  > 
<Text>Set your walking preferences!!!</Text>
<SpeedSelector setKmh={setKmh} />
<SetTimer setTotalDuration={setTotalDuration}></SetTimer>
<Button title='Set Preferences' onPress={() => setShowModal(false)}></Button>
</Modal>


)}

const styles = StyleSheet.create({
 
    modal: {
      backgroundColor: 'white',
      margin: 25, 
      alignItems: 'center',
      justifyContent: 'center',
    }
  });