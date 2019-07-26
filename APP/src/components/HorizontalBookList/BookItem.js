import React, { Component } from 'react';
import {
  Text, TouchableOpacity, Image, StyleSheet, View
} from 'react-native';
import { withNavigation } from 'react-navigation';

class BookItem extends Component {
  viewBookDetail = () => {
    const { book, navigation } = this.props;
    navigation.navigate('BookDetailScreen', { book });
  }

  render() {
    const { book, width } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, { width: width || 100 }]}
        onPress={this.viewBookDetail}
      >
        <View style={styles.imageContainer}>
          <Image
            source={book.imageUrl}
            style={[styles.image, { width: width || 100, height: (width || 100) * 3 / 2 }]}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.title} numberOfLines={2}>{book.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 5,
    textAlign: 'center',
    fontSize: 11
  },
  container: {
    margin: 5,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  imageContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  }
});

export default withNavigation(BookItem);
