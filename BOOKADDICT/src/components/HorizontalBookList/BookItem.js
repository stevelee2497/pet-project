import React, { Component } from 'react';
import {
  Text, TouchableOpacity, Image, StyleSheet, View
} from 'react-native';

export default class BookItem extends Component {
  render() {
    const { book } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          <Image
            source={book.image}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
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
  },
  container: {
    width: 100,
    margin: 5,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  imageContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }
});
