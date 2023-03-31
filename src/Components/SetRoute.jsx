import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { FoodMarkers } from "./FoodMarkers";
import MapJson from "./MapJson";
import PlotMarkers from "./PlotMarkers";
import DestinationSearch from "./DestinationSearch";
import PlotRoute from "./PlotRoute";
import RouteCalculations from "./RouteCalculations";
import { POIMarkers } from "./POIMarkers";
import { ListAllPOI } from "./ListAllPOI";
import RemoveMarkers from "./RemoveMarkers";
import PreferencesModal from "./PreferencesModal";
import StartJourneyModal from "./StartJourneyModal";
import { ListAllRestaurants } from "./ListAllRestaurants";
import Modal from "react-native-modal";
import * as Device from "expo-device";

export default function SetRoute({
  setPOIPlaces,
  POIPlaces,
  setTotalDuration,
  totalDuration,
  setKmh,
  kmh,
  lastLegWalkingDuration,
  setLastLegWalkingDuration,
}) {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [distances, setDistances] = useState([]);
  const [markerLocations, setMarkerLocations] = useState([]);
  const [searchedDestination, setSearchedDestination] = useState({});
  const [showRoute, setShowRoute] = useState(true);
  const [waypointA, setWaypointA] = useState({});
  const [waypointB, setWaypointB] = useState({});
  const [origin, setOrigin] = useState({});
  const [showStartJourneyModal, setShowStartJourneyModal] = useState(false);
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [whichList, setWhichList] = useState("POI");

  const GOOGLE_MAPS_APIKEY = "AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";

  useEffect(() => {
    if (!Device.isDevice) {
      setLocation({
        latitude: 53.472669328839075,
        longitude: -2.238509469312171,
        latitudeDelta: 0.015,
        longitudeDelta: 0.032,
      });
      setOrigin({
        latitude: 53.472669328839075,
        longitude: -2.238509469312171,
      });
    } else {
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
    }
  }, [setOrigin]);

  const handleStartJourney = () => {
    setShowStartJourneyModal(true);
  };

  return (
    <View style={styles.container}>
      <PreferencesModal setKmh={setKmh} setTotalDuration={setTotalDuration} />
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
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            customMapStyle={MapJson}
          >
            <FoodMarkers
              location={location}
              GOOGLE_MAPS_APIKEY={GOOGLE_MAPS_APIKEY}
              setWaypointA={setWaypointA}
              setWaypointB={setWaypointB}
              foodPlaces={foodPlaces}
              setFoodPlaces={setFoodPlaces}
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

      {whichList === "POI" ? (
        <>
          <Button
            title="show restaurants"
            onPress={() => setWhichList("Restaurants")}
          />
          <ListAllPOI
            POIPlaces={POIPlaces}
            setWaypointA={setWaypointA}
            setWaypointB={setWaypointB}
          />
        </>
      ) : (
        <>
          <Button title="show places" onPress={() => setWhichList("POI")} />
          <ListAllRestaurants
            foodPlaces={foodPlaces}
            setWaypointA={setWaypointA}
            setWaypointB={setWaypointB}
          />
        </>
      )}

      <RouteCalculations
        distances={distances}
        kmh={kmh}
        showRoute={showRoute}
        setShowRoute={setShowRoute}
        lastLegWalkingDuration={lastLegWalkingDuration}
        setLastLegWalkingDuration={setLastLegWalkingDuration}
      />

      <Button title="Start Journey" onPress={handleStartJourney} />
      <StartJourneyModal
        showStartJourneyModal={showStartJourneyModal}
        setShowStartJourneyModal={setShowStartJourneyModal}
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
