import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import { headerHeight } from '../../common/constants';

export default class Statistics extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <DogHeader {...this.props} />
        <Text style={style.content}>STATISTICS</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
  content: {
    top: headerHeight,
  },
});
