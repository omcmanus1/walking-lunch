import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Button } from "react-native";
import { useEffect } from "react";

export default function DestinationSearch({
  searchedDestination,
  setSearchedDestination,
  markerLocations,
  setMarkerLocations,
  location,
}) {
  const GOOGLE_MAPS_APIKEY = "AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";

  // useEffect(() => {
  //   if (Object.keys(searchedDestination).length) {
  //     const newMarker = {
  //       id: markerLocations.length,
  //       coordinate: {
  //         latitude: searchedDestination.latitude,
  //         longitude: searchedDestination.longitude,
  //       },
  //     };
  //     setMarkerLocations([...markerLocations, newMarker]);
  //   }
  // }, [searchedDestination]);

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
            latitudeDelta: 0.004,
            longitudeDelta: 0.009,
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

      {/* <Button title='searchDestination'>Input Destination</Button> */}
    </>
  );
}
