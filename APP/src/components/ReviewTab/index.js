import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class ReviewTab extends Component {
  static navigationOptions = {
    tabBarLabel: ({ focused }) => (
      <Text style={{ fontWeight: focused ? 'bold' : '100' }}>Đánh giá</Text>
    )
  }

  render() {
    return (
      <View>
        <Text> ReviewTab </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewTab);
