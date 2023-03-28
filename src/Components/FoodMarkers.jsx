import { fetchAllFood } from "../api/api";
import { useState, useEffect } from "react";
import { Marker, Callout, Text } from "react-native-maps";
import { View } from "react-native";


export const FoodMarkers = () => {
const [foodPlaces, setFoodPlaces] = useState([]);

useEffect(() => {
    fetchAllFood().then((data) => {
      setFoodPlaces(data);
    });
  }, []);

 return (
    <>{foodPlaces.map((eatery) => {
    console.log(eatery.geometry.location.lat)
    return (
      
      <Marker
        pinColor="#123"
        key={eatery.place_id}
        title={eatery.name}
        description = {`Price Level ${eatery.price_level} Rating:${eatery.rating}`}
        coordinate={{
          latitude: eatery.geometry.location.lat,
          longitude: eatery.geometry.location.lng,
        }}
      >
        {/* <Callout key={eatery.place_id}>
          name={eatery.name}
        </Callout> */}

       
       
      </Marker>
      
    );
  })
    
    }</>)
}


// export default FoodMarkers

