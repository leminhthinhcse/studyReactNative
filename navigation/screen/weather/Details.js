import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          temp: "...",
          humid: "...",
          light: "...",
        };
      }
    
      componentDidMount(){
        this.getData();
      }
    
      getData() {
         axios.get('https://immense-reaches-55030.herokuapp.com/get/temp').then(e=>{
            this.setState({temp: e.data});
          });
         axios.get('https://immense-reaches-55030.herokuapp.com/get/humid').then(e=>{
            this.setState({humid: e.data});
          });
          axios.get('https://immense-reaches-55030.herokuapp.com/get/light').then(e=>{
            this.setState({light: e.data});
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
  