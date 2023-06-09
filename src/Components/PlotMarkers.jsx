import { useEffect } from "react";
import { Marker } from "react-native-maps";

export default function PlotMarkers({
  origin,
  markerLocations,
  setMarkerLocations,
  waypointA,
  waypointB,
}) {
  useEffect(() => {
    if (Object.keys(origin).length !== 1) {
      const markers = [
        {
          id: 'start_point',
          coordinate: origin,
          name: 'Origin'
        },
        {
          id: 'waypoint_1',
          coordinate: waypointA.coords,
          name: waypointA.name
        },
        {
          id: 'waypoint_2',
          coordinate: waypointB.coords,
          name: waypointB.name
        },
        {
          id: 'end_point',
          coordinate: origin,
          name: 'Origin'
        }
      ];
      setMarkerLocations(markers);
    }
  }, [origin, waypointA, waypointB]);

  return (
    <>
      {markerLocations.map((location) => {
        return <Marker key={location.id} coordinate={location.coordinate} />;
      })}
    </>
  );
}
