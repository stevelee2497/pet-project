import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class BookShelfScreen extends Component {
  static navigationOptions = {
    title: 'Tủ sách',
  };

  render() {
    return (
      <View>
        <Text> BookSelfScreen </Text>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookShelfScreen);
