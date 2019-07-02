import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import images from '../../helpers/imageHelper';

const { width, height } = Dimensions.get('window');

class LibraryScreen extends Component {
  static navigationOptions = {
    title: 'Thư viện',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={images.home}
        style={{
          width: 18,
          height: 18,
          tintColor,
          marginTop: 6,
        }}
        resizeMode="stretch"
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Swiper activeDotColor="white" paginationStyle={{ position: 'absolute', bottom: 10 }}>
            {
              Array.from({ length: 4 }).map((_, index) => (
                <View key={index.toString()} style={styles.slide}>
                  <Text style={styles.text}>{index}</Text>
                </View>
              ))
            }
          </Swiper>
        </View>

        <Text> feefef</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    width,
    height: 200
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryScreen);
