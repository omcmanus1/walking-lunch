import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Alert } from "react-native";
import { Button } from "@react-native-material/core";
import { SearchBar } from "@rneui/themed";
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
    <>
      <GooglePlacesAutocomplete
        placeholder="Search"
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
            backgroundColor: "lightgreen",
            padding: 5,
            paddingTop: 9,
            width: "100%",
            zIndex: 1,
            listView: { backgroundColor: "white" },
          },
        }}
      />
      {/* Start by prompting user to decide if choice
          is for waypointA or waypointB.
          Use conditional to populate either state based on choice. */}
      <Button
        style={{ backgroundColor: "green", margin: 5 }}
        title="Add Destination"
        onPress={() => {
          // TODO: Add location name as 4th argument, test with searchbar
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
    </>
  );
}
