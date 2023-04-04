import { Button } from "@react-native-material/core";
import { wipeMarkers } from "../utils/functions/wipe-markers";

export default function RemoveMarkers({ setWaypointA, setWaypointB }) {
  return (
    <Button
      style={{ backgroundColor: "#79bd6a", margin: 3 }}
      onPress={() => {
        wipeMarkers(setWaypointA, setWaypointB);
      }}
      title="Reset"
      accessibilityLabel="Click to remove your current waypoints"
    />
  );
}
