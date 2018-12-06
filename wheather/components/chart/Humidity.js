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

export default class Humidity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      labels: [],
      dataTemp: {
        labels: ["00"],
        datasets: [{data:[0]}],
      }
    }
    const that = this;
    this.database1 = firebaseApp.database();
    this.database1.ref().on('value', async function(snapshot) {
      that.setState({
        data: [],
        labels: [],
        dataTemp: {
          labels: ["00"],
          datasets: [{data:[0]}],
        }
      });
      let  temp = await snapshot.val().Humidity;
      const k = await Object.keys(temp);
      let length = await k.length;
      let date = await new Date(parseInt(k[length-1])).getDate();
      let g = await [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
      let c = await [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
      let f;
      let d;
      // console.log(date);
      for (let i = 0; i < length; i++) {
        d = new Date(parseInt(k[i])).getDate();
        if (d==date){
          f =  new Date(parseInt(k[i])).getHours();
          g[f] += parseInt(temp[k[i]]);
          c[f] +=1;
          await console.log(temp[k[i]]+"->"+f+"|"+g[f]+"|"+c[f]);
        }
      }

      for (i = 0; i<24;i++){
        if(g[i]){
            that.state.data.push(g[i]/c[i]);
            that.state.labels.push(i+"");
            that.setState({
            data: that.state.data,
            labels: that.state.labels
          });
          console.log(i +"|"+g[i]/c[i] + '|'+that.state.labels);
        }
      }
      // console.log(that.state.data);
      await that.setState({
        dataTemp: {
        labels: that.state.labels,
        datasets: [{data: that.state.data}]}
      });
      await console.log(that.state.dataTemp);
      await console.log(data);
    });

    

    
    
}

  render() {
    return (
      <ScrollView horizontal={true}>
        <LineChart
          data={this.state.dataTemp}
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
