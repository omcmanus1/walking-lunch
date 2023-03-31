import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Alert, Button } from "react-native";

import { addWaypoints } from "../utils/functions/add-waypoints";

export default function DestinationSearch({
  searchedDestination,
  setSearchedDestination,
  location,
  setWaypointA,
  setWaypointB,
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
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
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
        title="Add Destination"
        onPress={() => {
          // TODO: Add location name as 4th argument, test with searchbar
          addWaypoints(setWaypointA, setWaypointB, searchedDestination);
        }}
      ></Button>
    </>
  );
}
