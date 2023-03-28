import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import Timer from "./src/Components/Timer";
import SpeedSelector from "./src/Components/SpeedSelector";

import PlotMarkers from "./src/Components/PlotMarkers";
import DestinationSearch from "./src/Components/DestinationSearch";
import PlotRoute from "./src/Components/PlotRoute";
import RouteCalculations from "./src/Components/RouteCalculations";
// import { GeocodeAddress } from "./Components/GeocodeAddress";

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [searchedDestination, setSearchedDestination] = useState();
  const [kmh, setKmh] = useState(4.5);
  // ^^ kmh speed can be set by user in dropdown/slider form "slow", "medium", or "fast" each with a different kmh value. Ie. "medium" is 4.5kmh which is what this state is set as default. "slow" could be 3kmh, "fast" could be 6kmh
  const [distances, setDistances] = useState([]);
  const [markerWayPoints, setMarkerWayPoints] = useState([
    { latitude: 53.47233724234388, longitude: -2.2386060301324466 },
    { latitude: 53.477314035548645, longitude: -2.2359793198206 },
    { latitude: 53.477392438907366, longitude: -2.2409457571161577 },
    { latitude: 53.47233724234388, longitude: -2.2386060301324466 },
  ]);
  // ^^ markerWayPoints hardcoded for now

  // for directions
  //const origin = {latitude: 53.4721341, longitude: -2.2377251};// hard coded NC
  const origin = "Manchester Technology Centre";
  const destination = "Manchester Technology Centre";
  const GOOGLE_MAPS_APIKEY = "AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";
  // for directions

  // mapJSON customises google maps styling, roads etc
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

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.032,
      });
    };
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Timer></Timer>
      <SpeedSelector setKmh={setKmh} />
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
          <PlotRoute
            origin={origin}
            destination={destination}
            GOOGLE_MAPS_APIKEY={GOOGLE_MAPS_APIKEY}
            // setTotalDistance={setTotalDistance}
            // setTotalWalkingDuration={setTotalWalkingDuration}
            markerWayPoints={markerWayPoints}
            setDistances={setDistances}
          />
          {searchedDestination ? (
            <Marker
              coordinate={{
                latitude: searchedDestination.latitude,
                longitude: searchedDestination.longitude,
              }}
            />
          ) : null}
          {/* Above is the marker that gets placed if a destination is searched for */}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      <RouteCalculations distances={distances} kmh={kmh} />
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
