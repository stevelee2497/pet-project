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
  constructor(props) {
    super(props);

    this.state = {
      books: Array.from({ length: 21 }).map((_, index) => ({
        id: index.toString(),
        image: randomImage(200, 300),
        title: faker.random.words(2)
      }))
    };
  }

  renderItem = ({ item }) => (<BookItem book={item} />)

  render() {
    const { books } = this.state;

    return (
      <View style={styles.container}>
        <BookShelfTitle title="SÁCH MỚI" />
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
    marginLeft: 10
  },
  container: {
    marginTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBookList);
