import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { FoodMarkers } from "./FoodMarkers";
import MapJson from "./MapJson";
import PlotMarkers from "./PlotMarkers";
import DestinationSearch from "./DestinationSearch";
import PlotRoute from "./PlotRoute";
import { POIMarkers } from "./POIMarkers";
import { ListAllPOI } from "./ListAllPOI";
import RemoveMarkers from "./RemoveMarkers";
import PreferencesModal from "./PreferencesModal";
import StartJourneyModal from "./StartJourneyModal";
import { ListAllRestaurants } from "./ListAllRestaurants";
import { Button } from "@react-native-material/core";
import * as Device from "expo-device";

export default function SetRoute({
  setPOIPlaces,
  POIPlaces,
  setTotalDuration,
  totalDuration,
  setKmh,
  kmh,
  location,
  setLocation,
  markerLocations,
  setMarkerLocations,
  journeyDistancesDurations,
  setJourneyDistancesDurations,
  setLastLegWalkingDuration,
  totalDistance,
  setTotalDistance,
  
}) {
  // const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [distances, setDistances] = useState([]);
  // const [markerLocations, setMarkerLocations] = useState([]);
  const [searchedDestination, setSearchedDestination] = useState({});
  const [showRoute, setShowRoute] = useState(true);
  const [waypointA, setWaypointA] = useState({
    coords: { latitude: 0, longitude: 0 },
    name: "not_set",
  });
  const [waypointB, setWaypointB] = useState({
    coords: { latitude: 0, longitude: 0 },
    name: "not_set",
  });
  const [origin, setOrigin] = useState({});
  const [showStartJourneyModal, setShowStartJourneyModal] = useState(false);
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [showPlaces, setShowPlaces] = useState(false);
  const [showWalkInfo, setWalkInfo] = useState(false);
  const [newRegion, setNewRegion] = useState({});

  const GOOGLE_MAPS_APIKEY = "AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";

  const handleStartJourney = () => {
    setShowStartJourneyModal(true);
  };

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
  }, []);

  return (
    <View style={styles.container}>
      <PreferencesModal
        style={styles.modal}
        setKmh={setKmh}
        setTotalDuration={setTotalDuration}
      />
      {location ? (
        <>
          <DestinationSearch
            searchedDestination={searchedDestination}
            setSearchedDestination={setSearchedDestination}
            location={location}
            setWaypointA={setWaypointA}
            setWaypointB={setWaypointB}
            showPlaces={showPlaces}
            setShowPlaces={setShowPlaces}
          />
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            customMapStyle={MapJson}
            region={newRegion}
            onRegionChange={(_region) => {
              newRegion;
            }}
          >
            {showPlaces ? (
              <POIMarkers
                location={location}
                GOOGLE_MAPS_APIKEY={GOOGLE_MAPS_APIKEY}
                POIPlaces={POIPlaces}
                setPOIPlaces={setPOIPlaces}
                setWaypointA={setWaypointA}
                setWaypointB={setWaypointB}
                setShowPlaces={setShowPlaces}
                showPlaces={showPlaces}
              />
            ) : (
              <FoodMarkers
                location={location}
                GOOGLE_MAPS_APIKEY={GOOGLE_MAPS_APIKEY}
                setWaypointA={setWaypointA}
                setWaypointB={setWaypointB}
                foodPlaces={foodPlaces}
                setFoodPlaces={setFoodPlaces}
                setShowPlaces={setShowPlaces}
                showPlaces={showPlaces}
              />
            )}

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
                rrRoute={showRoute}
              />
            ) : null}
          </MapView>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={{ flexDirection: "row" }}>
        <Button
          style={{ backgroundColor: "#578a5e", margin: 5 }}
          disabled={showPlaces}
          title="show places"
          onPress={() => setShowPlaces(true)}
        />
        <Button
          style={{ backgroundColor: "#578a5e", margin: 5 }}
          title="show restaurants"
          disabled={!showPlaces}
          onPress={() => setShowPlaces(false)}
        />
      </View>
      {waypointA.name !== "not_set" && waypointB.name !== "not_set" ? (
        <View style={{ margin: 40 }}>
          <Text style={{ fontSize: 18 }}>
            Total Walking Duration: 1.09 mins{" "}
          </Text>
          <Text style={{ fontSize: 18 }}>Total Walking Distance: 7.89 km</Text>
        </View>
      ) : (
        <>
          {showPlaces ? (
            <>
              <ListAllPOI
                POIPlaces={POIPlaces}
                setWaypointA={setWaypointA}
                setWaypointB={setWaypointB}
                setShowPlaces={setShowPlaces}
                showPlaces={showPlaces}
                setNewRegion={setNewRegion}
              />
            </>
          ) : (
            <>
              <ListAllRestaurants
                foodPlaces={foodPlaces}
                setWaypointA={setWaypointA}
                setWaypointB={setWaypointB}
                setShowPlaces={setShowPlaces}
                showPlaces={showPlaces}
                setNewRegion={setNewRegion}
              />
            </>
          )}
        </>
      )}

      <View style={{ flexDirection: "row" }}>
        <RemoveMarkers
          setWaypointA={setWaypointA}
          setWaypointB={setWaypointB}
        />
        <Button
          style={{ backgroundColor: "#578a5e", margin: 3 }}
          title="Start Journey"
          onPress={() => {
            setShowStartJourneyModal(true);
          }}
        />
      </View>
      <StartJourneyModal
        showStartJourneyModal={showStartJourneyModal}
        setShowStartJourneyModal={setShowStartJourneyModal}
        distances={distances}
        kmh={kmh}
        showRoute={showRoute}
        setShowRoute={setShowRoute}
        journeyDistancesDurations={journeyDistancesDurations}
        setJourneyDistancesDurations={setJourneyDistancesDurations}
        setLastLegWalkingDuration={setLastLegWalkingDuration}
        setTotalDistance={setTotalDistance}
        totalDistance={totalDistance}
        setWaypointA={setWaypointA}
        setWaypointB={setWaypointB}
        totalDuration={totalDuration}
        markerLocations={markerLocations}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "92%",
    height: "50%",
  },
  modal: {
    backgroundColor: "white",
    margin: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
