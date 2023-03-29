import { useState, useEffect } from "react";
import { Marker } from "react-native-maps";

export default function PlotMarkers({
  searchedDestination,
  markerLocations,
  setMarkerLocations,
}) {
  // console.log("marker locations", markerLocations);
  // console.log('searchedDestination', searchedDestination)

  useEffect(() => {
    if (Object.keys(searchedDestination).length) {
      const newMarker = {
        id: markerLocations.length,
        coordinate: {
          latitude: searchedDestination.latitude,
          longitude: searchedDestination.longitude,
        },
      };
      setMarkerLocations([...markerLocations, newMarker]);
    }
  }, [searchedDestination]);

  return (
    <>
      {markerLocations.map((location) => {
        return <Marker key={location.id} coordinate={location.coordinate} />;
      })}
    </>
  );
}
