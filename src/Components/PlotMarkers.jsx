import { useEffect } from "react";
import { Marker } from "react-native-maps";

export default function PlotMarkers({
  origin,
  searchedDestination,
  markerLocations,
  setMarkerLocations,
}) {
  console.log(markerLocations);
  useEffect(() => {
    if (Object.keys(origin).length !== 1) {
      const markers = [
        {
          id: "start_point",
          coordinate: origin,
        },
        {
          id: "waypoint_1",
          coordinate: { latitude: 0, longitude: 0 },
        },
        {
          id: "waypoint_2",
          coordinate: { latitude: 0, longitude: 0 },
        },
        {
          id: "end_point",
          coordinate: origin,
        },
      ];
      setMarkerLocations(markers);
    }
  }, [origin]);

  useEffect(() => {
    if (Object.keys(searchedDestination).length) {
      const newMarker = {
        id: `searched_${markerLocations.length}`,
        coordinate: {
          latitude: searchedDestination.latitude,
          longitude: searchedDestination.longitude,
        },
      };
      setMarkerLocations([...markerLocations, newMarker]);
    }
  }, [searchedDestination]);

  return (
    <>
      {markerLocations.map((location) => {
        return <Marker key={location.id} coordinate={location.coordinate} />;
      })}
    </>
  );
}
