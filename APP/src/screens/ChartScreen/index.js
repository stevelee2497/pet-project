import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import images from '../../helpers/imageHelper';
import BookItem from '../../components/HorizontalBookList/BookItem';
import { fakeBooks } from '../../sagas/bookSagas';

const { width } = Dimensions.get('window');

class ChartScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
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
    headerTitle: <Text style={styles.headerTitle}>{navigation.getParam('title', 'Bảng xếp hạng')}</Text>
  });

  renderItem = ({ item }) => (
    <BookItem
      book={item}
      width={(width - 50) / 3}
    />
  )

  render() {
    const { bookType } = this.props;

    const books = fakeBooks(12);

    return (
      <View style={styles.container}>
        <FlatList
          data={books}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainerStyle}
          numColumns={3}
          columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
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
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartScreen);
