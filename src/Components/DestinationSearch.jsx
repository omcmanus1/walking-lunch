import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { addWaypoints } from "../utils/functions/add-waypoints";

export default function DestinationSearch({
  searchedDestination,
  setSearchedDestination,
  location,
  setWaypointA,
  setWaypointB,
  showPlaces,
  setShowPlaces,
}) {
  const GOOGLE_MAPS_APIKEY = "AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      renderRightButton={() => {
        return (
          <Button
            style={{
              backgroundColor: "#578a5e",
              marginBottom: 5,
              paddingTop: 3,
            }}
            title="Add Destination"
            onPress={() => {
              addWaypoints(
                setWaypointA,
                setWaypointB,
                searchedDestination.coords,
                searchedDestination.name,
                setShowPlaces,
                showPlaces
              );
            }}
          ></Button>
        );
      }}
      fetchDetails={true}
      GooglePlacesSearchQuery={{ rankby: "distance" }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        setSearchedDestination({
          name: details.name,
          coords: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          },
        });
      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: "en",
        types: "establishment",
        radius: 1000,
        location: `${location.latitude},${location.longitude}`,
      }}
      styles={{
        container: {
          flex: 0,
          backgroundColor: "#d5e3d7",
          padding: 5,
          paddingTop: 9,
          marginBottom: 7,
          width: "100%",
          zIndex: 1,
          listView: { backgroundColor: "white" },
        },
      }}
    />
  );
}
