import React from "react";
import {Text, View, Dimensions, ScrollView} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from "react-native-chart-kit";

export default class Temperature extends React.Component {
  render() {
    return (
      <ScrollView horizontal={true}>
        <LineChart
          data={{
            labels: ["01", "02", "03", "04", "05", "06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
            datasets: [
              {
                data: [
                  20,
                  30,
                  31,
                  32,
                  24,
                  26,
                  35,
                  38,
                  26,
                  30,
                  31,
                  32,
                  24,
                  26,
                  35,
                  38,
                  26,
                  30,
                  31,
                  32,
                  24,
                  26,
                  35,
                  38
                ]
              }
            ]
          }}
          width= {1500}//{Dimensions.get("window").width} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: "white",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(40, 40, 40, ${opacity})`,
            style: {
            //   borderRadius: 16
            }
          }}
          // bezier
          style={{
            marginVertical: 8,
            // borderRadius: 16
          }}
        />
      </ScrollView>
    );
  }
}
