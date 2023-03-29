export default function GeocodeAddress() {
  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
  };

  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.longitude,
      latitude: location.latitude,
    });
  };

  return (
    <>
      <TextInput
        placeholder=" Input Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Geocode Address" onPress={geocode} />
      <Button
        title="Reverse Geocode Current Location"
        onPress={reverseGeocode}
      />
    </>
  );
}
