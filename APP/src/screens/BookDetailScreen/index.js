import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import BookDetailHeader from '../../components/BookDetailHeader';

export class BookDetailScreen extends Component {
  static navigationOptions ={
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <BookDetailHeader />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailScreen);
