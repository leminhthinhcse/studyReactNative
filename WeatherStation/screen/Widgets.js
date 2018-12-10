import React, { Component } from "react";
import { Container, Content, Text} from "native-base";
import { View, StyleSheet, ImageBackground, Switch } from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      activeSwitch: true,
      threshold:"",
      light:""
    };
    this.changeBackground = this.changeBackground.bind(this);
    this.database1 = firebaseApp.database();
    this.getData = this.getData.bind(this);
    this.showStatusLight = this.showStatusLight.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  getData() {
    const that = this;
      this.database1.ref().on('value', function(snapshot) {
        let temp = snapshot.val().Temperature[Object.keys(snapshot.val().Temperature)[Object.keys(snapshot.val().Temperature).length - 1]];
        let light = snapshot.val().Light[Object.keys(snapshot.val().Light)[Object.keys(snapshot.val().Light).length - 1]];
        let control = snapshot.val().Control;
        let threshold = snapshot.val().Threshold;
        // console.log(control);
        that.setState({control,threshold,light});
        if(control == 1) {
          that.setState({
            activeSwitch: true,
          })
        } else {
          that.setState({
            activeSwitch: false,
          })
        }
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

  callbackFunction=()=>{

  }

  showStatusLight = (val)=>{if(val) return 'ON'; else return 'OFF';}

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

          <View style={{height:100, padding: 10, flex: 1}}>
            <View style={{backgroundColor:'#434e58fe', height:"70%", flexDirection: "row",borderRadius:5, elevation: 10}}>
                <View style={{width:"10%",justifyContent: 'center', alignItems: 'center'}}>
                    <Icon size={24} color="white" name="lightbulb" />
                </View>
                <View style={{width:"65%", justifyContent: 'center',textAlign:"left"}}>
                    <Text style={{color: "white"}}>Lightning: {this.showStatusLight(this.state.activeSwitch)}</Text>
                </View>
                <View style={{width:"25%", justifyContent: 'center'}}>
                    <Switch 
                      onValueChange={ (val) => {
                        let k ="";
                        if(val){
                          k="1";
                        } else {k="0";}
                        this.database1.ref().update({
                          Control: k,
                          Threshold: this.state.light,
                        });
                    }} 
                      value={ this.state.activeSwitch} 
                      trackColor = {{false: "black", true: "white"}}
                    /> 
                    { this.state.activeSwitch === true ? console.log('view1') : console.log('view2') }
                </View>
            </View>
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
