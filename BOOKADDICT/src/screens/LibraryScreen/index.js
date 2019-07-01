import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import Dots from 'react-carousel-dots';
import images from '../../helpers/imageHelper';

class LibraryScreen extends Component {
  static navigationOptions = {
    title: 'Thư viện',
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
        <Dots length={10} active={0} />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryScreen);
