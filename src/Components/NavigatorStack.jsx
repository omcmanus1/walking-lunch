import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import StartTimer from "./StartTimer";



const Stack = createStackNavigator();

export const RouteMapView = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start Walk" component={StartTimer} />
    </Stack.Navigator>
  );
}