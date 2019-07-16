import {
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Animated
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import images from '../../helpers/imageHelper';
import MinimizedHeader from './MinimizedHeader';
import BookInformation from './BookInformation';

class BookDetailHeader extends Component {
  backPressed = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { translateY, headerCoverHeight } = this.props;
    return (
      <Animated.View style={[styles.container, { height: headerCoverHeight }]}>
        <ImageBackground style={styles.headerBackground} source={images.book} resizeMode="cover">
          <View style={styles.headerBackgroundOverlay} />
        </ImageBackground>
        <MinimizedHeader backPressed={this.backPressed} />
        <BookInformation translateY={translateY} />
      </Animated.View>
    );
  }
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height: 255,
    backgroundColor: 'white',
    paddingBottom: 5,
    overflow: 'hidden',
  },
  headerBackground: {
    width,
    height: 230,
    position: 'absolute'
  },
  headerBackgroundOverlay: {
    flex: 1,
    backgroundColor: '#00000088'
  }
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(BookDetailHeader));
