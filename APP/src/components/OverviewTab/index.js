import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class OverviewTab extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        <Text> OverviewTab </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
