/* eslint-disable react/no-unused-state */
import React, { Component, createRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  View,
} from 'react-native';
import {
  TabBar,
  TabView,
  SceneMap
} from 'react-native-tab-view'; // Version can be specified in package.json
import { Header, ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import BookDetailHeader from '../../components/BookDetailHeader';
import Catalog from '../../components/Catalog';
import HorizontalBookList from '../../components/HorizontalBookList';
import { fetchBook } from '../../actions';
import colors from '../../helpers/colorHelper';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const TAB_BAR_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 270 + TAB_BAR_HEIGHT;
const HEADER_MIN_HEIGHT = Header.HEIGHT + TAB_BAR_HEIGHT;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

class BookDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'overview', title: 'Tổng quan' },
        { key: 'review', title: 'Đánh giá' },
        { key: 'comment', title: 'Bình luận' },
      ],
      scrollY: new Animated.Value(0),
    };
    this.overviewScrollView = createRef();
  }

  componentDidMount() {
    this.props.fetchBook('foo');
  }

  handleIndexChange = (index) => {
    this.setState({ index });
    if (this.state.index === 0 && this.state.scrollY._value !== 0) {
      setTimeout(() => {
        this.overviewScrollView.current.scrollTo({ y: HEADER_SCROLL_DISTANCE, animated: true });
      }, 10);
    }
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

    const book = this.props.navigation.getParam('book', null);

    return (
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <BookDetailHeader translateY={translateY} headerCoverHeight={headerCoverHeight} backPressed={this.props.backPressed} book={book} />
        <TabBar
          {...props}
          style={styles.tabBar}
          labelStyle={styles.tabBarLabel}
          indicatorStyle={{ backgroundColor: colors.pink }}
        />
      </Animated.View>
    );
  };

  showFullCatalog = () => {
    this.props.navigation.navigate('CatalogScreen');
  }

  renderScene = () => {
    const { activeBook } = this.props.library;
    const onScrollAnimating = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
    );
    return (
      activeBook && (
      <ScrollView
        style={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={onScrollAnimating}
        ref={this.overviewScrollView}
      >
        <Text style={styles.description} numberOfLines={20}>{activeBook.description}</Text>
        <Catalog onViewMore={this.showFullCatalog} />
        <HorizontalBookList title="Cùng tác giả" books={activeBook.sameAuthorBooks} />
        <View style={{ height: HEADER_MAX_HEIGHT }} />
      </ScrollView>
      )
    );
  };

  render() {
    return (
      <TabView
        style={styles.container}
        navigationState={this.state}
        renderScene={SceneMap({
          overview: () => this.renderScene(),
          review: FirstRoute,
          comment: SecondRoute,
        })}
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
  },
  scene: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  library: state.library
});

const mapDispatchToProps = {
  fetchBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailScreen);
