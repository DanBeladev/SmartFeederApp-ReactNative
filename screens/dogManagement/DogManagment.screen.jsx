import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import DogDetails from '../../generalComponents/dogDetails/DogDetails.component';

class DogManagment extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <DogHeader
          {...this.props}
        />
        <DogDetails />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dog: state.dog.currentDog,
  };
};

export default connect(mapStateToProps)(DogManagment);

const style = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
  },
});
