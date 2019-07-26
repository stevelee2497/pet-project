import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { fakeBooks } from '../../sagas/bookSagas';
import BookItem from '../../components/VerticalBookList/BookItem';
import images from '../../helpers/imageHelper';

class BookShelfScreen extends Component {
  static navigationOptions = () => ({
    headerRight: (
      <TouchableOpacity>
        <Image style={styles.headerRight} source={images.filter} resizeMode="stretch" />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity>
        <Image style={styles.headerLeft} source={images.refresh} resizeMode="stretch" />
      </TouchableOpacity>
    ),
    headerTitle: <Text style={styles.headerTitle}>Tủ sách</Text>
  });

  renderItem = ({ item }) => (<BookItem book={item} />)

  renderSeparator = () => (<View style={styles.separator} />)

  render() {
    const books = fakeBooks(12);

    return (
      <View style={styles.container}>
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

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const styles = StyleSheet.create({
  headerRight: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 10
  },
  headerLeft: {
    width: 20,
    height: 20,
    marginLeft: 10
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 10
  },
  separator: {
    height: 0.8,
    backgroundColor: 'darkgray',
    marginLeft: 20,
    marginRight: 20
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookShelfScreen);
