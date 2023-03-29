import { Button } from "react-native";

export default function RemoveMarkers({ setMarkerLocations }) {
  const wipeMarkers = () => {
    setMarkerLocations([]);
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
