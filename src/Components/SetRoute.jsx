
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
import RemoveMarkers from './RemoveMarkers'
import Modal from "react-native-modal";

export default function SetRoute() {
    const [location, setLocation] = useState();
    const [address, setAddress] = useState();
    const [kmh, setKmh] = useState(4.5);
    // ^^ kmh speed can be set by user in dropdown/slider form "slow", "medium", or "fast" each with a different kmh value. Ie. "medium" is 4.5kmh which is what this state is set as default. "slow" could be 3kmh, "fast" could be 6kmh
    const [distances, setDistances] = useState([]);
    const [markerLocations, setMarkerLocations] = useState([]);
    const [searchedDestination, setSearchedDestination] = useState({});
    const [showRoute, setShowRoute] = useState(true);
    const [waypointA, setWaypointA] = useState({});
    const [waypointB, setWaypointB] = useState({});
    const [origin, setOrigin] = useState({});
    const [showModal, setShowModal] =useState(true);
  

  
    // for directions
    //const origin = {latitude: 53.4721341, longitude: -2.2377251};// hard coded NC
    // const origin = "Manchester Technology Centre";
    // const destination = { latitude: 53.636325899999996, longitude: -2.3278136 }; //Ricks house
    // for directions - THE ABOVE ORIGIN/DESTINATION VARS ARE NOT USED ANYMORE AFTER EMMA'S ROUTE CALCS IMPLEMENTATION
  
    const GOOGLE_MAPS_APIKEY = "AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";
  
    const handleSpeedSelection = (speed) => {
      if (speed === "slow") setKmh(3);
      else if (speed === "medium") setKmh(4.5);
      else if (speed === "fast") setKmh(6);
    };
      
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

  
    return (
      <View style={styles.container}>

<Modal isVisible={showModal} style={styles.modal}  > 
<Text>Set your walking preferences!!!</Text>
<SpeedSelector setKmh={setKmh} />
<SetTimer></SetTimer>
<Button title='Set Preferences' onPress={() => setShowModal(false)}></Button>
</Modal>

       
        {location ? (
          /* DestinationSearch component creates a search function 
          above the map (only renders when there is a location set initially), 
          and if you click on something it will then create a marker there 
          (down below in mapview) */
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

 