import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class ChartScreen extends Component {
  static navigationOptions = {
    title: 'Xếp hạng'
  };

  render() {
    return (
      <View>
        <Text> ChartScreen </Text>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartScreen);
