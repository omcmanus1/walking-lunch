import { useEffect } from "react";
import { Marker } from "react-native-maps";

export default function PlotMarkers({
  origin,
  markerLocations,
  setMarkerLocations,
  waypointA,
  waypointB,
  nameA,
  nameB,
}) {
  console.log(markerLocations);
  console.log(nameA);
  useEffect(() => {
    if (Object.keys(origin).length !== 1) {
      const markers = [
        {
          id: "start_point",
          coordinate: origin,
        },
        {
          id: "waypoint_1",
          coordinate: waypointA.coords.latitude
            ? waypointA.coords
            : { latitude: 0, longitude: 0 },
          name: nameA ? nameA : "not_set",
        },
        {
          id: "waypoint_2",
          coordinate: waypointB.coords
            ? waypointB.coords.latitude
            : { latitude: 0, longitude: 0 },
          name: nameB ? nameB : "not_set",
        },
        {
          id: "end_point",
          coordinate: origin,
        },
      ];
      setMarkerLocations(markers);
    }
  }, [origin, waypointA, waypointB, nameA, nameB]);

  return (
    <>
      {markerLocations.map((location) => {
        return <Marker key={location.id} coordinate={location.coordinate} />;
      })}
    </>
  );
}
