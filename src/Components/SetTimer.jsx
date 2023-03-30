import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import Slider from "@react-native-community/slider";

export default function SetTimer() {

  const [sliderValue, setSliderValue] = useState(0);
 

console.log(sliderValue);
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
            step={5}
            value={sliderValue}
            onValueChange={(value) => setSliderValue(value)}
          />
          {/* <Button title="" onPress={handlePress}></Button> */}
        </View>
    
    </View>
  );
}
