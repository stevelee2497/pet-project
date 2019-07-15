import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import faker from 'faker';
import BookShelfTitle from '../BookShelfTitle';
import colors from '../../helpers/colorHelper';
import ChapterItem from '../ChapterItem';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapters: Array.from({ length: 3 }).map((_, index) => ({
        id: index.toString(),
        name: `Chương ${index}: ${faker.random.words(6)}`
      }))
    };
  }

  renderItem = ({ item }) => (<ChapterItem chapter={item} />)

  renderSeparator = () => (
    <View style={{
      height: 0.6,
      backgroundColor: 'darkgray',
      marginLeft: 20,
      marginRight: 20
    }}
    />
  )

  render() {
    const { chapters } = this.state;
    return (
      <View>
        <BookShelfTitle title="Mục lục" onViewMore={this.props.onViewMore} />
        <FlatList
          data={chapters}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
