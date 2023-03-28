import MapViewDirections from "react-native-maps-directions";
import { View, Text } from "react-native";
import { useState, useEffect } from "react";

export default function PlotRoute({
  origin,
  destination,
  GOOGLE_MAPS_APIKEY,
  markerWayPoints,
  setDistances,
}) {
  const [distanceA, setDistanceA] = useState(0);
  const [distanceB, setDistanceB] = useState(0);
  const [distanceC, setDistanceC] = useState(0);

  useEffect(() => {
    setDistances([distanceA, distanceB, distanceC]);
  }, [distanceA, distanceB, distanceC]);

  return (
    <>
      <MapViewDirections
        origin={markerWayPoints[0]}
        destination={markerWayPoints[1]}
        mode="WALKING"
        strokeWidth={5}
        strokeColor="hotpink"
        // waypoints={markerWayPoints}
        apikey={GOOGLE_MAPS_APIKEY}
        onReady={(result) => {
          setDistanceA(result.distance);
        }}
      />
      <MapViewDirections
        origin={markerWayPoints[1]}
        destination={markerWayPoints[2]}
        mode="WALKING"
        strokeWidth={5}
        strokeColor="blue"
        // waypoints={markerWayPoints}
        apikey={GOOGLE_MAPS_APIKEY}
        onReady={(result) => {
          setDistanceB(result.distance);
        }}
      />
      <MapViewDirections
        origin={markerWayPoints[2]}
        destination={markerWayPoints[3]}
        mode="WALKING"
        strokeWidth={5}
        strokeColor="orange"
        // waypoints={markerWayPoints}
        apikey={GOOGLE_MAPS_APIKEY}
        onReady={(result) => {
          setDistanceC(result.distance);
        }}
      />
    </>
  );
}
