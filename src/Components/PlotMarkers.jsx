import { Marker } from "react-native-maps";

export default function PlotMarkers() {
  // this is an array of locations to set as markers
  const markerLocations = [
    { id: 1, coordinate: { latitude: 53.472114, longitude: -2.237752 } },
    { id: 2, coordinate: { latitude: 53.486475, longitude: -2.264716 } },
  ];

  return (
    <>
      {markerLocations.map((location) => {
        return <Marker key={location.id} coordinate={location.coordinate} />;
      })}
      <Marker
        key="1"
        // this is plotting one hard coded marker rather than mapping over an array of locations to mark
        coordinate={{ latitude: 53.3869, longitude: -2.3489 }}
      />
    </>
  );
}
