import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import BookShelfTitle from '../BookShelfTitle';
import BookItem from './BookItem';

class HorizontalBookList extends Component {
  renderItem = ({ item }) => (<BookItem book={item} />)

  onViewMore = () => {
    const {
      bookType, title, navigation, books
    } = this.props;
    navigation.navigate('BookCollectionScreen', { bookType, title, books });
  }

  render() {
    const { title, books } = this.props;

    return (
      <View style={styles.container}>
        <BookShelfTitle title={title} onViewMore={this.onViewMore} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HorizontalBookList));
