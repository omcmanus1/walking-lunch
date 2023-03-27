import { useState, useEffect } from "react";
import { Marker } from "react-native-maps";

export default function PlotMarkers({searchedDestination}) {
  // this is an array of locations to set as markers
  const [markerLocations, setMarkerLocations] = useState([
    { id: 0, coordinate: { latitude: 53.472114, longitude: -2.237752 } },
    { id: 1, coordinate: { latitude: 53.486475, longitude: -2.264716 } },
  ])
  
  console.log(searchedDestination);

  useEffect(() => {
    if (searchedDestination !== null) {
      setMarkerLocations((prev) => [
        ...prev,
        {
          id: prev.length,
          coordinate: {
            latitude: markerLocations.latitude,
            longitude: markerLocations.longitude,
          },
        },
      ]);
    }
  }, [searchedDestination]);
 
  return (
    <>
      {markerLocations.map((location) => {
        return <Marker key={location.id} 
        coordinate={location.coordinate} />;
      })}
      <Marker
        key="1"
        // this is plotting one hard coded marker rather than mapping over an array of locations to mark
        coordinate={{ latitude: 53.3869, longitude: -2.3489 }}
      />
    </>
  );
}
