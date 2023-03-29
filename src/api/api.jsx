import axios from "axios";

const googleMapsAPI = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
  });
  
<<<<<<< HEAD
  export const fetchAllFood = (location) => {
    let path =
      "keyword=Dog&location=53.4721341%2C-2.2377251&radius=200&type=restaurant&opennow=true&key=AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";
    return googleMapsAPI.get(path).then(({ data }) => {
      return data.results;
    });
  };
// API Call for Landmarks, needs keywords setting
  export const fetchAllAttractions = () => {
    let path =
      "keyword=food&location=53.4721341%2C-2.2377251&radius=100&type=restaurant&key=AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";
    // change path to be attractions
    return googleMapsAPI.get(path).then(({ data }) => {
=======
  export const fetchAllFood = (location,GOOGLE_MAPS_APIKEY ) => {
    let path = 
      `keyword=food&location=${location.latitude}%2C${location.longitude}&radius=2000&type=restaurant&opennow=true&key=${GOOGLE_MAPS_APIKEY }`;
    
    return googleMapsAPI.get(path).then(({ data }) => {
    
      return data.results;
    });
  };

  export const fetchAllPOI = (location, GOOGLE_MAPS_APIKEY ) => {
    let POIpath =
    `keyword=&location=${location.latitude}%2C${location.longitude}&radius=2000&type=tourist_attraction|park&key=${GOOGLE_MAPS_APIKEY }`;
    
    return googleMapsAPI.get(POIpath).then(({ data }) => {
     
>>>>>>> af17e15ca080be31d6809868557803a0de4acc04
      return data.results;
    });
  };