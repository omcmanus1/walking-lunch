import Modal from "react-native-modal";
import { Button, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";




export default function StartJourneyModal({
  showStartJourneyModal,
  setShowStartJourneyModal,
  
  
}) {
   const navigation = useNavigation();
  return (
    <Modal isVisible={showStartJourneyModal} style={styles.modal}>
      <Text>Are you content with your journey?</Text>
      
        <Button
          title="Start Journey"
          onPress={() => navigation.navigate("Start Walk")}
        ></Button>
        <Button
          title="Go Back"
          onPress={() => setShowStartJourneyModal(false)}
        ></Button>
      
    </Modal>
  );
}


const styles = StyleSheet.create({
 
    modal: {
      backgroundColor: 'white',
      margin: 25, 
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

