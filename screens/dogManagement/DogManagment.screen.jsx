import React from 'react';
import {connect} from 'react-redux'
import { View, StyleSheet } from 'react-native';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import dogIcon from '../../assets/dogIcon.jpg'
import DogDetails from '../../generalComponents/dogDetails/DogDetails.component';

class DogManagment extends React.Component {
  render() {
    const { dog } = this.props;
    let img;
    if(dog.dogImg){
      img=dog.dogImg instanceof Object?dog.dogImg:{uri:dog.dogImg}
    }
    else{
      img=dogIcon;
    }
    return (
      <View style={style.container}>
        <DogHeader
          {...this.props}
          dog={{ dogName: dog.dogName, dogImg:img}}
        />
        <DogDetails />
      </View>
    );
  }
}

const mapStateToProps= (state)=>{
  return{
    dog:state.dog.currentDog
  }
}

export default connect(mapStateToProps)(DogManagment);

const style = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
});
