import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

export class BookDetailScreen extends Component {
  static navigationOptions ={
    title: 'DETail',
  };

  render() {
    return (
      <View>
        <Text>BookDetailScreen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailScreen);
