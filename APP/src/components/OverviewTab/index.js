import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import faker from 'faker';
import HorizontalBookList from '../HorizontalBookList';
import Catalog from '../Catalog';

class OverviewTab extends Component {
  static navigationOptions = {
    tabBarLabel: ({ focused }) => (
      <Text style={{ fontWeight: focused ? 'bold' : '100', textAlign: 'left', marginLeft: 5 }}>Giới thiệu</Text>
    )
  }

  showFullCatalog = () => {
    this.props.navigation.navigate('CatalogScreen');
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ lineHeight: 23, padding: 15 }} numberOfLines={10}>{faker.random.words(200)}</Text>
        <Catalog onViewMore={this.showFullCatalog} />
        <HorizontalBookList title="Cùng tác giả" />
      </ScrollView>
    );
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
