import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE , Callout} from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import {FoodMarkers} from "./src/Components/FoodMarkers";


import Timer from "./src/Components/Timer";

import PlotMarkers from "./src/Components/PlotMarkers";
import DestinationSearch from "./src/Components/DestinationSearch";
import PlotRoute from "./src/Components/PlotRoute";
// import { GeocodeAddress } from "./Components/GeocodeAddress";

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [searchedDestination, setSearchedDestination] = useState({});

  // for directions
  const origin = {latitude: 53.4721341, longitude: -2.2377251};// hard coded NC
  // const origin = "Manchester Technology Centre";
  const destination = { latitude: 53.636325899999996, longitude: -2.3278136 }; //Ricks house
  const GOOGLE_MAPS_APIKEY = "AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";
  // for directions



  // mapJSON customises google maps styling, roads etc
 
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log('location >>>>>>>>', currentLocation)

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.032,
            })
            setSearchedDestination( {latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude})
    };

    getPermissions();
  }, []);


  return (
    <View style={styles.container}>
      <Timer></Timer>
      {location ? (
        /* DestinationSearch component creates a search function 
        above the map (only renders when there is a location set initially), 
        and if you click on something it will then create a marker there 
        (down below in mapview) */
        <DestinationSearch
          setSearchedDestination={setSearchedDestination}
          location={location}
        />
      ) : null}
      {location ? (
          <MapView
          provider={PROVIDER_GOOGLE}
          // ^^ set google as the fixed map provider
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          customMapStyle={mapJson}
          // ^^ this gives blue dot on map for your location
        >
          <PlotMarkers />
          <FoodMarkers />
          <PlotRoute
            origin={origin}
            destination={destination}
            GOOGLE_MAPS_APIKEY={GOOGLE_MAPS_APIKEY}
          />
          
          <PlotMarkers searchedDestination={searchedDestination}/>
          
            <Marker
            coordinate={{
              latitude: searchedDestination.latitude,
              longitude: searchedDestination.longitude,
            }}
          />
          
        
        
        {origin && destination ? (
            <PlotRoute
              origin={origin}
              destination={destination}
              GOOGLE_MAPS_APIKEY={GOOGLE_MAPS_APIKEY}
            />
          ) : null}
          {/* Above is the marker that gets placed if a destination is searched for */}     
      
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
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
});

const mapJson = [
  {
    featureType: "poi.park",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.arterial",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

