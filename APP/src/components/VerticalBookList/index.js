import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import BookShelfTitle from '../BookShelfTitle';
import BookItem from './BookItem';

class VerticalBookList extends Component {
  renderItem = ({ item }) => (<BookItem book={item} />)

  renderSeparator = () => (<View style={styles.separator} />)

  onViewMore = () => {
    const {
      bookType, title, navigation, books
    } = this.props;
    navigation.navigate('BookCollectionScreen', { bookType, title, books });
  }

  render() {
    const { books, title } = this.props;
    return (
      <View style={styles.container}>
        <BookShelfTitle title={title} onViewMore={this.onViewMore} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(VerticalBookList));
