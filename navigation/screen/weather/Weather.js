import React, { Component } from "react";
import { Container, Header, Content, Text, Accordion } from "native-base";
import { View, StyleSheet, ImageBackground } from "react-native";
import Details from "./Details";
import Chart from "./chart/Chart";
import axios from 'axios';

import Sun from "../../src/Sun.png";
import Night from "../../src/night.png";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "...",
      curTime: new  Date().getHours().toLocaleString(),
    };
    this.changeBackground = this.changeBackground.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  getData() {
     axios.get('https://immense-reaches-55030.herokuapp.com/get/temp').then(e=>{
        this.setState({temp: e.data});
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
                &#9673; {this.state.curTime}
              </Text>
            </ImageBackground>
          </View>

          <Details />

          <Chart />
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
    color: "white"
  }
});
