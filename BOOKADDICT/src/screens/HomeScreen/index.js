import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import images from '../../helpers/imageHelper';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={images.home}
        style={{
          width: 18,
          height: 18,
          tintColor,
          marginTop: 6,
        }}
        resizeMode="stretch"
      />
    ),
  };

  render() {
    return (
      <View>
        <Text> HomeScreen </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
