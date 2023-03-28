import { fetchAllFood } from "../api/api";
import { useState, useEffect } from "react";
import { Marker } from "react-native-maps";



export const FoodMarkers = ({location, GOOGLE_MAPS_APIKEY }) => {
const [foodPlaces, setFoodPlaces] = useState([]);

useEffect(() => {
    fetchAllFood(location, GOOGLE_MAPS_APIKEY ).then((data) => {
      setFoodPlaces(data);
    });
  }, []);

 return (
    <>{foodPlaces.map((eatery) => {
    
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

