import { Button } from "react-native";
import { wipeMarkers } from "../utils/functions/wipe-markers";

export default function RemoveMarkers({ setWaypointA, setWaypointB }) {
  return (
    <Button
      onPress={() => {
        wipeMarkers(setWaypointA, setWaypointB);
      }}
      title="Reset Waypoints"
      color="#841584"
      accessibilityLabel="Click to remove your current waypoints"
    />
  );
}
