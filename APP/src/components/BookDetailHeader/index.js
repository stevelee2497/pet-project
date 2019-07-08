import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import faker from 'faker';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import images from '../../helpers/imageHelper';
import Rating from '../Rating';
import colors from '../../helpers/colorHelper';


class BookDetailHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.headerBackground} source={images.book} resizeMode="cover">
          <View style={styles.headerBackgroundOverlay} />
        </ImageBackground>

        <View style={styles.header}>
          <TouchableOpacity onPress={this.props.back}>
            <Image style={styles.back} source={images.back} resizeMode="stretch" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.back} source={images.download} resizeMode="stretch" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={styles.bookImageContainer}>
            <Image source={images.book} style={styles.bookImage} />
          </View>
          <View style={styles.rightPanel}>
            <View>
              <Text style={styles.bookTitle} numberOfLines={2}>Tôi thấy hoa vàng trên cỏ xanh</Text>
            </View>
            <View>
              <Text style={styles.normalText} numberOfLines={1}>Tác giả: {faker.random.words(2)}</Text>
              <Text style={styles.normalText} numberOfLines={1}>Trạng thái: {faker.random.words(2)}</Text>
              <Text style={styles.normalText} numberOfLines={1}>Số chương: {faker.random.number(100, 1000)}</Text>
            </View>
            <Rating rate={4.0} />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.readButtonContainer}>
                <Text style={styles.readButton}>ĐỌC NGAY</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.roundButtonContainer}>
                <Image source={images.bookmark} style={styles.roundButton} resizeMode="stretch" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.roundButtonContainer}>
                <Image source={images.listening} style={styles.roundButton} resizeMode="stretch" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height: 250,
    backgroundColor: 'white'
  },
  headerBackground: {
    width,
    height: 230,
    position: 'absolute'
  },
  headerBackgroundOverlay: {
    flex: 1,
    backgroundColor: '#00000088'
  },
  header: {
    height: 50,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  back: {
    width: 30,
    height: 30,
    tintColor: 'white',
    marginLeft: 10,
    marginRight: 10
  },
  bookImageContainer: {
    width: 135,
    height: 200,
    marginLeft: 10,
    shadowColor: 'pink',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    shadowOpacity: 10,
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  rightPanel: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bookTitle: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
  },
  normalText: {
    color: 'white',
    paddingTop: 3,
    paddingBottom: 3
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  roundButtonContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1
  },
  roundButton: {
    width: '60%',
    height: '60%',
    tintColor: colors.pink
  },
  readButtonContainer: {
    height: 40,
    backgroundColor: colors.pink,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  readButton: {
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
    fontWeight: '500'
  }
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailHeader);
