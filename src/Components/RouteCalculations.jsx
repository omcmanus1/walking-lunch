import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function RouteCalculations({ distances, kmh }) {
  // work out how to show only destinations from the api request that are walkable in the time given by the user
  const [journeyDistancesDurations, setJourneyDistancesDurations] = useState(
    []
  );
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalWalkingDuration, setTotalWalkingDuration] = useState(0);

  let totalDur = 0;

  const convertTotalMins = (totalMins) => {
    const hours = Math.floor(totalMins / 60);
    const mins = Math.floor(totalMins % 60);
    return { hours, mins };
  };

  const calculateWalkingDuration = (distance, kmh) => {
    const totalMins = Math.round((distance / kmh) * 60);
    totalDur += totalMins;
    const convertedTotalMins = convertTotalMins(totalMins);
    return convertedTotalMins;
  };
  // ^^ calculations for walking duration based on selected walking speed

  useEffect(() => {
    let id = 0;
    let totalKm = 0;
    const journeys = distances.map((distance) => {
      const duration = calculateWalkingDuration(distance, kmh);
      id++;
      totalKm += distance;
      return { journey_id: id, distance, duration };
    });
    setJourneyDistancesDurations(journeys);
    setTotalDistance(totalKm);
    const convertedTotalDur = convertTotalMins(totalDur);
    setTotalWalkingDuration(convertedTotalDur);
  }, [distances, kmh]);

  if (!journeyDistancesDurations) {
    return <Text>Calculating distances...</Text>;
  }

  return (
    <View>
      {journeyDistancesDurations.map((journey) => {
        return (
          <View key={journey.journey_id}>
            <Text>Journey {journey.journey_id}:</Text>
            <Text>Distance: {journey.distance} km</Text>
            {journey.duration.hours ? (
              <Text>
                Walking Duration: {journey.duration.hours} hours{" "}
                {journey.duration.mins} mins{" "}
              </Text>
            ) : (
              <Text>Walking Duration: {journey.duration.mins} mins </Text>
            )}
          </View>
        );
      })}
      <Text>Total Distance: {totalDistance}</Text>
      {totalWalkingDuration.hours ? (
        <Text>
          Total Walking Duration: {totalWalkingDuration.hours} hours{" "}
          {totalWalkingDuration.mins} mins{" "}
        </Text>
      ) : (
        <Text>Total Walking Duration: {totalWalkingDuration.mins} mins </Text>
      )}
    </View>
  );
}
