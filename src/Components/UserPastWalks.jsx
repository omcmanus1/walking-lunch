import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  DevSettings,
  nativemodules,
} from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Button } from "@react-native-material/core";

// const [userData, setUserData] = useState(null)



export default function UserPastWalks({totalDistance}) {

  console.log(totalDistance);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Weekly Walking Data</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri'],
            datasets: [
              {
                data: [
                  Math.random() * 2,
                  Math.random() * 2,
                  Math.random() * 2,
                  Math.random() * 2,
                  totalDistance
                ]
              }
            ]
          }}
          width={325}
          height={220}
          yAxisSuffix="KM"
          yAxisInterval={0.4}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726'
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Monthly Walking Goal Progress</Text>
        <Text style={styles.text}>Walk a marathon a month </Text>

        <ProgressChart
          data={{
            labels: ['March', 'April', 'May'],
            data: [0.9, 0.75, 0.8]
          }}
          width={325}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726'
            }
          }}
          hideLegend={false}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
      <Button title="New Walk" onPress={() => DevSettings.reload()}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5fcff",
    padding: 20,
    borderRadius: 16,
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
