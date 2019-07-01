import {
  createBottomTabNavigator, createStackNavigator, createAppContainer, createSwitchNavigator
} from 'react-navigation';
import HomeScreen from './HomeScreen';
import BookSelfScreen from './BookSelfScreen';
import ChartScreen from './ChartScreen';
import ProfileScreen from './ProfileScreen';
import AudioScreen from './AudioScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import colors from '../helpers/colorHelper';

const BottomTabs = createBottomTabNavigator(
  {
    HomeScreen,
    BookSelfScreen,
    ChartScreen,
    ProfileScreen,
    AudioScreen,
  },
  {
    initialRouteName: 'HomeScreen',
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
