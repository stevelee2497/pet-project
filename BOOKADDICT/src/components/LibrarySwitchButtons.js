import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet
} from 'react-native';
import colors from '../helpers/colorHelper';
import { LIBRARY_STATE } from '../AppConstants';

class LibrarySwitchButtons extends Component {
  onLeftButtonPressed = () => {
    if (this.props.libraryState === LIBRARY_STATE.NOVEL) {
      this.props.onChangeLibraryState();
    }
  }

  onRightButtonPressed = () => {
    if (this.props.libraryState === LIBRARY_STATE.BOOK) {
      this.props.onChangeLibraryState();
    }
  }

  render() {
    const { libraryState } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ ...styles.leftButton, backgroundColor: libraryState === LIBRARY_STATE.NOVEL ? 'white' : colors.pink }}
          onPress={this.onLeftButtonPressed}
        >
          <Text style={{ ...styles.leftButtonTitle, color: libraryState === LIBRARY_STATE.NOVEL ? 'black' : 'white' }}>SÁCH</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.rightButton, backgroundColor: libraryState === LIBRARY_STATE.NOVEL ? colors.pink : 'white' }}
          onPress={this.onRightButtonPressed}
        >
          <Text style={{ ...styles.rightButtonTitle, color: libraryState === LIBRARY_STATE.NOVEL ? 'white' : 'black' }}>TRUYỆN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftButton: {
    backgroundColor: colors.pink,
    padding: 5,
    width: 80,
    height: 30,
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.pink,
    justifyContent: 'center',
    borderRightWidth: 0
  },
  leftButtonTitle: {
    color: 'white',
    fontWeight: '400'
  },
  rightButton: {
    backgroundColor: 'white',
    padding: 5,
    width: 80,
    height: 30,
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.pink,
    justifyContent: 'center',
    borderLeftWidth: 0
  },
  rightButtonTitle: {
    color: 'black',
    fontWeight: '400'
  }
});

export default LibrarySwitchButtons;
