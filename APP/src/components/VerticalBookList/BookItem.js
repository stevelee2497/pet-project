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
          <View>
            <Text style={styles.description}>Tác giả: {book.author}</Text>
            <Text style={styles.description}>Tình trạng: {book.status}</Text>
            <Text style={styles.description}>Số chương: {book.chapterCount}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.accent,
    paddingBottom: 5,
    fontSize: 16
  },
  rightViews: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between'
  },
  image: {
    width: 80,
    height: 110
  },
  imageTouchView: {
    elevation: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20
  },
  description: {
    paddingTop: 2,
    paddingBottom: 2
  }
});
