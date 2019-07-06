import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import AppContainer from './AppContainer';
import StatusBar from '../../components/StatusBar';

SafeAreaView.setStatusBarHeight(0);

export default class RootScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
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
