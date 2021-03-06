import React, { Component } from "react";
import { Container, Header, Content, Text, Accordion } from "native-base";
import { View, StyleSheet, ImageBackground, Switch } from "react-native";
import SwitchButton from 'switch-button-react-native';

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
      control:{},
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
        let temp = snapshot.val().Temperature[Object.keys(snapshot.val().Temperature)[Object.keys(snapshot.val().Temperature).length - 1]];
        let control = snapshot.val().Control;
        that.setState({control});
        if(control.lampStatus == 1) {
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
                    <Text style={{color: "white"}}>Lightning</Text>
                </View>
                <View style={{width:"25%", justifyContent: 'center'}}>
                    {/* <SwitchButton
                      onValueChange={(val) => this.setState({ activeSwitch: val })}
                      text1 = 'ON'                        // optional: first text in switch button --- default ON
                      text2 = 'OFF'                       // optional: second text in switch button --- default OFF
                      switchWidth = {75}                // optional: switch width --- default 44
                      switchHeight = {30}                 // optional: switch height --- default 100
                      switchdirection = 'ltr'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                      switchBorderRadius = {100}          // optional: switch border radius --- default oval
                      switchSpeedChange = {500}           // optional: button change speed --- default 100
                      switchBorderColor = '#d4d4d4'       // optional: switch border color --- default #d4d4d4
                      switchBackgroundColor = '#fff'      // optional: switch background color --- default #fff
                      btnBorderColor = '#00a4b9'          // optional: button border color --- default #00a4b9
                      btnBackgroundColor = '#00bcd4'      // optional: button background color --- default #00bcd4
                      fontColor = '#b1b1b1'               // optional: text font color --- default #b1b1b1
                      activeFontColor = '#fff'          // optional: active font color --- default #fff
                    /> */}
                    <Switch 
                      onValueChange={ (val) => {
                        let k ="";
                        if(val){
                          k="1";

                        } else {k="0";}
                        this.database1.ref('Control').set({
                          lampLightingConditions:this.state.control.lampLightingConditions,
                          lampStatus:k
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
