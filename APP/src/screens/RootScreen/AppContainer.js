import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import SignInScreen from '../SignInScreen';
import SignUpScreen from '../SignUpScreen';
import BottomTabBar from './BottomTabBar';
import BookDetailTabNavigator from './BookDetailTabNavigator';

const AppStacks = createStackNavigator(
  {
    BottomTabBar,
    BookDetailTabNavigator
  },
  {
    initialRouteName: 'BottomTabBar',
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
