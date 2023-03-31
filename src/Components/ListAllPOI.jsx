import { Text, FlatList, Pressable, Alert, SafeAreaView } from "react-native";

import { addWaypoints } from "../utils/functions/add-waypoints";

export const ListAllPOI = ({
  POIPlaces,
  setWaypointA,
  setWaypointB,
  setWhichList,
}) => {
  return (
    <FlatList
      data={POIPlaces}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            addWaypoints(
              setWaypointA,
              setWaypointB,
              {
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
              },
              item.name
            );
            setWhichList(false);
          }}
        >
          <Text>{item.name}</Text>
        </Pressable>
      )}
    />
  );
};
