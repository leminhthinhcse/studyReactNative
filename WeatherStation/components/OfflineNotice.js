import React, { Component } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';


const { width } = Dimensions.get('window');

function ShowOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

function ShowOnlineSign() {
  return (
    <View style={styles.onlineContainer}>
      <Text style={styles.onlineText}>Connected</Text>
    </View>
  );
}

class OfflineNotice extends Component {
  state = {
    component: null,
    showToast: false,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange =  isConnected => {
      if (!isConnected) {
        this.setState({component: <ShowOfflineSign />});
      } else {
       this.timeoutHandle = setTimeout( ()=>{
         this.setState({component: null});
        }, 3000);
        this.setState({component: <ShowOnlineSign />});
      }
  };

  render() {
    return this.state.component
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    // position: 'absolute',
    top: 0
  },
  offlineText: { color: '#fff' },
  onlineContainer: {
    backgroundColor: 'green',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    // position: 'absolute',
    top: 0
  },
  onlineText: { color: '#fff' }
});

export default OfflineNotice;
