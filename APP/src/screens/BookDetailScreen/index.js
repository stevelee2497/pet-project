import { createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
import OverviewTab from '../../components/OverviewTab';
import ReviewTab from '../../components/ReviewTab';
import CommentTab from '../../components/CommentTab';
import BookDetailHeader from '../../components/BookDetailHeader';

const BookDetailScreen = createMaterialTopTabNavigator({
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
      fontSize: 14,
      color: 'black',
    },
    upperCaseLabel: false,
    style: {
      backgroundColor: 'white',
    },
    tabStyle: {
      alignItems: 'flex-start',
    }
  }
});

export default BookDetailScreen;
