import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import images, { randomImage } from '../../helpers/imageHelper';
import LibrarySwitchButtons from '../../components/LibrarySwitchButtons';
import { LIBRARY_STATE } from '../../AppConstants';

const { width } = Dimensions.get('window');

class LibraryScreen extends Component {
  static navigationOptions = {
    title: 'Thư viện',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={images.home}
        style={{
          width: 18,
          height: 18,
          tintColor,
          marginTop: 6,
        }}
        resizeMode="stretch"
      />
    ),
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
      <View style={styles.container}>
        <LibrarySwitchButtons libraryState={this.state.libraryState} onChangeLibraryState={this.onChangeLibraryState} />
        <View style={{
          width,
          height: 240,
          backgroundColor: 'white'
        }}
        >
          <Swiper activeDotColor="white" paginationStyle={{ position: 'absolute', bottom: 30 }}>
            {
              Array.from({ length: 4 }).map((_, index) => (
                <Image key={index.toString()} source={randomImage(1000, 600)} style={{ width, height: 220 }} resizeMode="stretch" />
              ))
            }
          </Swiper>
        </View>

        <View style={{ marginTop: 20, backgroundColor: 'white' }}>
          <Text>TRUYỆN MỚI CẬP NHẬT</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  }
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryScreen);
