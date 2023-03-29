import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable , Alert} from "react-native";
import { fetchSinglePOI } from "../api/api";


export const ListAllPOI = (POIPlaces, GOOGLE_MAPS_APIKEY) => {

const places = POIPlaces.POIPlaces
const [singlePlace, setSinglePlace] = useState([])

useEffect(()=>{
    fetchSinglePOI().then((data)=> {
        setSinglePlace(data)
        console.log(data)
    })
},[])


return(

    //  <FlatList
    //   data={place}
    //   renderItem= 
    //   {({item}) => 
    //   <Pressable onPress={()=>{console.log("Button pressed")}}>
    //   <Text >{item.name}</Text>
    //   </Pressable>
    //   }
    // />

//     <FlatList
//     data={place}
//     renderItem= 
//     {({item}) => 
//     <Pressable onPress={()=>{
//         Alert.alert(
//             item.name,
//             item.place_id,
//             [
//               {
//                 text: "Close",
//                 onPress: () => console.log(item.place_id,"Closed pressed")
//               },
//               {
//                 text: "Add to route",
//                 onPress: () => console.log("Add to route Pressed"),
//                 style: "cancel"
//               },
//               { text: "Nope", onPress: () => console.log("Nope Pressed") }
//             ],
//             { cancelable: false }
//           );
//     }}>
//     <Text >{item.name}</Text>
//     </Pressable>
//     }
//   />



<FlatList
    data={places}
    renderItem= 
    {({item}) => 
    <Pressable onPress={()=>{
        // fetchSinglePOI(item.place_id,GOOGLE_MAPS_APIKEY).then((data)=>{
        //     setSinglePlace(data)
        //     console.log(data, "SIngle Place")
        // }).then(()=>{
        //     console.log(singlePlace, "POI Data")
      
        Alert.alert(
            
            item.name,
            item.place_id,
            [
              {
                text: "Close",
                onPress: () => console.log(singlePlace,"Closed pressed")
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
        //})
    }}>
    <Text >{item.name}</Text>
    </Pressable>
    }
  />
   
      
    
 




)
}