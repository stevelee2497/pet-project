import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class AudioScreen extends Component {
  static navigationOptions = {
    title: 'Audio',
  };

  render() {
    return (
      <View>
        <Text> AudioScreen </Text>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioScreen);
