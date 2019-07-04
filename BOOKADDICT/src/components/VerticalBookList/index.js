import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class VerticalBookList extends Component {
  render() {
    return (
      <View>
        <Text> prop </Text>
      </View>
    );
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalBookList);
