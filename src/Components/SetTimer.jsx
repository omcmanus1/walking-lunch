import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";

export default function SetTimer({ setTotalDuration }) {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const totalSecs = sliderValue * 60;
    setTotalDuration(totalSecs);
  }, [sliderValue]);

  return (
    <View>
      <View>
        <Text
          style={{ fontSize: 18, padding: 15, margin: 10, textAlign: "center" }}
        >
          How much time do you have?
        </Text>
        <Text style={{ textAlign: "center", fontSize: 15 }}>
          {sliderValue} mins
        </Text>
        <Slider
          style={{ width: 300, height: 60, alignContent: "center" }}
          minimumValue={0}
          maximumValue={60}
          minimumTrackTintColor="green"
          maximumTrackTintColor="#000000"
          step={5}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
        />
      </View>
    </View>
  );
}
