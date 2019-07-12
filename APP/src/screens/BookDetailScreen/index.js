/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  View,
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view'; // Version can be specified in package.json
import { Header, ScrollView } from 'react-navigation';
import faker from 'faker';
import ContactsList from './ContactsList';
import BookDetailHeader, { MinimizedHeader } from '../../components/BookDetailHeader';
import Catalog from '../../components/Catalog';
import HorizontalBookList from '../../components/HorizontalBookList';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const TAB_BAR_HEIGHT = 52;
const HEADER_MAX_HEIGHT = 255 + TAB_BAR_HEIGHT;
const HEADER_MIN_HEIGHT = Header.HEIGHT + TAB_BAR_HEIGHT;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class BookDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'First' },
        { key: '2', title: 'Second' },
        { key: '3', title: 'Third' },
      ],
      scrollY: new Animated.Value(0),
    };
  }

  _handleIndexChange = (index) => {
    this.setState({ index });
  };

  backPressed = () => {}

  _renderHeader = (props) => {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    const translateY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
        <BookDetailHeader translateY={translateY} backPressed={this.props.backPressed} />
        <TabBar {...props} style={styles.tabBar} labelStyle={styles.tabBarLabel} />
      </Animated.View>
    );
  };

  _renderScene = () => (
    <Animated.ScrollView
      style={{ paddingTop: HEADER_MAX_HEIGHT }}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
        { useNativeDriver: true }
      )}
    >
      <Text style={styles.description} numberOfLines={10}>{faker.random.words(200)}</Text>
      <Catalog onViewMore={this.showFullCatalog} />
      <HorizontalBookList title="Cùng tác giả" />
      <View style={{ height: HEADER_MAX_HEIGHT }} />
    </Animated.ScrollView>
  );

  render() {
    return (
      <TabView
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tabBar: {
    backgroundColor: 'white',
  },
  tabBarLabel: {
    fontSize: 14,
    color: 'black'
  },
  description: {
    lineHeight: 23,
    padding: 15
  }
});

export default BookDetailScreen;
