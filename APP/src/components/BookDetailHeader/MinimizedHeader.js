import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet
} from 'react-native';
import { Header } from 'react-navigation';
import images from '../../helpers/imageHelper';

const MinimizedHeader = ({ backPressed }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={backPressed}>
      <Image style={styles.back} source={images.back} resizeMode="stretch" />
    </TouchableOpacity>
    <Animated.Text style={{ color: 'white', fontSize: 18 }}>Tôi thấy hoa vàng trên cỏ xanh</Animated.Text>
    <TouchableOpacity>
      <Image style={styles.back} source={images.download} resizeMode="stretch" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: Header.HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2
  },
  back: {
    width: 24,
    height: 24,
    tintColor: 'white',
    marginLeft: 10,
    marginRight: 10
  }
});


export default MinimizedHeader;
