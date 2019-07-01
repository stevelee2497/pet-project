import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import RootScreen from './src/screens/RootScreen';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootScreen />
      </Provider>
    );
  }
}
