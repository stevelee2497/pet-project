import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import colors from '../../helpers/colorHelper';

export default class BookItem extends Component {
  render() {
    const { book } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageTouchView}>
          <Image style={styles.image} source={book.image} resizeMode="stretch" />
        </TouchableOpacity>
        <View style={styles.rightViews}>
          <TouchableOpacity>
            <Text style={styles.title}>{book.title}</Text>
          </TouchableOpacity>
          <Text>Tác giả: {book.author}</Text>
          <Text>Tình trạng: {book.status}</Text>
          <Text>Số chương: {book.chapterCount}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.accent,
    paddingBottom: 5
  },
  rightViews: {
    flex: 1,
    marginLeft: 10
  },
  image: {
    width: 80,
    height: 110
  },
  imageTouchView: {
    elevation: 10,
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20
  },
});
