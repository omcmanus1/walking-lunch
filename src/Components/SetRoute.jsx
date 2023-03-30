import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput, Alert} from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { FoodMarkers } from "./FoodMarkers";
import SetTimer from "./SetTimer";
import SpeedSelector from "./SpeedSelector";
import MapJson from "./MapJson";
import PlotMarkers from "./PlotMarkers";
import DestinationSearch from "./DestinationSearch";
import PlotRoute from "./PlotRoute";
import RouteCalculations from "./RouteCalculations";
import { POIMarkers } from "./POIMarkers";
import { ListAllPOI } from "./ListAllPOI";
import RemoveMarkers from './RemoveMarkers'
import Modal from "react-native-modal";

export default function SetRoute({setPOIPlaces, POIPlaces, secondsLeft, setSecondsLeft, totalDuration, setTotalDuration}) {
    const [location, setLocation] = useState();
    const [address, setAddress] = useState();
    const [kmh, setKmh] = useState(4.5);
    const [distances, setDistances] = useState([]);
    const [markerLocations, setMarkerLocations] = useState([]);
    const [searchedDestination, setSearchedDestination] = useState({});
    const [showRoute, setShowRoute] = useState(true);
    const [waypointA, setWaypointA] = useState({});
    const [waypointB, setWaypointB] = useState({});
    const [origin, setOrigin] = useState({});
    const [showModal, setShowModal] =useState(true);
    const [showSetMinsForm, setShowSetMinsForm] = useState(true);
    const [showTimer, setShowTimer] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);

  
    const GOOGLE_MAPS_APIKEY = "AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";  


    useEffect(() => {
      const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
  
        let currentLocation = await Location.getCurrentPositionAsync({});
  
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.032,
        });
        setOrigin({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      };

      getPermissions();
    }, [setOrigin]);

  console.log(kmh)

 const handleStartJourney = () => {
  const totalSecs = sliderValue * 60;
  // ^^ converts user inputted mins to seconds
  setTotalDuration(totalSecs);
  setSecondsLeft(totalSecs);
  setShowSetMinsForm(false);
  setShowTimer(true);
 }



    return (
      <View style={styles.container}>

<Modal isVisible={showModal} style={styles.modal}  > 
<Text>Set your walking preferences!!!</Text>
<SpeedSelector setKmh={setKmh} />
<SetTimer sliderValue={sliderValue} setSliderValue={setSliderValue}></SetTimer>
<Button title='Set Preferences' onPress={() => setShowModal(false)}></Button>
</Modal>

       
        {location ? (
        <>
          <DestinationSearch
            searchedDestination={searchedDestination}
            setSearchedDestination={setSearchedDestination}
            location={location}
            setWaypointA={setWaypointA}
            setWaypointB={setWaypointB}
          />

          <MapView
            provider={PROVIDER_GOOGLE}
            // ^^ set google as the fixed map provider
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            customMapStyle={MapJson}
            // ^^ this gives blue dot on map for your location
          >
            <FoodMarkers
              location={location}
              GOOGLE_MAPS_APIKEY={GOOGLE_MAPS_APIKEY}
              setWaypointA={setWaypointA}
              setWaypointB={setWaypointB}
            />
            <POIMarkers
              location={location}
              GOOGLE_MAPS_APIKEY={GOOGLE_MAPS_APIKEY}
              POIPlaces={POIPlaces}
              setPOIPlaces={setPOIPlaces}
              setWaypointA={setWaypointA}
              setWaypointB={setWaypointB}
            />
            <PlotMarkers
              origin={origin}
              searchedDestination={searchedDestination}
              markerLocations={markerLocations}
              setMarkerLocations={setMarkerLocations}
              waypointA={waypointA}
              waypointB={waypointB}
            />

            {markerLocations.length &&
            markerLocations[1].coordinate.latitude &&
            markerLocations[2].coordinate.latitude ? (
              <PlotRoute
                GOOGLE_MAPS_APIKEY={GOOGLE_MAPS_APIKEY}
                setDistances={setDistances}
                markerLocations={markerLocations}
                showRoute={showRoute}
              />
            ) : null}
          </MapView>
          <RemoveMarkers
            setMarkerLocations={setMarkerLocations}
            origin={origin}
            markerLocations={markerLocations}
            setWaypointA={setWaypointA}
            setWaypointB={setWaypointB}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <ListAllPOI POIPlaces={POIPlaces} />
      
      <Button title="Start Journey" onPress={handleStartJourney}/>

    
      <RouteCalculations
        distances={distances}
        kmh={kmh}
        showRoute={showRoute}
        setShowRoute={setShowRoute}
      />

      <StatusBar style="auto" />

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

    modal: {
      backgroundColor: 'white',
      margin: 25, 
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

 
