import React, { Component } from 'react';
import {
  View, FlatList, SectionList, Text, TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';
import faker from 'faker';
import ChapterItem from '../../components/ChapterItem';
import { CHAPTER_SORT } from '../../AppConstants';
import BookShelfTitle from '../../components/BookShelfTitle';
import images from '../../helpers/imageHelper';
import colors from '../../helpers/colorHelper';

class CatalogScreen extends Component {
  static navigationOptions = {
    title: 'Mục lục'
  }

  constructor(props) {
    super(props);

    this.state = {
      chapters: Array.from({ length: 100 }).map((_, index) => ({
        id: index.toString(),
        name: `Chương ${index}: ${faker.random.words(6)}`
      })),
      sort: CHAPTER_SORT.ASC
    };

    this.chapterList = React.createRef();
  }

  getSection = (chapters, isFull) => (isFull ? [{
    title: 'Toàn bộ chương',
    data: chapters
  }] : [{
    title: 'Chương mới nhất',
    data: chapters.slice(chapters.length - 5).reverse()
  }, {
    title: 'Toàn bộ chương',
    data: chapters
  }])

  renderHeader = ({ section: { title } }) => (
    <BookShelfTitle
      title={title}
      style={{ backgroundColor: 'white' }}
      titleOnly
    />
  )

  renderItem = ({ item, index, section }) => (<ChapterItem chapter={item} />)

  renderSeparator = () => (
    <View style={{
      height: 0.6,
      backgroundColor: 'darkgray',
      marginLeft: 20,
      marginRight: 20
    }}
    />
  )

  reverseChapters = () => {
    this.setState(state => ({ chapters: state.chapters.reverse() }));
    this.chapterList.current.scrollToLocation({ itemIndex: 0, sectionIndex: 0, animated: true });
  }

  render() {
    const { chapters, sort } = this.state;
    const sections = this.getSection(chapters);

    return (
      <View style={{ flex: 1 }}>
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={this.renderHeader}
          sections={sections}
          keyExtractor={(item, index) => item + index}
          ref={this.chapterList}
          getItemLayout={(data, index) => (
            { length: 40, offset: 40 * index, index }
          )}
        />
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: colors.primaryText,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={this.reverseChapters}
        >
          <Image
            source={images.sort}
            style={{
              width: '40%',
              height: '40%',
              tintColor: 'white'
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogScreen);
