import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Stars from 'react-native-stars';
import colors from '../../helpers/colorHelper';
import images from '../../helpers/imageHelper';

class Rating extends Component {
  render() {
    const { rate } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.rate}>{rate}</Text>
        <Stars
          value={rate}
          spacing={8}
          count={5}
          starSize={12}
          backingColor="transparent"
          fullStar={images.star}
          emptyStar={images.emptyStar}
          opacity
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rate: {
    fontWeight: 'bold',
    color: colors.star,
    fontSize: 24,
    marginRight: 5
  }
});

export default Rating;
