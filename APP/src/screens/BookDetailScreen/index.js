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
import { Header } from 'react-navigation';
import faker from 'faker';
import BookDetailHeader from '../../components/BookDetailHeader';
import Catalog from '../../components/Catalog';
import HorizontalBookList from '../../components/HorizontalBookList';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const TAB_BAR_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 250 + TAB_BAR_HEIGHT;
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
        { key: '1', title: 'Tổng quan' },
        { key: '2', title: 'Đánh giá' },
        { key: '3', title: 'Bình luận' },
      ],
      scrollY: new Animated.Value(0),
    };
  }

  handleIndexChange = (index) => {
    this.setState({ index });
  };

  backPressed = () => {}

  renderHeader = (props) => {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    const translateY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_MAX_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerCoverHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [255, Header.HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <BookDetailHeader translateY={translateY} headerCoverHeight={headerCoverHeight} backPressed={this.props.backPressed} />
        <TabBar {...props} style={styles.tabBar} labelStyle={styles.tabBarLabel} />
      </Animated.View>
    );
  };

  showFullCatalog = () => {
    this.props.navigation.navigate('CatalogScreen');
  }

  renderScene = () => {
    const book = this.props.navigation.getParam('book', null);

    const onScrollAnimating = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
    );

    return (
      <Animated.ScrollView
        style={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={onScrollAnimating}
      >
        <Text style={styles.description} numberOfLines={20}>{book.description}</Text>
        <Catalog onViewMore={this.showFullCatalog} />
        <HorizontalBookList title="Cùng tác giả" />
        <View style={{ height: HEADER_MAX_HEIGHT }} />
      </Animated.ScrollView>
    );
  };

  render() {
    return (
      <TabView
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderTabBar={this.renderHeader}
        onIndexChange={this.handleIndexChange}
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
    backgroundColor: 'white',
  },
  tabBar: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarLabel: {
    fontSize: 13,
    color: 'black',
    textTransform: 'capitalize'
  },
  description: {
    lineHeight: 23,
    padding: 15
  }
});

export default BookDetailScreen;
