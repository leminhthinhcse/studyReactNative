/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import codePush from 'react-native-code-push';
import { View} from 'react-native'
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Weather from './screen/Weather';
import Widgets from './screen/Widgets';
import Settings from './screen/Settings';

import OfflineNotice from './components/OfflineNotice';
const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

type Props = {};
class App extends Component<Props> {
  state = {
    activeTab: 'control'
  }

  tabs = [
    {
      key: 'weather',
      label: 'Weather Details',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'weather-cloudy'
    },
    {
      key: 'control',
      label: 'Controls',
      barColor: '#00695C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'lightbulb-outline'
    },
    {
      key: 'settings',
      label: 'Setting',
      barColor: '#1565C0',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'settings-outline'
    }
  ]

  state = {
    activeTab: this.tabs[1].key
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <FullTab
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
      case "control":
        return(<Widgets />);
      case "settings":
        return(<Settings/>);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <OfflineNotice/>
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

App = codePush(codePushOptions)(App);

export default App;
