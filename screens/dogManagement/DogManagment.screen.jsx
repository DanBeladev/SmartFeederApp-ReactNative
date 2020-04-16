import React from 'react';
import { View, StyleSheet } from 'react-native';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import DogDetails from '../../generalComponents/dogDetails/DogDetails.component';

export default class DogManagment extends React.Component {
  render() {
    const { dog } = this.props;
    return (
      <View style={style.container}>
        <DogHeader
          dog={{ dogName: 'Nala', dogImg: require('../../assets/hand.png') }}
        />
        <DogDetails />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
});