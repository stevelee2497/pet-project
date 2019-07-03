import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import images, { randomImage } from '../../helpers/imageHelper';
import colors from '../../helpers/colorHelper';

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

        <View style={{
          backgroundColor: 'white', flexDirection: 'row', padding: 5, justifyContent: 'center', alignItems: 'center'
        }}
        >
          <TouchableOpacity style={{
            backgroundColor: colors.pink,
            padding: 5,
            width: 80,
            height: 30,
            alignItems: 'center',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            justifyContent: 'center'
          }}
          >
            <Text style={{ color: 'white', fontWeight: '400' }}>SÁCH</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: 'white',
            padding: 5,
            width: 80,
            height: 30,
            alignItems: 'center',
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderWidth: 2,
            borderColor: colors.pink,
            justifyContent: 'center',
            borderLeftWidth: 0
          }}
          >
            <Text style={{ color: 'black', fontWeight: '400' }}>TRUYỆN</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          width,
          height: 220,
          backgroundColor: 'white'
        }}
        >
          <Swiper activeDotColor="white" paginationStyle={{ position: 'absolute', bottom: 30 }}>
            {
              Array.from({ length: 4 }).map((_, index) => (
                <Image key={index.toString()} source={randomImage(1000, 600)} style={{ width, height: 200 }} resizeMode="stretch" />
              ))
            }
          </Swiper>
        </View>

        <View style={{ marginTop: 20, backgroundColor: 'white' }}>
          <Text>TRUYỆN MỚI CẬP NHẬT</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryScreen);
