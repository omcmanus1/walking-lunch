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
        <Text>How long do you have?</Text>
        <Text>{sliderValue} mins</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={60}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="#000000"
          step={1}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
        />
      </View>
    </View>
  );
}
