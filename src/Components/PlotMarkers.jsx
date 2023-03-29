import { useEffect } from "react";
import { Marker } from "react-native-maps";

export default function PlotMarkers({
  searchedDestination,
  markerLocations,
  setMarkerLocations,
  origin,
}) {
  useEffect(() => {
    if (Object.keys(origin).length !== 1) {
      const newMarker = {
        id: "origin_location",
        coordinate: {
          latitude: Number(origin.latitude),
          longitude: Number(origin.longitude),
        },
      };
      setMarkerLocations([...markerLocations, newMarker]);
    }
  }, [origin]);

  useEffect(() => {
    if (Object.keys(searchedDestination).length) {
      const newMarker = {
        id: `searched_${markerLocations.length}`,
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
