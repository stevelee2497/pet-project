import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../helpers/colorHelper';

const ChapterItem = ({ chapter, color, onChapterPress }) => (
  <TouchableOpacity style={styles.container} onPress={() => onChapterPress(chapter)}>
    <Text
      style={{
        color: color || colors.accent,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20
      }}
      numberOfLines={1}
    >{chapter.name}
    </Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center'
  }
});

export default ChapterItem;
