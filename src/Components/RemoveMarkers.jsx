import { Button } from "react-native";

export default function RemoveMarkers({ setMarkerLocations, markerLocations }) {
  const wipeMarkers = () => {
    setMarkerLocations(
      markerLocations.filter((marker) => marker.id === "origin_location")
    );
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
