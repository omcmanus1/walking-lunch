import {
  Text,
  FlatList,
  Pressable,
  Alert,
  SafeAreaView,
  View,
} from "react-native";
import { Chip } from "@rneui/themed";
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
      title={item.name}
      type="outline"
      containerStyle={{ flexDirection: "row" }}
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
    />
  );

  return (
    <View>
      <FlatList
        data={POIPlaces}
        renderItem={renderItem}
        style={{ flexDirection: "row" }}
      />
    </View>
  );
};
