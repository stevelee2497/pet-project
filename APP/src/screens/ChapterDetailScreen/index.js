import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Animated,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import faker from 'faker';
import { Header } from 'react-navigation';
import ChapterDetailHeader from '../../components/ChapterDetailHeader';

const { width } = Dimensions.get('window');

class ChapterDetailScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      hideHeader: false,
      chapter: {
        id: faker.random.uuid(),
        name: `Chương ${faker.random.number(100, 1000)}: ${faker.random.words(6)}`,
        content: `\n\t${Array.from({ length: 22 }).map(() => faker.random.words(50)).join('.\n\n\t')}`
      },
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -Header.HEIGHT : 0,
      ),
    };
  }

  render() {
    const { chapter } = this.state;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, Header.HEIGHT],
      outputRange: [Header.HEIGHT, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <ScrollView
          style={{
            flex: 1, padding: 10, paddingTop: 10 + Header.HEIGHT, paddingBottom: 20
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          )}
        >
          <Text style={styles.title}>{chapter.name}</Text>
          <Text style={styles.content}>{chapter.content}</Text>
        </ScrollView>
        <ChapterDetailHeader height={headerHeight} title={chapter.name} />
        {/* <Animated.View style={[styles.header, { height: headerHeight }]}>
        </Animated.View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  title: {
    lineHeight: 25,
    marginTop: 10,
    textAlign: 'center'
  },
  content: {
    lineHeight: 25,
    flexWrap: 'wrap',
  },
  header: {
    width,
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterDetailScreen);
