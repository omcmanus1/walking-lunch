import MapViewDirections from "react-native-maps-directions";
import { useState, useEffect } from "react";

export default function PlotRoute({
  GOOGLE_MAPS_APIKEY,
  markerLocations,
  setDistances,
}) {
  const [distanceA, setDistanceA] = useState(0);
  const [distanceB, setDistanceB] = useState(0);
  const [distanceC, setDistanceC] = useState(0);

  useEffect(() => {
    setDistances([distanceA, distanceB, distanceC]);
  }, [distanceA, distanceB, distanceC]);

  console.log("markerLocations -->", markerLocations);
  return (
    <>
      <MapViewDirections
        origin={markerLocations[0].coordinate}
        destination={markerLocations[1].coordinate}
        mode="WALKING"
        strokeWidth={5}
        strokeColor="hotpink"
        apikey={GOOGLE_MAPS_APIKEY}
        onReady={(result) => {
          setDistanceA(result.distance);
        }}
      />
      <MapViewDirections
        origin={markerLocations[1].coordinate}
        destination={markerLocations[2].coordinate}
        mode="WALKING"
        strokeWidth={5}
        strokeColor="blue"
        apikey={GOOGLE_MAPS_APIKEY}
        onReady={(result) => {
          setDistanceB(result.distance);
        }}
      />
      <MapViewDirections
        origin={markerLocations[2].coordinate}
        destination={markerLocations[3].coordinate}
        mode="WALKING"
        strokeWidth={5}
        strokeColor="orange"
        apikey={GOOGLE_MAPS_APIKEY}
        onReady={(result) => {
          setDistanceC(result.distance);
        }}
      />
    </>
  );
}
