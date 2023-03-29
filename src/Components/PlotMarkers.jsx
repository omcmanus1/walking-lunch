import { useEffect } from "react";
import { Marker } from "react-native-maps";

export default function PlotMarkers({
  searchedDestination,
  markerLocations,
  setMarkerLocations,
  origin,
}) {
  console.log("markerLocations:", markerLocations);
  // useEffect(() => {
  //   if (Object.keys(origin).length) {
  //     const newMarker = {
  //       id: markerLocations.length,
  //       coordinate: {
  //         latitude: origin.latitude,
  //         longitude: origin.longitude,
  //       },
  //     };
  //     setMarkerLocations([...markerLocations, newMarker]);
  //   }
  // }, [origin]);

  return (
    <>
      {markerLocations.map((location) => {
        return <Marker key={location.id} coordinate={location.coordinate} />;
      })}
    </>
  );
}
