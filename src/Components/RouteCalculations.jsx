import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";

export default function RouteCalculations({
  distances,
  kmh,
  showRoute,
  setShowRoute,
  totalDistance,
  setTotalDistance,
}) {
  const [journeyDistancesDurations, setJourneyDistancesDurations] = useState(
    []
  );

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

  const longerThanHourAlert = () => {
    Alert.alert("Warning!", "Your route will take longer than an hour!", [
      {
        text: "Select alternative destinations",
        onPress: () => {
          console.log("this callback function needs to reset markerLocations");
          // ^^ NEED TO ADD FUNCTIONALITY TO RESET MARKERLOCATIONS AND START AGAIN
        },
        style: "cancel",
      },
      {
        text: "It's okay, I have the time",
        onPress: () => {
          setShowRoute(true);
        },
        style: "ok",
      },
    ]);
  };

  const longerThan45MinsAlert = (journeyTime) => {
    Alert.alert(
      "Warning!",
      `Your route will take ${journeyTime} mins to walk. You may not have time to fit everything into your lunch break!`,
      [
        {
          text: "Select alternative destinations",
          onPress: () => {
            console.log(
              "this callback function needs to reset markerLocations"
              // ^^ NEED TO ADD FUNCTIONALITY TO RESET MARKERLOCATIONS AND START AGAIN
            );
          },
          style: "cancel",
        },
        {
          text: "It's okay, I have the time",
          onPress: () => {
            setShowRoute(true);
          },
          style: "ok",
        },
      ]
    );
  };

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

  useEffect(() => {
    if (totalWalkingDuration.hours) {
      setShowRoute(false);
      longerThanHourAlert();
    } else if (totalWalkingDuration.mins >= 45) {
      setShowRoute(false);
      longerThan45MinsAlert(totalWalkingDuration.mins);
    }
  }, [totalWalkingDuration]);

  if (!journeyDistancesDurations) {
    return <Text>Calculating distances...</Text>;
  }

  return (
    <>
      {showRoute ? (
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
            <Text>
              Total Walking Duration: {totalWalkingDuration.mins} mins{" "}
            </Text>
          )}
        </View>
      ) : null}
    </>
  );
}
