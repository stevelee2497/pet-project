import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import Player from '../../components/Player';
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

    this.state = {
      chapters: fakeChapters(50)
    };
  }

  renderItem = ({ item }) => (<ChapterItem chapter={item} color={colors.textLightSecondary} />)

  renderSeparator = () => (<Separator />)

  render() {
    return (
      <ScrollView style={styles.container}>
        <Player />
        <View style={{ height: 1, backgroundColor: colors.divider }} />
        <View>
          <FlatList
            data={this.state.chapters}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </ScrollView>
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
  }
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioScreen);
