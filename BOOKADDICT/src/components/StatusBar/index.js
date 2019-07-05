import React, { Component } from 'react';
import { StatusBar as DefaultStatusBar, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

class StatusBar extends Component {
  render() {
    return (
      <SafeAreaView
        // To set the background color in IOS Status Bar also
        style={{
          backgroundColor: 'whitesmoke',
          height: Constants.statusBarHeight,
        }}
      >
        <DefaultStatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="whitesmoke"
          translucent={false}
        />
      </SafeAreaView>
    );
  }
}

export default StatusBar;
