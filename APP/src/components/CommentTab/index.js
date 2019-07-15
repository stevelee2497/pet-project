import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class CommentTab extends Component {
  static navigationOptions = {
    tabBarLabel: ({ focused }) => (
      <Text style={{ fontWeight: focused ? 'bold' : '100' }}>Thảo luận</Text>
    )
  }

  render() {
    return (
      <View>
        <Text> CommentTab </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CommentTab);
