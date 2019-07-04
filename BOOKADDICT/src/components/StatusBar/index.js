import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Constants from 'expo-constants';

export default class CustomStatusBar extends Component {
  render() {
    return (
      <View
        // To set the background color in IOS Status Bar also
        style={{
          backgroundColor: 'whitesmoke',
          height: Constants.statusBarHeight,
        }}
      >
        <StatusBar
          barStyle="dark-content"
          // dark-content, light-content and default
          hidden={false}
          // To hide statusBar
          backgroundColor="whitesmoke"
          // Background color of statusBar
          translucent={false}
          // allowing light, but not detailed shapes
          networkActivityIndicatorVisible
        />
      </View>
    );
  }
}
