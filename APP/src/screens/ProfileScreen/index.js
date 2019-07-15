import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Hồ sơ'
  };

  render() {
    return (
      <View>
        <Text> ProfileScreen </Text>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
