import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import faker from 'faker';
import { Slider } from 'react-native-elements';
import images, { randomImage } from '../../helpers/imageHelper';
import colors from '../../helpers/colorHelper';

const { width } = Dimensions.get('window');

const Player = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={randomImage(500, 500)} />
    <Text style={styles.bookTitle} numberOfLines={2}>{faker.random.words(2)}</Text>
    <Text style={styles.chapterTitle}>Chương 1: {faker.random.words(2)}</Text>
    <Slider
      value={0.5}
      style={styles.sliderContainerStyle}
      thumbStyle={styles.thumbStyle}
      minimumTrackTintColor={colors.pink}
    />
    <View style={styles.playerButtons}>
      <TouchableOpacity hitSlop={styles.buttonHitSlop}>
        <Image source={images.backward} style={styles.smallButton} resizeMode="stretch" />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={styles.buttonHitSlop}>
        <Image source={images.back30} style={styles.mediumButton} resizeMode="stretch" />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={styles.buttonHitSlop}>
        <Image source={images.play} style={styles.largeButton} resizeMode="stretch" />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={styles.buttonHitSlop}>
        <Image source={images.next30} style={styles.mediumButton} resizeMode="stretch" />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={styles.buttonHitSlop}>
        <Image source={images.forward} style={styles.smallButton} resizeMode="stretch" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center'
  },
  image: {
    width: '50%',
    height: undefined,
    aspectRatio: 1,
    marginTop: 20,
  },
  bookTitle: {
    fontWeight: '500',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  },
  chapterTitle: {
    fontSize: 11,
    color: colors.secondaryText,
    textAlign: 'center',
    marginTop: 5
  },
  sliderContainerStyle: {
    width: '80%'
  },
  thumbStyle: {
    backgroundColor: 'white',
    elevation: 5,
    width: 15,
    height: 15
  },
  playerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20
  },
  buttonHitSlop: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  },
  smallButton: {
    width: 24,
    height: 24,
    tintColor: colors.secondaryText
  },
  mediumButton: {
    width: 30,
    height: 30,
    tintColor: colors.secondaryText
  },
  largeButton: {
    width: 50,
    height: 50,
    tintColor: colors.secondaryText
  }
});

export default Player;
