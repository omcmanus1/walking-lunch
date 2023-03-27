## Marker

add Marker from react-native maps- Destructure!

need key and coordinate attribute

or use array and map over

## Directions

NC
"latitude": 53.4721341, "longitude": -2.2377251,

Home
latitude": 53.636325899999996, "longitude": -2.3278136

https://github.com/methodbox/rn-maps-directions-expo

# Get places via axios

## places

https://developers.google.com/maps/documentation/places/web-service/details#maps_http_places_details_fields-txt

https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U

returns
{
"html_attributions": [],
"result": {
"formatted_phone_number": "(02) 9374 4000",
"name": "Google Workplace 6",
"rating": 4
},
"status": "OK"
}

## free data WARNING

Web service: address_component, adr_address, business_status, formatted_address, geometry, icon, name, permanently_closed, photo, place_id, plus_code, type, url, utc_offset, vicinity, or wheelchair_accessible_entrance

https://developers.google.com/maps/documentation/places/web-service/usage-and-billing/

https://maps.googleapis.com/maps/api/place/nearbysearch/json
?keyword=food
&location=-2.2377251%53.4721341
&radius=150
&type=restaurant
&key=AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U

https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=food&location=-33.8670522%2C151.1957362&radius=150&type=restaurant&key=AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U

https://developers.google.com/maps/documentation/places/web-service/search-nearby
returns results for machester

https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=food&location=53.4721341%2C-2.2377251&radius=10&type=restaurant&key=AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U

https://sunnychopper.medium.com/how-to-use-axios-to-quickly-connect-to-an-api-in-your-react-native-application-a69c1c048f8e

# Search for a specific destination and set a marker for it:

https://www.youtube.com/watch?v=qlELLikT3FU&t=10s
