import React, { Component } from 'react';
import {
  View, Dimensions, Image, StyleSheet, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

class BookSlide extends Component {
  render() {
    const { books } = this.props;
    return (
      <View style={styles.container}>
        <Swiper activeDotColor="white" paginationStyle={styles.paginationStyle} autoplay>
          {
            books.map(book => (
              <TouchableOpacity key={book.id}>
                <Image source={book.coverUrl} style={styles.slide} resizeMode="stretch" />
              </TouchableOpacity>
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
