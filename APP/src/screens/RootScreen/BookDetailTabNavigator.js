import { createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
import OverviewTab from '../../components/OverviewTab';
import ReviewTab from '../../components/ReviewTab';
import CommentTab from '../../components/CommentTab';
import BookDetailHeader from '../../components/BookDetailHeader';

const BookDetailTabNavigator = createMaterialTopTabNavigator({
  OverviewTab,
  ReviewTab,
  CommentTab
}, {
  initialRouteName: 'OverviewTab',
  navigationOptions: ({ navigation }) => ({
    header: (<BookDetailHeader back={() => { navigation.goBack(); }} />),
  }),
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
      color: 'black'
    },
    style: {
      backgroundColor: 'white',
    },
  }
});

export default BookDetailTabNavigator;
