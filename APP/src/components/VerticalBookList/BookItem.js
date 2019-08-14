import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import colors from '../../helpers/colorHelper';

class BookItem extends Component {
  viewBookDetail = () => {
    const { book, navigation } = this.props;
    navigation.navigate('BookDetailScreen', { book });
  }

  render() {
    const { book } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageTouchView} onPress={this.viewBookDetail}>
          <Image style={styles.image} source={book.imageUrl} resizeMode="stretch" />
        </TouchableOpacity>
        <View style={styles.rightViews}>
          <TouchableOpacity onPress={this.viewBookDetail}>
            <Text style={styles.title} numberOfLines={2}>{book.name}</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.description} numberOfLines={1}>Tác giả: {book.author}</Text>
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
    height: 120
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

export default withNavigation(BookItem);
