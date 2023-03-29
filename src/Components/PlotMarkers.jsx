import { useEffect } from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";

export default function PlotMarkers({
  searchedDestination,
  markerLocations,
  setMarkerLocations,
}) {
  useEffect(() => {
    if (Object.keys(searchedDestination).length) {
      const newMarker = {
        id: markerLocations.length,
        coordinate: {
          latitude: searchedDestination.latitude,
          longitude: searchedDestination.longitude,
        },
      };
      setMarkerLocations([...markerLocations, newMarker]);
    }
  }, [searchedDestination]);

  return (
    <View>
      {markerLocations.map((location) => {
        console.log(location);
        return <Marker key={location.id} coordinate={location.coordinate} />;
      })}
    </View>
  );
}
