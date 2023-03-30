import { Button } from "react-native";

export default function RemoveMarkers({
  setMarkerLocations,
  origin,
  setWaypointA,
  setWaypointB,
}) {
  const wipeMarkers = () => {
    // make util file to house markers (also for PlotMarkers)??
    setWaypointA({})
    setWaypointB({})
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
