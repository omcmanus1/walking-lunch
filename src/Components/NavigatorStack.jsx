import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Map from "./Map";

const Stack = createStackNavigator();

export const RouteMapView = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Map Route" 
      component={Map} />
    </Stack.Navigator>
  );
}