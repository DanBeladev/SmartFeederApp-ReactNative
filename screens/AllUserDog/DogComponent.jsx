import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dogAvatar from '../../assets/noDogImg.jpg';
import { API_BASE_URL } from '../../api/api';

export default class DogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
    };
  }

  dogPressed = () => {
    this.props.callBack(this.props.dog);
    this.props.navigation.navigate('DogManagement', {
      screen: 'DogDetails',
      params: { updateUserDogs: this.props.fetchDogs },
    });
  };

  getAgeFromBirthDate = (birthDate) => {
    const date = new Date(birthDate);
    const today = new Date();
    const bDate = new Date(birthDate);
    let age = today.getFullYear() - bDate.getFullYear();
    const m = today.getMonth() - bDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bDate.getDate())) {
      age--;
    }
    console.log('age: ', age);
    return age;
  };

  render() {
    const { dog } = this.props;
    const { birthDate, gender } = dog;
    const age = this.getAgeFromBirthDate(birthDate);
    const image = `${API_BASE_URL}${dog.image}`;
    return (
      <TouchableOpacity style={style.container} onPress={this.dogPressed}>
        <View style={style.leftSide}>
          {this.state.img || dog.image ? (
            <Image
              style={style.image}
              source={image ? {uri:image} : { uri: this.state.img }}
            ></Image>
          ) : (
            <Image style={style.image} source={dogAvatar}></Image>
          )}
          <Text style={style.dogName}>{dog.name}</Text>
        </View>
        <View style={style.innerText}>
        <View style={style.text}>
            <Text style={style.time}>{dog.breed}</Text>
            <Text style={style.text}>{age}</Text>
            <Text style={style.text}>{gender}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fffff9',
    flexDirection: 'row',
    height: 140,
    width: '100%',
    padding: 20,
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 20,
  },
  image: {
    bottom: 10,
    height: 150,
    width: 100,
    maxHeight: '100%',
    maxWidth: '100%',
    borderRadius: 100,
    right: 10,
  },
  innerText: {
    marginHorizontal:20,
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'flex-start',
  },

  leftSide: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  dogName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    width: '100%',
    height: 30,
    bottom: 12,
    right: 10,
  },

  text: {
    fontSize: 20,
  },
  time: {
    color: 'black',
    fontWeight: 'bold',
    fontSize:20
  },
});
