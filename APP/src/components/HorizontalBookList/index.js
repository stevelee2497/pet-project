import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import faker from 'faker';
import BookShelfTitle from '../BookShelfTitle';
import { randomImage } from '../../helpers/imageHelper';
import BookItem from './BookItem';

class HorizontalBookList extends Component {
  renderItem = ({ item }) => (<BookItem book={item} />)

  render() {
    const { title, books } = this.props;

    return (
      <View style={styles.container}>
        <BookShelfTitle title={title} />
        <FlatList
          horizontal
          data={books}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainerStyle}
        />
      </View>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

const styles = StyleSheet.create({
  listContainerStyle: {
    marginLeft: 10,
    paddingRight: 10,
  },
  container: {
    marginTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBookList);
