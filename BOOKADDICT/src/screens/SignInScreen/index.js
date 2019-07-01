import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class SignInScreen extends Component {
  render() {
    return (
      <View>
        <Text> SignInScreen </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
