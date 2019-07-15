import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import faker from 'faker';
import BookShelfTitle from '../BookShelfTitle';
import { randomImage } from '../../helpers/imageHelper';
import BookItem from './BookItem';

class VerticalBookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: Array.from({ length: 3 }).map((_, index) => ({
        id: index.toString(),
        image: randomImage(200, 300),
        title: faker.random.words(5),
        author: faker.name.firstName(),
        status: faker.random.boolean() ? 'Đang ra' : 'Hoàn thành',
        chapterCount: faker.random.number(100, 2000),
      }))
    };
  }

  renderItem = ({ item }) => (<BookItem book={item} />)

  renderSeparator = () => (<View style={styles.separator} />)

  render() {
    const { books } = this.state;
    return (
      <View style={styles.container}>
        <BookShelfTitle title="SÁCH HAY HO" />
        <FlatList
          data={books}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 0.8,
    backgroundColor: 'darkgray',
    marginLeft: 20,
    marginRight: 20
  },
  container: {
    marginTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  }
});

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalBookList);
