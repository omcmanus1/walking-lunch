import { Alert } from "react-native";

export const addWaypoints = (
  setA,
  setB,
  coords,
  name,
  listSetter,
  listGetter
) => {
  Alert.alert("Add Destination", "Is this your first or second stop?", [
    {
      text: "Cancel",
      onPress: () => {},
    },
    {
      text: "Stop 1",
      onPress: () => {
        setA({ coords: coords, name: name });
        listSetter(!listGetter);
      },
    },
    {
      text: "Stop 2",
      onPress: () => {
        setB({ coords: coords, name: name });
        listSetter(!listGetter);
      },
    },
  ]);
};
