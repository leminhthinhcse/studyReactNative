import React, { Component } from "react";
import { Container, Header, Content, Text, Accordion } from "native-base";
import { View, StyleSheet, ImageBackground } from "react-native";
import Details from "../components/weather/Details";
import Chart from "../components/chart/Chart";

import {firebaseApp} from '../components/firebaseConfig';

import Sun from "../src/after_noon.png";
import Night from "../src/night.png";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "...",
      curTime: new  Date().getHours().toLocaleString(),
      timeGot: "...",
    };
    this.changeBackground = this.changeBackground.bind(this);
    this.database1 = firebaseApp.database();
    this.getData = this.getData.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  getData() {
    const that = this;
      this.database1.ref().on('value', function(snapshot) {
        let humid = snapshot.val().Humidity[Object.keys(snapshot.val().Humidity)[Object.keys(snapshot.val().Humidity).length - 1]];
        let temp = snapshot.val().Temperature[Object.keys(snapshot.val().Temperature)[Object.keys(snapshot.val().Temperature).length - 1]];
        let light = snapshot.val().Light[Object.keys(snapshot.val().Light)[Object.keys(snapshot.val().Light).length - 1]];
        
        let timeGot = new Date(parseInt(Object.keys(snapshot.val().Temperature)[Object.keys(snapshot.val().Temperature).length - 1]));

        that.setState({
            temp, timeGot
        });
    });
  }

  changeBackground(){
    if(this.state.curTime>5 &&  this.state.curTime<17){
      return Sun;
    }
      return Night;
  }

  render() {

    const imgSrc = this.changeBackground();
    return (
      <Container>
        <Content>
          <View style={styles.hienNhietDo}>
            <ImageBackground
              source={imgSrc}
              style={{ width: "100%", height: "100%" }}
            >
              <Text style={styles.nhietDo}> {this.state.temp}&#176;</Text>
              <Text style={styles.diaDiem}>
                &#9673; Data got on {''+this.state.timeGot}
              </Text>
            </ImageBackground>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  hienNhietDo: {
    height: 250,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: 'blue',
  },
  nhietDo: {
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black"
    // textShadowRadius: 60,
    // textShadowOffset: {width: 2,height: 2},
  },
  diaDiem: {
    paddingLeft: 25,
    paddingRight: 70,
    color: "white",
    textShadowColor: "black"
  }
});
