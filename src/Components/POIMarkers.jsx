import { fetchAllPOI } from "../api/api";
import { useState, useEffect } from "react";
import { Marker } from "react-native-maps";

export const POIMarkers = ({ location, GOOGLE_MAPS_APIKEY }) => {
  const [POIPlaces, setPOIPlaces] = useState([]);

  useEffect(() => {
    fetchAllPOI(location, GOOGLE_MAPS_APIKEY).then((data) => {
      setPOIPlaces(data);
    });
  }, []);

  return (
    <>
      {POIPlaces.map((POI) => {
        return (
          <Marker
            pinColor="#321"
            key={POI.place_id}
            title={POI.name}
            //description = {`Some descritipn`}
            coordinate={{
              latitude: POI.geometry.location.lat,
              longitude: POI.geometry.location.lng,
            }}
          ></Marker>
        );
      })}
    </>
  );
};
