import { useState, useEffect } from "react";
import { Marker } from "react-native-maps";
import RemoveMarkers from "./RemoveMarkers";

export default function PlotMarkers({ searchedDestination }) {
  const [markerLocations, setMarkerLocations] = useState([]);

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
      <RemoveMarkers setMarkerLocations={setMarkerLocations} />
    </>
  );
}
