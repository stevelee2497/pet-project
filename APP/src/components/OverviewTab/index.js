import React, { Component } from 'react';
import {
  Text, ScrollView, Animated, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import faker from 'faker';
import { Header } from 'react-navigation';
import HorizontalBookList from '../HorizontalBookList';
import Catalog from '../Catalog';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Header.HEIGHT;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class OverviewTab extends Component {
  static navigationOptions = {
    tabBarLabel: ({ focused }) => (
      <Text style={{ fontWeight: focused ? 'bold' : '100', textAlign: 'left', marginLeft: 5 }}>Giới thiệu</Text>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  showFullCatalog = () => {
    this.props.navigation.navigate('CatalogScreen');
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const animatingScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
    );

    return (
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={animatingScroll}
      >
        <Text style={styles.description} numberOfLines={10}>{faker.random.words(200)}</Text>
        <Catalog onViewMore={this.showFullCatalog} />
        <HorizontalBookList title="Cùng tác giả" />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  description: {
    lineHeight: 23,
    padding: 15
  }
});

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
