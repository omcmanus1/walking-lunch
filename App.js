import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { FoodMarkers } from "./src/Components/FoodMarkers";

import Timer from "./src/Components/Timer";
import SpeedSelector from "./src/Components/SpeedSelector";
import MapJson from "./src/Components/MapJson";
import PlotMarkers from "./src/Components/PlotMarkers";
import RemoveMarkers from "./src/Components/RemoveMarkers";
import DestinationSearch from "./src/Components/DestinationSearch";
import PlotRoute from "./src/Components/PlotRoute";
import RouteCalculations from "./src/Components/RouteCalculations";
import { POIMarkers } from "./src/Components/POIMarkers";
// import { GeocodeAddress } from "./Components/GeocodeAddress";

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [kmh, setKmh] = useState(4.5);
  // ^^ kmh speed can be set by user in dropdown/slider form "slow", "medium", or "fast" each with a different kmh value. Ie. "medium" is 4.5kmh which is what this state is set as default. "slow" could be 3kmh, "fast" could be 6kmh
  const [distances, setDistances] = useState([]);
  const [origin, setOrigin] = useState({});
  const [searchedDestination, setSearchedDestination] = useState({});
  const [markerLocations, setMarkerLocations] = useState([]);
  const [showRoute, setShowRoute] = useState(true);
  const [waypointA, setWaypointA] = useState({});
  const [waypointB, setWaypointB] = useState({});

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

  return (
    <View style={styles.container}>
      <Timer></Timer>
      <SpeedSelector setKmh={setKmh} />
      {location ? (
        /* DestinationSearch component creates a search function 
        above the map (only renders when there is a location set initially), 
        and if you click on something it will then create a marker there 
        (down below in mapview) */
        <>
          <DestinationSearch
            searchedDestination={searchedDestination}
            setSearchedDestination={setSearchedDestination}
            markerLocations={markerLocations}
            setMarkerLocations={setMarkerLocations}
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
            waypointA={waypointA}
            waypointB={waypointB}
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
});
