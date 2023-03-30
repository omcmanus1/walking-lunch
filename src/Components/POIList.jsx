import {  Text, FlatList, Pressable , Alert} from "react-native";
export const ListAllPOI = (POIPlaces) => {

const places = POIPlaces.POIPlaces

return(


    <FlatList
    data={places}
    renderItem= 
    {({item}) => 
    <Pressable onPress={()=>{
        Alert.alert(
            item.name,
            item.place_id,
            [
              {
                text: "Close",
                onPress: () => console.log(item.place_id,"Closed pressed")
              },
              {
                text: "Add to route",
                onPress: () => console.log("Add to route Pressed"),
                style: "cancel"
              },
              { text: "Nope", onPress: () => console.log("Nope Pressed") }
            ],
            { cancelable: false }
          );
    }}>
    <Text >{item.name}</Text>
    </Pressable>
    }
  />
)
}