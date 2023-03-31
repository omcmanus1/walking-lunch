
export default function StartTimer(){
 
    const [totalDuration, setTotalDuration] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
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
  return(
    <View>
    <View>
      <Text>Time left: </Text>
      <CountDown
        until={totalDuration}
        timeToShow={[“M”, “S”]}
        onFinish={() =>
          alert(
            "Your walking lunch is up! Hopefully you are now back where you started! Have a nice afternoon :)"
          )
        }
        onChange={() => setSecondsLeft((currSecs) => currSecs - 1)}
        size={20}
      />
      {/* <Button title={“Reset timer”} onPress={handleReset}></Button> */}
      </View>
  


  


{showHurryMsg ? (
    <Text>You need to start walking back to the office now!</Text>
  ) : null}

</View>
)}

