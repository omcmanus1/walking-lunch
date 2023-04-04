import { FlatList, Pressable, Text, View } from "react-native";
import { Chip } from "@rneui/themed";
import { addWaypoints } from "../utils/functions/add-waypoints";

export const ListAllRestaurants = ({
  foodPlaces,
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
      containerStyle={{ flexDirection: "row", margin: 1 }}
      onLongPress={()=>{console.log("LongPress")}}
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
      <FlatList data={foodPlaces} renderItem={renderItem} />
    </View>
  );
};
