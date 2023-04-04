import MapView, { AnimatedRegion, Animated } from "react-native-maps";

export const focusOnMarker = (location, setRegion) => {
  const latitudeDelta = 0.01;
  const longitudeDelta = 0.01;
  const region = { ...location, latitudeDelta, longitudeDelta };
  setRegion(region)
};
