import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StartWalk from "./src/Components/StartWalk";
import UserPastWalks from "./src/Components/UserPastWalks";
import SetRoute from "./src/Components/SetRoute";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
// import AndroidSafeView from "./src/Components/AndroidSafeview";
// import { SafeAreaView } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  const [POIPlaces, setPOIPlaces] = useState([]);
  const [kmh, setKmh] = useState(4.5);
  const [totalDuration, setTotalDuration] = useState(0);
  const [location, setLocation] = useState();
  const [markerLocations, setMarkerLocations] = useState([]);
  const [journeyDistancesDurations, setJourneyDistancesDurations] = useState(
    []
  );
  const [lastLegWalkingDuration, setLastLegWalkingDuration] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Set Route"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Set Route") {
              iconName = focused ? "pin" : "pin-outline";
            } else if (route.name === "User") {
              iconName = focused ? "person-circle-outline" : "person-circle";
            } else if (route.name === "Start Walk") {
              iconName = focused ? "walk-outline" : "walk";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Set Route">
          {() => (
            <SetRoute
              POIPlaces={POIPlaces}
              setPOIPlaces={setPOIPlaces}
              kmh={kmh}
              setKmh={setKmh}
              totalDuration={totalDuration}
              setTotalDuration={setTotalDuration}
              location={location}
              setLocation={setLocation}
              markerLocations={markerLocations}
              setMarkerLocations={setMarkerLocations}
              journeyDistancesDurations={journeyDistancesDurations}
              setJourneyDistancesDurations={setJourneyDistancesDurations}
              lastLegWalkingDuration={lastLegWalkingDuration}
              setLastLegWalkingDuration={setLastLegWalkingDuration}
              totalDistance={totalDistance}
              setTotalDistance={setTotalDistance}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Start Walk">
          {() => (
            <StartWalk
              kmh={kmh}
              setKmh={setKmh}
              totalDuration={totalDuration}
              setTotalDuration={setTotalDuration}
              location={location}
              markerLocations={markerLocations}
              journeyDistancesDurations={journeyDistancesDurations}
              lastLegWalkingDuration={lastLegWalkingDuration}
              totalDistance={totalDistance}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="User">
          {() => <UserPastWalks totalDistance={totalDistance} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
