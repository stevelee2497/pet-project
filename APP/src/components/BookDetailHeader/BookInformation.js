import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated
} from 'react-native';
import React from 'react';
import { Header } from 'react-navigation';
import images from '../../helpers/imageHelper';
import Rating from '../Rating';
import colors from '../../helpers/colorHelper';

const BookInformation = ({ translateY, book, readNow }) => (
  <Animated.View style={[styles.bookDetailContainer, { transform: [{ translateY }] }]}>
    <View style={styles.bookImageContainer}>
      <Image source={book.imageUrl} style={styles.bookImage} />
    </View>
    <View style={styles.rightPanel}>
      <View>
        <Text style={styles.bookTitle} numberOfLines={2}>{book.name}</Text>
      </View>
      <View>
        <Text style={styles.normalText} numberOfLines={1}>Tác giả: {book.author}</Text>
        <Text style={styles.normalText} numberOfLines={1}>Trạng thái: {book.status}</Text>
        <Text style={styles.normalText} numberOfLines={1}>Số chương: {book.chapterCount}</Text>
      </View>
      <Rating rate={4.0} />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.readButtonContainer} onPress={readNow}>
          <Text style={styles.readButton}>ĐỌC NGAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundButtonContainer}>
          <Image source={images.bookmark} style={styles.roundButton} resizeMode="stretch" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundButtonContainer}>
          <Image source={images.listening} style={styles.roundButton} resizeMode="stretch" />
        </TouchableOpacity>
      </View>
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  bookDetailContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: Header.HEIGHT
  },
  bookImageContainer: {
    width: 135,
    height: 250 - Header.HEIGHT,
    marginLeft: 15,
    shadowColor: 'pink',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    shadowOpacity: 10,
    elevation: 2
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  rightPanel: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bookTitle: {
    color: colors.textLightPrimary,
    fontSize: 19,
    fontWeight: '500',
  },
  normalText: {
    color: colors.textLightSecondary,
    paddingTop: 3,
    paddingBottom: 3
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  roundButtonContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2
  },
  roundButton: {
    width: '60%',
    height: '60%',
    tintColor: colors.pink
  },
  readButtonContainer: {
    height: 40,
    backgroundColor: colors.pink,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2
  },
  readButton: {
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
    fontWeight: '500'
  }
});

export default BookInformation;
