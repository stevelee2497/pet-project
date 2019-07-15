import React, { Component, createRef } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Animated,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import faker from 'faker';
import { Header } from 'react-navigation';
import ChapterDetailHeader from '../../components/ChapterDetailHeader';
import images from '../../helpers/imageHelper';
import colors from '../../helpers/colorHelper';

const { width } = Dimensions.get('window');

class ChapterDetailScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      chapter: {
        id: faker.random.uuid(),
        name: `Chương ${faker.random.number(100, 1000)}: ${faker.random.words(6)}`,
        content: `\n\t${Array.from({ length: 22 }).map(() => faker.random.words(50)).join('.\n\n\t')}`
      },
      scrollY: new Animated.Value(0),
    };
    this.scrollView = createRef();
  }

  scrollToTop = () => {
    this.scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  render() {
    const { chapter } = this.state;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, Header.HEIGHT],
      outputRange: [Header.HEIGHT, 0],
      extrapolate: 'clamp',
    });

    const animatingScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
    );

    const upOpacity = this.state.scrollY.interpolate({
      inputRange: [0, Header.HEIGHT * 2],
      outputRange: [0, 0.4],
      extrapolate: 'clamp',
    });

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          scrollEventThrottle={16}
          onScroll={animatingScroll}
          ref={this.scrollView}
        >
          <Text style={styles.title}>{chapter.name}</Text>
          <Text style={styles.content}>{chapter.content}</Text>
          <Text style={styles.title}>-----Kết chương-----</Text>
          <View style={{ height: 100 }} />
        </ScrollView>
        <ChapterDetailHeader height={headerHeight} title={chapter.name} />

        <AnimatedTouchable style={[styles.upContainer, { opacity: upOpacity }]} onPress={this.scrollToTop}>
          <Image source={images.up} style={styles.up} resizeMode="stretch" />
        </AnimatedTouchable>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  scroll: {
    flex: 1,
    padding: 10,
    paddingTop: 10 + Header.HEIGHT
  },
  title: {
    lineHeight: 25,
    marginTop: 10,
    textAlign: 'center'
  },
  content: {
    lineHeight: 25,
  },
  header: {
    width,
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  upContainer: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primaryText,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  up: {
    width: '40%',
    height: '40%',
    tintColor: 'white',
  }
});

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterDetailScreen);
