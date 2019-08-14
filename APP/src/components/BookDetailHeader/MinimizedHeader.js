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
import colors from '../../helpers/colorHelper';

const MinimizedHeader = ({ backPressed, title }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={backPressed}>
      <Image style={styles.back} source={images.back} resizeMode="stretch" />
    </TouchableOpacity>
    <Animated.Text style={styles.title} numberOfLines={1}>{title}</Animated.Text>
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
    zIndex: 2,
    flex: 1
  },
  back: {
    width: 24,
    height: 24,
    tintColor: colors.textLightPrimary,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    color: colors.textLightPrimary,
    fontSize: 18,
    fontWeight: '500',
    maxWidth: 300
  }
});


export default MinimizedHeader;
