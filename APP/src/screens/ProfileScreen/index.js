import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import faker from 'faker';
import images, { randomImage } from '../../helpers/imageHelper';
import colors from '../../helpers/colorHelper';

class ProfileScreen extends Component {
  static navigationOptions = () => ({
    headerRight: (<View />),
    headerLeft: (<View />),
    headerTitle: <Text style={styles.title}>Cá nhân</Text>
  });


  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={randomImage(300, 300)} />
        </View>
        <Text style={styles.userName}>{faker.random.words(5)}
        </Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={images.email} style={styles.icon} />
          <Text>Góp ý</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={images.about} style={styles.icon} />
          <Text>Về chúng tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={images.rating} style={styles.icon} />
          <Text>Đánh giá ứng dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={images.terms} style={styles.icon} />
          <Text>Điều khoản sử dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: colors.pink }]}>
          <Image source={images.logOut} style={[styles.icon, { tintColor: 'white' }]} />
          <Text style={styles.logOut}>Đăng xuất</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  title: {
    flex: 1,
    textAlign: 'center'
  },
  avatarContainer: {
    elevation: 20,
    alignSelf: 'center',
    borderStartColor: 'white',
    margin: 20
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  userName: {
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: 20,
    textAlign: 'center'
  },
  buttonContainer: {
    backgroundColor: 'white',
    elevation: 10,
    padding: 15,
    alignSelf: 'center',
    marginTop: 20,
    width: '60%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 20
  },
  logOut: {
    color: 'white'
  },

});
const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
