export const addWaypoints = (whichWaypoint, coords) => {


  const markersTemplate = [
    {
      id: "start_point",
      coordinate: origin,
    },
    {
      id: "waypoint_1",
      coordinate: waypointA.latitude
        ? waypointA
        : { latitude: 0, longitude: 0 },
    },
    {
      id: "waypoint_2",
      coordinate: waypointB.latitude
        ? waypointB
        : { latitude: 0, longitude: 0 },
    },
    {
      id: "end_point",
      coordinate: origin,
    },
  ];
};
