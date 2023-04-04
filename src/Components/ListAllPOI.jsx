import {
  Text,
  FlatList,
  Pressable,
  Alert,
  SafeAreaView,
  View,
} from "react-native";
import { Chip } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { addWaypoints } from "../utils/functions/add-waypoints";

export const ListAllPOI = ({
  POIPlaces,
  setWaypointA,
  setWaypointB,
  setShowPlaces,
  showPlaces,
}) => {
  const renderItem = ({ item }) => (
    <Chip
      key={item.name}
      style={{
        width: "auto",
        // flexWrap: "wrap",
        // flexDirection: "row",
        margin: 5,
        backgroundColor: "#d5e3d7",
        // justifyContent: "space-between",
      }}
      onPress={() => {
        addWaypoints(
          setWaypointA,
          setWaypointB,
          {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          },
          item.name,
          setShowPlaces,
          showPlaces
        );
      }}
    >
      📷 {item.name}
    </Chip>
  );
  return (
    <View
      style={{
        flexDirection: "column",
        maxWidth: 400,
        height: 190,
        alignItems: "center",
        flexWrap: "wrap",
        margin: 5,
      }}
    >
      <FlatList
        data={POIPlaces}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};
