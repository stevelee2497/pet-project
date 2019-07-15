import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import colors from '../../helpers/colorHelper';

class ChapterItem extends Component {
  showChapterDetail = () => {
    this.props.navigation.navigate('ChapterDetailScreen');
  }

  render() {
    const { chapter } = this.props;
    return (
      <TouchableOpacity style={{ height: 40, justifyContent: 'center' }} onPress={this.showChapterDetail}>
        <Text
          style={{
            color: colors.accent,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20
          }}
          numberOfLines={1}
        >{chapter.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ChapterItem);
