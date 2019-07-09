import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class ChapterDetailScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      hideHeader: true
    };
  }

  render() {
    return (
      <View>
        <Text>ChapterDetailScreen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterDetailScreen);
