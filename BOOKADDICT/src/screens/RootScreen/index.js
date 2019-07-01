import React, { Component } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import AppContainer from '../AppContainer';

export default class RootScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="whitesmoke" barStyle="dark-content" />
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
