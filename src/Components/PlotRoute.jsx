import MapViewDirections from "react-native-maps-directions";

export default function PlotRoute({ origin, destination, GOOGLE_MAPS_APIKEY }) {
  return (
    <MapViewDirections
      origin={origin}
      destination={destination}
      mode="WALKING"
      strokeWidth={5}
      strokeColor="hotpink"
      waypoints={["Trafford Centre"]}
      apikey={GOOGLE_MAPS_APIKEY}
    />
  );
}
