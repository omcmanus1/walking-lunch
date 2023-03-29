import { Button } from "react-native";

export default function RemoveMarkers({
  setMarkerLocations,
  origin,
  waypointA,
  waypointB,
}) {
  const wipeMarkers = () => {
    // make util file to house markers (also for PlotMarkers)
    const markers = [
      {
        id: "start_point",
        coordinate: origin,
      },
      {
        id: "waypoint_1",
        coordinate: waypointA.latitude
          ? waypointA
          : { latitude: 0, longitude: 0 },
      },
      {
        id: "waypoint_2",
        coordinate: waypointB.latitude
          ? waypointB
          : { latitude: 0, longitude: 0 },
      },
      {
        id: "end_point",
        coordinate: origin,
      },
    ];
    setMarkerLocations(markers);
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
