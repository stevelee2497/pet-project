import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import Player, {
  PLAYER_MAX_HEIGHT,
  PLAYER_MIN_HEIGHT,
  PLAYER_STATE
} from '../../components/Player';
import colors from '../../helpers/colorHelper';
import ChapterItem from '../../components/ChapterItem';
import Separator from '../../components/Separator';
import { fakeChapters } from '../../sagas/bookSagas';

class AudioScreen extends Component {
  static navigationOptions = () => ({
    headerRight: (<View />),
    headerLeft: (<View />),
    headerTitle: <Text style={styles.title}>Playlist</Text>
  });

  constructor(props) {
    super(props);

    const chapters = fakeChapters(50);

    this.state = {
      chapters,
      playingChapter: chapters[0],
      scrollY: new Animated.Value(0)
    };
  }

  onChapterItemPress = (chapter) => {
    this.setState({ playingChapter: chapter });
  }

  renderItem = ({ item }) => (
    <ChapterItem
      chapter={item}
      color={item === this.state.playingChapter ? colors.accent : colors.textLightSecondary}
      onChapterPress={this.onChapterItemPress}
    />
  )

  renderSeparator = () => (<Separator />)

  render() {
    const translateY = this.state.scrollY.interpolate({
      inputRange: [0, PLAYER_MAX_HEIGHT],
      outputRange: [0, PLAYER_MIN_HEIGHT - PLAYER_MAX_HEIGHT],
      extrapolate: 'clamp',
    });

    const onScrollAnimating = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
    );

    return (
      <View
        style={styles.container}
      >
        <Player chapter={this.state.playingChapter} style={styles.player} translateY={translateY} />
        <FlatList
          data={this.state.chapters}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          extraData={this.state.playingChapter}
          scrollEventThrottle={16}
          onScroll={onScrollAnimating}
          style={{ paddingTop: PLAYER_MAX_HEIGHT }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center'
  },
  player: {
    zIndex: 1,
    backgroundColor: 'white',
    position: 'absolute'
  }
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioScreen);
