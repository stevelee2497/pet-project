import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';
import faker from 'faker';
import { Slider } from 'react-native-elements';
import images, { randomImage } from '../../helpers/imageHelper';
import colors from '../../helpers/colorHelper';

const { width } = Dimensions.get('window');

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerState: PLAYING
    };
  }

  changePlayerState = () => {
    if (this.state.playerState === PLAYING) {
      this.setState({ playerState: STOP });
    } else {
      this.setState({ playerState: PLAYING });
    }
  }

  render() {
    const { chapter, style, translateY } = this.props;

    return (
      <Animated.View style={[styles.container, style, { transform: [{ translateY }] }]}>
        <Image style={styles.image} source={randomImage(500, 500)} />
        <View style={styles.minimumPlayer}>
          <Text style={styles.bookTitle} numberOfLines={1}>{faker.random.words(2)}</Text>
          <Text style={styles.chapterTitle} numberOfLines={1}>{chapter.name}</Text>
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
            <TouchableOpacity hitSlop={styles.buttonHitSlop} onPress={this.changePlayerState}>
              <Image
                source={this.state.playerState === PLAYING ? images.play : images.pause}
                style={styles.largeButton}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={styles.buttonHitSlop}>
              <Image source={images.next30} style={styles.mediumButton} resizeMode="stretch" />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={styles.buttonHitSlop}>
              <Image source={images.forward} style={styles.smallButton} resizeMode="stretch" />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
        </View>
      </Animated.View>
    );
  }
}

export const IMAGE = 150;
export const PLAYER_MAX_HEIGHT = 330;
export const PLAYER_MIN_HEIGHT = 160;

const PLAYING = 'player playing';
const STOP = 'player stop';
export const PLAYER_STATE = { PLAYING, STOP };

const styles = StyleSheet.create({
  container: {
    width,
    height: PLAYER_MAX_HEIGHT,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  image: {
    width: IMAGE,
    height: IMAGE,
    marginTop: PLAYER_MAX_HEIGHT - PLAYER_MIN_HEIGHT - IMAGE,
  },
  minimumPlayer: {
    alignItems: 'center',
    width,
    height: PLAYER_MIN_HEIGHT,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  bookTitle: {
    fontWeight: '500',
    textAlign: 'center'
  },
  chapterTitle: {
    fontSize: 11,
    color: colors.secondaryText,
    textAlign: 'center',
    marginTop: 3
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
  },
  divider: {
    height: 1,
    width,
    marginTop: 15,
    backgroundColor: colors.divider
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
