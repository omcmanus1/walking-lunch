import React, { useState, useEffect } from "react";
import { fetchAllFood } from "../api/api";
import { Marker, Callout } from "react-native-maps";
import { Text, Image, Button, View } from "react-native";

export const FoodMarkers = ({
  location,
  GOOGLE_MAPS_APIKEY,
  setWaypointA,
  setWaypointB,
}) => {
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [testArray, setTestArray] = useState([]);

  useEffect(() => {
    fetchAllFood(location, GOOGLE_MAPS_APIKEY).then((data) => {
      setFoodPlaces(data);
    });
  }, []);

  const getEmojiForRating = (rating) => {
    if (rating >= 4.5) {
      return "🌟🌟🌟🌟🌟";
    } else if (rating >= 4) {
      return "🌟🌟🌟🌟";
    } else if (rating >= 3) {
      return "🌟🌟🌟";
    } else if (rating >= 2) {
      return "🌟🌟";
    } else if (rating >= 1) {
      return "🌟";
    } else {
      return "None";
    }
  };

  const getEmojiForPrice = (rating) => {
    if (rating >= 4.5) {
      return "💸 💸 💸 💸 💸 ";
    } else if (rating >= 4) {
      return "💸 💸 💸 💸";
    } else if (rating >= 3) {
      return "💸 💸 💸 ";
    } else if (rating >= 2) {
      return "💸 💸";
    } else if (rating >= 1) {
      return "💸";
    } else {
      return "N/A";
    }
  };

  const handleAddDestination = (destinationCoords) => {
    setTestArray([...testArray, destinationCoords]);
    alert("Destination added to route!");
  };

  return (
    <>
      {foodPlaces.map((eatery) => {
        return (
          <Marker
            tooltip={true}
            pinColor="#123"
            key={eatery.place_id}
            title={eatery.name}
            description={` ${eatery.price_level} Rating:${eatery.rating}`}
            coordinate={{
              latitude: eatery.geometry.location.lat,
              longitude: eatery.geometry.location.lng,
            }}
          >
            <Image source={require("../../assets/food.png")} />
            <Callout
              onPress={() => {
                handleAddDestination({
                  latitude: eatery.geometry.location.lat,
                  longitude: eatery.geometry.location.lng,
                });
              }}
              style={{ flex: -1, position: "absolute", width: 300 }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontWeight: "bold" }}>
                  {eatery.name}
                </Text>
                <Text>{eatery.vicinity}</Text>
                <Text>Price Level:{getEmojiForPrice(eatery.price_level)} </Text>
                <Text>Rating:{getEmojiForRating(eatery.rating)}</Text>

                {eatery.photos && eatery.photos.length > 0 ? (
                  <Text>
                    <Image
                      resizeMode="cover"
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${eatery.photos[0].photo_reference}&key=${GOOGLE_MAPS_APIKEY}`,

                        // uri: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Test.gif",
                      }}
                    />
                  </Text>
                ) : null}

                <Button title="Add destination" />
              </View>
            </Callout>
          </Marker>
        );
      })}
    </>
  );
};

export default FoodMarkers;
