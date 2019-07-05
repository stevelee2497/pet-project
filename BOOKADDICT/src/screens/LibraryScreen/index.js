import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { LIBRARY_STATE } from '../../AppConstants';
import LibrarySwitchButtons from '../../components/LibrarySwitchButtons';
import BookSlide from '../../components/BookSlide';
import HorizontalBookList from '../../components/HorizontalBookList';
import VerticalBookList from '../../components/VerticalBookList';

class LibraryScreen extends Component {
  static navigationOptions = {
    title: 'THƯ VIỆN'
  };

  constructor(props) {
    super(props);
    this.state = {
      libraryState: LIBRARY_STATE.BOOK
    };
  }

  onChangeLibraryState = () => {
    this.setState(oldState => ({ libraryState: oldState.libraryState === LIBRARY_STATE.BOOK ? LIBRARY_STATE.NOVEL : LIBRARY_STATE.BOOK }));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <LibrarySwitchButtons libraryState={this.state.libraryState} onChangeLibraryState={this.onChangeLibraryState} />
        <BookSlide />
        <HorizontalBookList title="SÁCH MỚI" />
        <HorizontalBookList title="ĐỌC NHIỀU" />
        <VerticalBookList />
        <View style={styles.footer} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  footer: {
    height: 20
  }
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryScreen);
