import {
  Dimensions,
  StyleSheet,
  Animated
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import MinimizedHeader from './MinimizedHeader';
import BookInformation from './BookInformation';

class BookDetailHeader extends Component {
  backPressed = () => {
    this.props.navigation.goBack();
  }

  readNow = () => {
    this.props.navigation.navigate('CatalogScreen');
  }

  render() {
    const { translateY, headerCoverHeight, book } = this.props;
    return (
      <Animated.View style={[styles.container, { height: headerCoverHeight }]}>
        <MinimizedHeader backPressed={this.backPressed} title={book.name} />
        <BookInformation translateY={translateY} book={book} readNow={this.readNow} />
      </Animated.View>
    );
  }
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height: 265,
    backgroundColor: 'white',
    paddingBottom: 15,
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
  library: state.library
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(BookDetailHeader));
