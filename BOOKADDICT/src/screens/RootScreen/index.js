import React, { Component } from 'react';
import {
  View, StyleSheet
} from 'react-native';
import AppContainer from '../AppContainer';
import CustomStatusBar from '../../components/StatusBar';

export default class RootScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomStatusBar />
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
