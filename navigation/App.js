/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import BottomNavigation, {
  IconTab,
  Badge,
  FullTab,
  ShiftingTab
} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Weather from './screen/weather/Weather';
import Widgets from './screen/Widgets';
import Settings from './screen/Settings';

import Afternoon from './src/after_noon.png';
import Sun from './src/Sun.png';

type Props = {};
export default class App extends Component<Props> {
  state = {
    activeTab: 'weather'
  }

  tabs = [
    {
      key: 'weather',
      label: 'Weather',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'weather-cloudy'
    },
    {
      key: 'widgets',
      label: 'Widgets',
      barColor: '#00695C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'widgets'
    },
    {
      key: 'settings',
      label: 'Settings',
      barColor: '#1565C0',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'settings-outline'
    }
  ]

  state = {
    activeTab: this.tabs[0].key
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <ShiftingTab
      isActive={isActive}
      // showBadge={tab.key === 'widgets'}
      // renderBadge={() => <Badge>3</Badge>}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  renderScreen(nameScreen){
    switch (nameScreen){
      case "weather":
        return( <Weather/>);
      case "widgets":
        return(<Widgets />);
      case "settings":
        return(<Settings/>);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      
        <View style={{ flex: 1 }}>
        {/* <ImageBackground source={Afternoon} style={{width: '100%', height: '100%'}} > */}
          {this.renderScreen(this.state.activeTab)}
        {/* </ImageBackground> */}
        </View>
        
        <BottomNavigation
          tabs={this.tabs}
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          useLayoutAnimation
      />
      
     </View>
    );
  }
}
