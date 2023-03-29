import { useEffect } from "react";
import { Button } from "react-native";
import PlotMarkers from "./PlotMarkers";

export default function RemoveMarkers({ setMarkerLocations, markerLocations }) {
  const wipeMarkers = () => {
    setMarkerLocations(markerLocations.filter((marker) => marker.id === 0));
  };

  return (
    <Button
      onPress={wipeMarkers}
      title="Reset Waypoints"
      color="#841584"
      accessibilityLabel="Click to remove your current waypoints"
    />
  );
}
