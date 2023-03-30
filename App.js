import { Button, StyleSheet, Text, View, TextInput } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartWalk from "./src/Components/StartWalk";
import UserPastWalks from "./src/Components/UserPastWalks";
import Home from "./Home";
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { GeocodeAddress } from "./Components/GeocodeAddress";

const Tab = createBottomTabNavigator();


export default function App() {

  return( 

  <NavigationContainer>
  <Tab.Navigator  
  initialRouteName="Start Walk"
  
  screenOptions={({ route }) => ({
    headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
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
          
    <Tab.Screen name="Start Walk" component={StartWalk} />
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="User" component={UserPastWalks} />
  </Tab.Navigator>
  </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "90%",
    height: "40%",
  },
});
