import {
  createStackNavigator, createAppContainer, createSwitchNavigator
} from 'react-navigation';
import SignInScreen from '../SignInScreen';
import SignUpScreen from '../SignUpScreen';
import { BookDetailScreen } from '../BookDetailScreen';
import BottomTabBar from './BottomTabBar';


const AppStacks = createStackNavigator(
  {
    BottomTabBar,
    BookDetailScreen
  },
  {
    initialRouteName: 'BookDetailScreen',
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
