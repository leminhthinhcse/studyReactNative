import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import {firebaseApp} from '../firebaseConfig.js';



export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          temp: "...",
          humid: "...",
          light: "...",
        };
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
            
            // console.log(Object.keys(snapshot.val().Light)[0]);

            that.setState({
                humid, temp, light
            });
        });
      }
      
    componentDetails(icon,text,value){
        return(
            <View style={styles.viewDetailComponent}>
                <Icon size={30} color="black" name={icon} style={styles.icon} />
                <View style={styles.textDetail}>
                    <Text style={{ fontSize: 15, color:'black'}}>{text}</Text>
                    <Text style={{ color:'gray',}}>{value}</Text>
                </View>
            </View>
        );
    }
    
    render(){
        return(
            <View style={styles.view}>
                <View style={{padding:10,}}>
                    <Text style={styles.textHeader}>Details</Text>
                    <Text style={{color:'gray'}}>Weather now</Text>
                </View>
                <View style={styles.viewDetail}>
                    {this.componentDetails("oil-temperature",'Temperature', this.state.temp)}
                    {this.componentDetails("theme-light-dark",'Illuminance',this.state.light+' lux')}
                </View>
                <View style={styles.viewDetail}>
                    {this.componentDetails("water-percent",'Humidity',this.state.humid+'%')}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    collapseHeader: {
         flexDirection: 'row', 
         alignItems: 'center', 
         padding: 10,
        },
    viewHeader: { 
        width: '80%',
    },
    textHeader: { 
        fontSize:25,
        fontWeight: 'bold',
        color: 'black',
    },
    viewDetail: {
        flexDirection: 'row',
    },
    viewDetailComponent:{
        width: '50%',
        flexDirection: 'row',
        padding:10,
    },
    icon:{
        width:'30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDetail:{
        width:'70%',
    },
    view: {
        paddingTop:15,
        paddingLeft:15,
        paddingRight:15,
    }
  });
  