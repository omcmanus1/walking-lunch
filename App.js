import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartWalk from "./src/Components/StartWalk";
import UserPastWalks from "./src/Components/UserPastWalks";
import SetRoute from "./src/Components/SetRoute";
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from "react";

// import { GeocodeAddress } from "./Components/GeocodeAddress";

const Tab = createBottomTabNavigator();


export default function App() {
const [POIPlaces, setPOIPlaces] = useState([]);
const [secondsLeft, setSecondsLeft] = useState(0);
const [totalDuration, setTotalDuration] = useState(0);
  return( 

  <NavigationContainer>
  <Tab.Navigator  
  initialRouteName="Set Route"
  
  screenOptions={({ route }) => ({
    headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Set Route') {
              iconName = focused
                ? 'pin'
                : 'pin-outline';
            } else if (route.name === 'User') {
              iconName = focused ? 'person-circle-outline' : 'person-circle';
            } else if (route.name === 'Start Walk') {
              iconName = focused ? 'walk-outline' : 'walk';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
          
          <Tab.Screen name="Set Route" >
          {()=><SetRoute POIPlaces={POIPlaces} setPOIPlaces={setPOIPlaces} setSecondsLeft={setSecondsLeft} totalDuration={totalDuration} secondsLeft={secondsLeft}/>}
          </Tab.Screen>
          <Tab.Screen name="Start Walk" >
          {()=><StartWalk setSecondsLeft={setSecondsLeft} totalDuration={totalDuration} secondsLeft={secondsLeft} />}
          </Tab.Screen>
          <Tab.Screen name="User" component={UserPastWalks}  ></Tab.Screen>
    


  </Tab.Navigator>
  </NavigationContainer>
  )
}



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: "90%",
//     height: "40%",
//   },
// });
