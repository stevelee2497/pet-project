import {
  createBottomTabNavigator, createStackNavigator, createAppContainer, createSwitchNavigator
} from 'react-navigation';
import BookShelfScreen from './BookShelfScreen';
import ChartScreen from './ChartScreen';
import ProfileScreen from './ProfileScreen';
import AudioScreen from './AudioScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import colors from '../helpers/colorHelper';
import LibraryScreen from './LibraryScreen';

const BottomTabs = createBottomTabNavigator(
  {
    LibraryScreen,
    BookShelfScreen,
    ChartScreen,
    ProfileScreen,
    AudioScreen,
  },
  {
    initialRouteName: 'LibraryScreen',
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: colors.pink,
      inactiveTintColor: 'black',
      labelStyle: {
        fontSize: 12,
      },
    },
  }
);

const AppStacks = createStackNavigator(
  {
    BottomTabs,
    // BookDetailScreen
  },
  {
    initialRouteName: 'BottomTabs',
  }
);

const AuthStacks = createStackNavigator(
  {
    SignInScreen,
    SignUpScreen,
  },
  {
    initialRouteName: 'SignInScreen',
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AppStacks,
      AuthStacks,
    },
    {
      initialRouteName: 'AppStacks',
    }
  )
);

export default AppContainer;
