import React from "react";
import {Text, View, Dimensions, ScrollView} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from "react-native-chart-kit";
import {firebaseApp} from '../firebaseConfig.js';

import {data} from './data';

export default class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.database1 = firebaseApp.database();
    this.database1.ref().on('value', function(snapshot) {
      let temp = snapshot.val().Temperature;
      let length = Object.keys(temp).length;
      console.log(length);
    });
    
  }

  render() {
    return (
      <ScrollView horizontal={true}>
        <LineChart
          data={data}
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
