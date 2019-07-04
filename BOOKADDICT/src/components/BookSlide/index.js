import React, { Component } from 'react';
import {
  View, Dimensions, Image, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { randomImage } from '../../helpers/imageHelper';

const { width } = Dimensions.get('window');

class BookSlide extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper activeDotColor="white" paginationStyle={styles.paginationStyle} autoplay>
          {
            Array.from({ length: 4 }).map((_, index) => (
              <Image key={index.toString()} source={randomImage(1000, 600)} style={styles.slide} resizeMode="stretch" />
            ))
          }
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 240,
    backgroundColor: 'white'
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 30
  },
  slide: {
    width,
    height: 220
  }
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(BookSlide);
