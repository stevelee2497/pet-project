import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import React from 'react';
import BookShelfScreen from '../BookShelfScreen';
import ChartScreen from '../ChartScreen';
import ProfileScreen from '../ProfileScreen';
import AudioScreen from '../AudioScreen';
import colors from '../../helpers/colorHelper';
import LibraryScreen from '../LibraryScreen';
import images from '../../helpers/imageHelper';

const stackConfig = (title, icon) => ({
  navigationOptions: {
    title,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{
          width: 18,
          height: 18,
          tintColor,
          marginTop: 6,
        }}
        resizeMode="stretch"
      />
    ),
  }
});

const LibraryStack = createStackNavigator({ LibraryScreen }, stackConfig('Thư viện', images.home));

const BookShelfStack = createStackNavigator({ BookShelfScreen }, stackConfig('Tủ sách', images.bookShelf));

const ChartStack = createStackNavigator({ ChartScreen }, stackConfig('Xếp hạng', images.chart));

const AudioStack = createStackNavigator({ AudioScreen }, stackConfig('Nghe', images.audio));

const ProfileStack = createStackNavigator({ ProfileScreen }, stackConfig('Hồ sơ', images.circleUser));

const BottomTabBar = createBottomTabNavigator(
  {
    LibraryStack,
    BookShelfStack,
    ChartStack,
    AudioStack,
    ProfileStack,
  },
  {
    initialRouteName: 'AudioStack',
    tabBarOptions: {
      activeTintColor: colors.pink,
      inactiveTintColor: 'black',
      labelStyle: {
        fontSize: 12,
      },
    },
    navigationOptions: {
      header: null
    }
  }
);

export default BottomTabBar;
