import { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { wipeMarkers } from "../utils/functions/wipe-markers";

export default function RouteCalculations({
  distances,
  kmh,
  setShowRoute,
  journeyDistancesDurations,
  setJourneyDistancesDurations,
  setLastLegWalkingDuration,
  totalDistance,
  setTotalDistance,
  setWaypointA,
  setWaypointB,
  setShowStartJourneyModal,
  totalDuration,
  markerLocations,
}) {
  const [totalWalkingDuration, setTotalWalkingDuration] = useState(0);
  let totalDur = 0;
  const convertToHoursMins = (totalMins) => {
    const hours = Math.floor(totalMins / 60);
    const mins = Math.floor(totalMins % 60);
    return { hours, mins };
  };
  const convertBackToMins = (totalWalkingDuration) => {
    let mins = totalWalkingDuration.hours * 60 + totalWalkingDuration.mins;
    return mins;
  };
  const calculateWalkingDuration = (distance, kmh) => {
    const totalMins = Math.round((distance / kmh) * 60);
    totalDur += totalMins;
    return totalMins;
  };
  const journeyLengthAlert = (journeyTime) => {
    let plugTimeInMsg = "";
    if (journeyTime.hours > 1) {
      plugTimeInMsg = `${journeyTime.hours} hours and ${journeyTime.mins} minutes`;
    } else if (journeyTime.hours === 1) {
      plugTimeInMsg = `${journeyTime.hours} hour and ${journeyTime.mins} minutes`;
    } else if (!journeyTime.hours) {
      plugTimeInMsg = `${journeyTime.mins} minutes`;
    }
    Alert.alert(
      "Warning!",
      `Your route will take ${plugTimeInMsg} to walk! You might not be able to fit everything into your lunchtime.`,
      [
        {
          text: "Select alternative destinations",
          onPress: () => {
            wipeMarkers(setWaypointA, setWaypointB);
            setShowStartJourneyModal(false);
          },
          style: "cancel",
        },
        {
          text: "It's okay, I have the time",
          style: "ok",
        },
      ]
    );
  };

  useEffect(() => {
    const lastLegMins = calculateWalkingDuration(distances[2], kmh);
    setLastLegWalkingDuration(lastLegMins);
  }, [distances]);

  useEffect(() => {
    let id = 0;
    let totalKm = 0;
    const journeys = distances.map((distance) => {
      const totalMins = calculateWalkingDuration(distance, kmh);
      const duration = convertToHoursMins(totalMins);
      id++;
      totalKm += distance;
      return { journey_id: id, distance, duration };
    });
    setJourneyDistancesDurations(journeys);
    setTotalDistance(totalKm);
    const totalHoursMins = convertToHoursMins(totalDur);
    setTotalWalkingDuration(totalHoursMins);
  }, [distances, kmh]);

  useEffect(() => {
    const totalInMins = convertBackToMins(totalWalkingDuration);
    if (totalInMins >= totalDuration / 60) {
      setShowRoute(false);
      journeyLengthAlert(totalWalkingDuration);
    }
  }, [totalWalkingDuration, totalDuration]);

  if (!journeyDistancesDurations) {
    return <Text styles={styles.text}>Calculating distances...</Text>;
  }

  return (
    <>
      <View style={{ margin: 10 }}>
        {journeyDistancesDurations.map((journey, index) => {
          return (
            <View style={{ padding: 15 }} key={journey.journey_id}>
              <Text style={styles.journeyHeaders}>
                {index === 0
                  ? `Origin - ${markerLocations[index + 1].name}:`
                  : null}
                {index === 1
                  ? `${markerLocations[index].name} - ${
                      markerLocations[index + 1].name
                    }:`
                  : null}
                {index === 2 ? `${markerLocations[index].name} - End:` : null}
              </Text>
              <Text style={styles.text}>Distance: {journey.distance} km</Text>
              {journey.duration.hours ? (
                <Text style={styles.text}>
                  Walking Duration: {journey.duration.hours} hours{" "}
                  {journey.duration.mins} mins{" "}
                </Text>
              ) : (
                <Text style={styles.text}>
                  Walking Duration: {journey.duration.mins} mins{" "}
                </Text>
              )}
            </View>
          );
        })}
        <View style={{ margin: 20 }}>
          <Text style={styles.headers}>Total Distance</Text>
          <Text style={styles.totals}>{totalDistance} km</Text>
          {totalWalkingDuration.hours ? (
            <View>
              <Text style={styles.headers}>Total Walking Duration</Text>
              <Text style={styles.totals}>
                {totalWalkingDuration.hours} hour {totalWalkingDuration.mins}{" "}
                mins{" "}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.headers}>Total Walking Duration</Text>
              <Text style={styles.totals}>
                {totalWalkingDuration.mins} mins{" "}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  journeyHeaders: { fontSize: 14, textAlign: "center", fontStyle: "italic" },
  text: { fontSize: 14, textAlign: "center" },
  totals: { fontSize: 16, textAlign: "center" },
  headers: { fontWeight: "bold", fontSize: 16, textAlign: "center" },
});
