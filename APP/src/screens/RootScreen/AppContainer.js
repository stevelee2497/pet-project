import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import SignInScreen from '../SignInScreen';
import SignUpScreen from '../SignUpScreen';
import BottomTabBar from './BottomTabBar';
import BookDetailScreen from '../BookDetailScreen';
import CatalogScreen from '../CatalogScreen';
import ChapterDetailScreen from '../ChapterDetailScreen';

const AppStacks = createStackNavigator(
  {
    BottomTabBar,
    BookDetailScreen,
    CatalogScreen,
    ChapterDetailScreen
  },
  {
    initialRouteName: 'ChapterDetailScreen',
    headerMode: 'screen'
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
