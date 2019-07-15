import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import images from '../../helpers/imageHelper';
import colors from '../../helpers/colorHelper';

const { width } = Dimensions.get('window');

class ChapterDetailHeader extends Component {
  back = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { height, title } = this.props;

    return (
      <Animated.View style={[styles.shadowContainer, { height }]}>
        <Animated.View style={[styles.container, { height }]}>
          <TouchableOpacity onPress={this.back}>
            <Image
              style={styles.buttons}
              source={images.back}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <View style={styles.right}>
            <TouchableOpacity onPress={this.setting}>
              <Image
                style={styles.buttons}
                source={images.setting}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openCatalog}>
              <Image
                style={styles.buttons}
                source={images.catalog}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.listen}>
              <Image
                style={styles.buttons}
                source={images.listening}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.title} ellipsizeMode="tail">{title}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  shadowContainer: {
    width,
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttons: {
    tintColor: colors.primaryText,
    width: 24,
    height: 24,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  title: {
    flex: 1
  }
});

export default withNavigation(ChapterDetailHeader);
