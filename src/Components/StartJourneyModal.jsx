import Modal from "react-native-modal";
import { Button, Text, StyleSheet } from "react-native";


export default function StartJourneyModal({showStartJourneyModal, setShowStartJourneyModal}) {



    return(
        <Modal isVisible={showStartJourneyModal} style={styles.modal}>
            <Text>Are you content with your journey?</Text>
        <Button title='Start Journey' onPress={() =>
             console.log('need to add link to the start walk tab')}></Button>
        <Button title='Go Back' onPress={() => setShowStartJourneyModal(false)}></Button>
        </Modal>

    )
}


const styles = StyleSheet.create({
 
    modal: {
      backgroundColor: 'white',
      margin: 25, 
      alignItems: 'center',
      justifyContent: 'center',
    }
  });


