import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import images from '../../helpers/imageHelper';

class BookSelfScreen extends Component {
  static navigationOptions = {
    title: 'Thư viện',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={images.bookSelf}
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
        <Text> BookSelfScreen </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookSelfScreen);
