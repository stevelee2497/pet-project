import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import images from '../../helpers/imageHelper';

class AudioScreen extends Component {
  static navigationOptions = {
    title: 'Audio',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={images.audio}
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
        <Text> AudioScreen </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioScreen);
