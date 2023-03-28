import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useEffect, useState } from "react";
import CountDown from "react-native-countdown-component";
import Slider from "@react-native-community/slider";

export default function Timer() {
  const [totalDuration, setTotalDuration] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [showSetMinsForm, setShowSetMinsForm] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [showHurryMsg, setShowHurryMsg] = useState(false);
  const [finalJourneyTimeSecs, setFinalJourneyTimeSecs] = useState(900);
  // ^^ finalJourneyTimeSecs state is temp hard coded for now, need to get this data from waypoints array - walking duration of second to last waypoint to final waypoint (back to origin)

  useEffect(() => {
    if (secondsLeft === finalJourneyTimeSecs) {
      setShowHurryMsg(true);
    } else setShowHurryMsg(false);
  }, [secondsLeft]);

  const handlePress = () => {
    const totalSecs = sliderValue * 60;
    // ^^ converts user inputted mins to seconds
    setTotalDuration(totalSecs);
    setSecondsLeft(totalSecs);
    setShowSetMinsForm(false);
    setShowTimer(true);
  };

  const handleReset = () => {
    setTotalDuration(0);
    setShowSetMinsForm(true);
    setShowTimer(false);
    setSecondsLeft(0);
    setSliderValue(0);
  };

  return (
    <View>
      {showSetMinsForm ? (
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
          <Button title="Start walking lunch!" onPress={handlePress}></Button>
        </View>
      ) : null}
      {showTimer ? (
        <View>
          <Text>Time left: </Text>
          <CountDown
            until={totalDuration}
            timeToShow={["M", "S"]}
            onFinish={() =>
              alert(
                "Your walking lunch is up! Hopefully you're now back where you started! Have a nice afternoon :)"
              )
            }
            onChange={() => setSecondsLeft((currSecs) => currSecs - 1)}
            size={20}
          />
          {/* <Button title="Reset timer" onPress={handleReset}></Button> */}
        </View>
      ) : null}
      {showHurryMsg ? (
        <Text>You need to start walking back to the office now!</Text>
      ) : null}
    </View>
  );
}
