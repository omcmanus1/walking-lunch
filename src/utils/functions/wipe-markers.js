export const wipeMarkers = (setA, setB) => {
  setA({
    coords: { latitude: 0, longitude: 0 },
    name: "not_set",
  });
  setB({
    coords: { latitude: 0, longitude: 0 },
    name: "not_set",
  });
};
