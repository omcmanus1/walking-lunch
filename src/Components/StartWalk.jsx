import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import StartTimer from './StartTimer';
import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import MapJson from './MapJson';
import MapViewDirections from 'react-native-maps-directions';
import Modal from 'react-native-modal';

export default function StartWalk({
  kmh,
  setKmh,
  totalDuration,
  setTotalDuration,
  location,
  markerLocations,
  journeyDistancesDurations,
  lastLegWalkingDuration,
  totalDistance
}) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [completedModal, setCompletedModal] = useState(false);


  return (
    <View style={styles.container}>
      
      <StartTimer
        setSecondsLeft={setSecondsLeft}
        totalDuration={totalDuration}
        secondsLeft={secondsLeft}
        lastLegWalkingDuration={lastLegWalkingDuration}
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
        
          />
          <MapViewDirections
            origin={markerLocations[1].coordinate}
            destination={markerLocations[2].coordinate}
            mode="WALKING"
            strokeWidth={5}
            strokeColor="blue"
            apikey="AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U"
           
          />
          <MapViewDirections
            origin={markerLocations[2].coordinate}
            destination={markerLocations[3].coordinate}
            mode="WALKING"
            strokeWidth={5}
            strokeColor="orange"
            apikey="AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U"
           
          />
          <>
            {markerLocations.map(location => {
              return (
                <Marker key={location.id} coordinate={location.coordinate} title={location.name} />
              );
            })}
          </>
        </MapView>
      </>
      {journeyDistancesDurations.map(journey => {
        return (
          <View key={journey.journey_id}>
            <Text>Journey {journey.journey_id}:</Text>
            <Text>Distance: {journey.distance} km</Text>
            {journey.duration.hours ? (
              <Text>
                Walking Duration: {journey.duration.hours} hours {journey.duration.mins} mins{' '}
              </Text>
            ) : (
              <Text>Walking Duration: {journey.duration.mins} mins </Text>
            )}
          </View>
        );
      })}
      {/* lastLegWalkingDuration={lastLegWalkingDuration} */}

      <Button title="End Walk" onPress={() => setCompletedModal(true)}></Button>
      <Modal isVisible={completedModal} style={styles.modal}>
        <Text>Hope you enjoyed your lunch! You walked {totalDistance}km!!!1!!</Text>
        <Button title="Home" onPress={() => setCompletedModal(false)}></Button>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: '90%',
    height: '40%'
  },
  modal: {
    backgroundColor: 'white',
    margin: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
