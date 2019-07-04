import React, { Component } from 'react';
import {
  View, StatusBar, StyleSheet, Platform
} from 'react-native';
import AppContainer from '../AppContainer';

export default class RootScreen extends Component {
  render() {
    StatusBar.setBarStyle('dark-content', true);
    return (
      <View style={styles.container}>
        <View
          // To set the background color in IOS Status Bar also
          style={{
            backgroundColor: 'whitesmoke',
            height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
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
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
