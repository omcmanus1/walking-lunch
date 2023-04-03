import Modal from 'react-native-modal';
import { Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RouteCalculations from './RouteCalculations';

export default function StartJourneyModal({
  showStartJourneyModal,
  setShowStartJourneyModal,
  distances,
  kmh,
  showRoute,
  setShowRoute,
  setLastLegWalkingDuration,
  setTotalDistance,
  totalDistance,
  setWaypointA,
  setWaypointB,
  totalDuration,
   journeyDistancesDurations,
  setJourneyDistancesDurations
}) {
  const navigation = useNavigation();
  return (
    <Modal isVisible={showStartJourneyModal} style={styles.modal}>
      <Text>Journey Details</Text>
      <RouteCalculations
        distances={distances}
        kmh={kmh}
        showRoute={showRoute}
        setShowRoute={setShowRoute}
        setLastLegWalkingDuration={setLastLegWalkingDuration}
        setTotalDistance={setTotalDistance}
        totalDistance={totalDistance}
        setWaypointA={setWaypointA}
        setWaypointB={setWaypointB}
        setShowStartJourneyModal={setShowStartJourneyModal}
        totalDuration={totalDuration}
         journeyDistancesDurations={journeyDistancesDurations}
        setJourneyDistancesDurations={setJourneyDistancesDurations}
      />
      <Text>Are you content with your journey?</Text>

      <Button title="Start Journey" onPress={() => navigation.navigate('Start Walk')}></Button>
      <Button title="Go Back" onPress={() => setShowStartJourneyModal(false)}></Button>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    margin: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
