/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import BottomNavigation, {
  IconTab
} from "react-native-material-bottom-navigation";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Temperature from "./Temperature";
import Illuminance from './Illuminance';
import Humidity from './Humidity';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.tabs[0].key,
      activeScreen: "temperature",
    };
  }

  tabs = [
    {
      key: "temperature",
      label: "Temperature",
      barColor: "white",
      pressColor: "rgba(255, 255, 255, 0.16)",
      icon: "oil-temperature"
    },
    {
      key: "illuminance",
      label: "Illuminance",
      barColor: "white",
      pressColor: "rgba(255, 255, 255, 0.16)",
      icon: "theme-light-dark"
    },
    {
      key: "humidity",
      label: "Humidity",
      barColor: "white",
      pressColor: "rgba(255, 255, 255, 0.16)",
      icon: "water-percent"
    }
  ];

  renderIcon = icon => ({ isActive }) => (
    <Icon size={14} color="black" name={icon} />
  );

  renderTab = ({ tab, isActive }) => (
    <IconTab
      isActive={isActive}
      // showBadge={tab.key === 'widgets'}
      // renderBadge={() => <Badge>3</Badge>}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );

  renderScreen(nameScreen) {
    switch (nameScreen) {
      case "temperature":
        return <Temperature />;
      case "illuminance":
        return(<Illuminance/>);
      case "humidity":
        return(<Humidity/>);
    }
  }
  
  setTab = selectedTab => {
    this.setState({ selectedTab });
  };

  render() {
    return (
      <View>
        <View style={styles.view}>
          <Text style={styles.textHeader}>Hourly weather</Text>
          <Text style={{ color: "gray" }}>Later 24h</Text>
        </View>
        <BottomNavigation
          tabs={this.tabs}
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          useLayoutAnimation
        />
      
        <View style={styles.viewDetail}>
          {this.renderScreen(this.state.activeTab)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  collapseHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  viewHeader: {
    width: "80%"
  },
  textHeader: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
  },
  viewDetail: {},
  viewDetailComponent: {
    width: "50%",
    flexDirection: "row",
    padding: 10
  },
  icon: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center"
  },
  textDetail: {
    width: "70%"
  },
  view: {
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25
  }
});
