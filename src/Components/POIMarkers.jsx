import { fetchAllPOI } from "../api/api";
import React, { useEffect } from "react";
import { Marker, Callout } from "react-native-maps";
import { Text, Image, View } from "react-native";
import { addWaypoints } from "../utils/functions/add-waypoints";
import { Button } from "@react-native-material/core";

export const POIMarkers = ({
  location,
  GOOGLE_MAPS_APIKEY,
  POIPlaces,
  setPOIPlaces,
  setWaypointA,
  setWaypointB,
  setShowPlaces,
  showPlaces,
}) => {
  useEffect(() => {
    fetchAllPOI(location, GOOGLE_MAPS_APIKEY).then((data) => {
      setPOIPlaces(data);
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

  return (
    <>
      {POIPlaces.map((POI) => {
        return (
          <Marker
            tooltip={true}
            key={POI.place_id}
            title={POI.name}
            coordinate={{
              latitude: POI.geometry.location.lat,
              longitude: POI.geometry.location.lng,
            }}
          >
            <Image source={require("../../assets/camerasmall.png")} />

            <Callout
              onPress={() => {
                addWaypoints(
                  setWaypointA,
                  setWaypointB,
                  {
                    latitude: POI.geometry.location.lat,
                    longitude: POI.geometry.location.lng,
                  },
                  POI.name,
                  setShowPlaces,
                  showPlaces
                );
              }}
              style={{ flex: -1, position: "absolute", width: 300 }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontWeight: "bold" }}>
                  {POI.name}
                </Text>
                <Text>{POI.vicinity}</Text>

                <Text>Rating:{getEmojiForRating(POI.rating)}</Text>

                {POI.photos && POI.photos.length > 0 ? (
                  <Text>
                    <Image
                      resizeMode="cover"
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${POI.photos[0].photo_reference}&key=${GOOGLE_MAPS_APIKEY}`,

                        // uri: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Test.gif",
                      }}
                    />
                  </Text>
                ) : null}

                <Button
                  style={{ backgroundColor: "#79bd6a" }}
                  title="Add Point of Interest"
                />
              </View>
            </Callout>
          </Marker>
        );
      })}
    </>
  );
};
