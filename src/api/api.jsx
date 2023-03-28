import axios from "axios";

const googleMapsAPI = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
  });
  
  export const fetchAllFood = (location) => {
    let path =
      "keyword=Dog&location=53.4721341%2C-2.2377251&radius=200&type=restaurant&opennow=true&key=AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";
    console.log(location)
    return googleMapsAPI.get(path).then(({ data }) => {
      //console.log(data);
      return data.results;
    });
  };
// API Call for Landmarks, needs keywords setting
  export const fetchAllAttractions = () => {
    let path =
      "keyword=food&location=53.4721341%2C-2.2377251&radius=100&type=restaurant&key=AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";
    // change path to be attractions
    return googleMapsAPI.get(path).then(({ data }) => {
      //console.log(data);
      return data.results;
    });
  };