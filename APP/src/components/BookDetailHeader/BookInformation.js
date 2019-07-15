import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated
} from 'react-native';
import faker from 'faker';
import React from 'react';
import { Header } from 'react-navigation';
import images from '../../helpers/imageHelper';
import Rating from '../Rating';
import colors from '../../helpers/colorHelper';

const BookInformation = ({ translateY }) => (
  <Animated.View style={[styles.bookDetailContainer, { transform: [{ translateY }] }]}>
    <View style={styles.bookImageContainer}>
      <Image source={images.book} style={styles.bookImage} />
    </View>
    <View style={styles.rightPanel}>
      <View>
        <Text style={styles.bookTitle} numberOfLines={2}>Tôi thấy hoa vàng trên cỏ xanh</Text>
      </View>
      <View>
        <Text style={styles.normalText} numberOfLines={1}>Tác giả: {faker.random.words(2)}</Text>
        <Text style={styles.normalText} numberOfLines={1}>Trạng thái: {faker.random.words(2)}</Text>
        <Text style={styles.normalText} numberOfLines={1}>Số chương: {faker.random.number(100, 1000)}</Text>
      </View>
      <Rating rate={4.0} />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.readButtonContainer}>
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
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  rightPanel: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bookTitle: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
  },
  normalText: {
    color: 'white',
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