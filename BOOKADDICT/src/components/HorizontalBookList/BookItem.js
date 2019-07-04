import React, { Component } from 'react';
import {
  Text, TouchableOpacity, Image, StyleSheet
} from 'react-native';

export default class BookItem extends Component {
  render() {
    const { book } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
      >
        <Image
          source={book.image}
          style={styles.image}
          resizeMode="stretch"
        />
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 5,
    textAlign: 'center'
  },
  image: {
    width: 100,
    height: 130,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  container: {
    width: 100,
    margin: 5,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 5
  }
});
