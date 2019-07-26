import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { LIBRARY_STATE, BOOK_TYPE } from '../../AppConstants';
import LibrarySwitchButtons from '../../components/LibrarySwitchButtons';
import BookSlide from '../../components/BookSlide';
import HorizontalBookList from '../../components/HorizontalBookList';
import VerticalBookList from '../../components/VerticalBookList';
import images from '../../helpers/imageHelper';
import { fetchBooks } from '../../actions';


class LibraryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => { navigation.navigate('BookDetailScreen'); }}>
        <Image style={styles.headerRight} source={images.search} resizeMode="stretch" />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity>
        <Image style={styles.headerLeft} source={images.refresh} resizeMode="stretch" />
      </TouchableOpacity>
    ),
    headerTitle: <Text style={styles.title}>Thư viện</Text>
  });

  constructor(props) {
    super(props);
    this.state = {
      libraryState: LIBRARY_STATE.BOOK
    };
  }

  componentDidMount() {
    this.props.fetchBooks(BOOK_TYPE.FEATURING_BOOKS, 1, 4);
    this.props.fetchBooks(BOOK_TYPE.NEW_BOOKS, 1, 10);
    this.props.fetchBooks(BOOK_TYPE.TRENDING_BOOKS, 1, 10);
    this.props.fetchBooks(BOOK_TYPE.RECOMMENDING_BOOKS, 1, 3);
  }

  onChangeLibraryState = () => {
    this.setState(oldState => ({ libraryState: oldState.libraryState === LIBRARY_STATE.BOOK ? LIBRARY_STATE.NOVEL : LIBRARY_STATE.BOOK }));
  }

  render() {
    const { library } = this.props;
    return (
      <ScrollView style={styles.container}>
        <LibrarySwitchButtons libraryState={this.state.libraryState} onChangeLibraryState={this.onChangeLibraryState} />
        <BookSlide books={library.featuringBooks} />
        <HorizontalBookList title="SÁCH MỚI" books={library.newBooks} bookType={BOOK_TYPE.NEW_BOOKS} />
        <HorizontalBookList title="ĐỌC NHIỀU" books={library.trendingBooks} bookType={BOOK_TYPE.TRENDING_BOOKS} />
        <VerticalBookList title="SÁCH HAY HO" books={library.recommendingBooks} bookType={BOOK_TYPE.RECOMMENDING_BOOKS} />
        <View style={styles.footer} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  footer: {
    height: 20
  },
  headerRight: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  headerLeft: {
    width: 20,
    height: 20,
    marginLeft: 10
  },
  title: {
    flex: 1,
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({ library: state.library });

const mapDispatchToProps = { fetchBooks };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryScreen);
