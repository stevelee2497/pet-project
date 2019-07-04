import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../../helpers/colorHelper';

class BookShelfTitle extends Component {
  render() {
    const { title, onViewMore } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.leftItems}>
          <View style={styles.line} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <TouchableOpacity style={styles.viewMoreTouch} onPress={onViewMore}>
          <Text style={styles.viewMoreText}>Xem thêm  »</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

const styles = StyleSheet.create({
  leftItems: {
    flexDirection: 'row'
  },
  viewMoreText: {
    color: 'darkgrey'
  },
  viewMoreTouch: {
    marginRight: 15
  },
  title: {
    padding: 10,
    fontWeight: '500'
  },
  line: {
    width: 2,
    backgroundColor: colors.pink,
    marginLeft: 5
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BookShelfTitle);
