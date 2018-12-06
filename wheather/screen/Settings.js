import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export default class Weather extends React.Component {
    render(){
        return(
            <ScrollView  style={{padding:20,}}>
                <View>
                    <Text style={styles.textHeader}>Systerm Information</Text>
                    <Text style={{color:'gray'}}>Weather Station</Text>
                </View>
                <View>
                    <View>
                        <Text style={styles.h2} >WEATHER</Text>
                    </View>
                    <View>
                        <Text style={styles.h4}>Temperature</Text>
                        <Text style={{color:'gray'}}>Current Information: &#8451;</Text>
                    </View>
                    <View>
                        <Text style={styles.h4}>Network Refresh</Text>
                        <Text style={{color:'gray'}}>Current Information: Real-time</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={styles.h2}>ABOUT</Text>
                    </View>
                    <View>
                        <Text style={styles.h4}>Instructor</Text>
                        <Text style={{color:'gray'}}>Le Trong Nhan, Ph.D. </Text>
                        <Text style={{color:'gray'}}>Nguyen Tran Huu Nguyen, Ph.D. </Text>
                    </View>
                    <View>
                        <Text style={styles.h4}>Le Minh Thinh</Text>
                        <Text style={{color:'gray'}}>1513249</Text>
                        <Text style={{color:'gray'}}>Android &#9854; iOS application</Text>
                    </View>
                    <View>
                        <Text style={styles.h4}>Hoang Nguyen Minh Duc</Text>
                        <Text style={{color:'gray'}}>1610755</Text>
                        <Text style={{color:'gray'}}>Raspberry Pi 3 as a central node for uploading data to server</Text>
                    </View>
                    <View>
                        <Text style={styles.h4}>Thai Thi Thanh Linh</Text>
                        <Text style={{color:'gray'}}>1611830</Text>
                        <Text style={{color:'gray'}}>ESP8266 as a node for receiving sensor data</Text>
                    </View>
                    <View>
                        <Text style={styles.h4}>Le Duc Thinh</Text>
                        <Text style={{color:'gray'}}>1613346</Text>
                        <Text style={{color:'gray'}}>Server building</Text>
                    </View>
                    <Text>.</Text>
                    <Text style={{color:'gray'}}>&#9672; IoT</Text>
                </View>            
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    textHeader: { 
        fontSize:25,
        fontWeight: 'bold',
        color: 'black',
    },
    h2: {
        fontSize:20,
        fontWeight: 'bold',
        color: 'mediumpurple',
        paddingTop: 30,
        paddingBottom: 5,
    },
    h4: {
        fontSize:17,
        // fontWeight: 'bold',
        color: 'black',
        paddingBottom:5,
        paddingTop: 20,
    },
});