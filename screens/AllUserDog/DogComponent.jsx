import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dogAvatar from '../../assets/noDogImg.jpg';

export default class DogComponent extends Component {
  dogPressed = () => {
    this.props.callBack(this.props.dog);
    this.props.navigation.navigate('DogManagement', {
      screen: 'DogDetails',
    });
  };

  render() {
    const { dog } = this.props;
    return (
      <TouchableOpacity style={style.container} onPress={this.dogPressed}>
        <View style={style.leftSide}>
        {dog.dogImg?
            <Image style={style.image} source={dog.dogImg instanceof Object?dog.dogImg:{uri:dog.dogImg}}></Image>:
            <Image style={style.image} source={dogAvatar}></Image>
        }      
          <Text style={style.dogName}>{dog.dogName}</Text>
        </View>
        <View style={style.innerText}>
          <Text style={style.text}>
            <Text>Last Meal: </Text>
            {dog.lastMealTime ? (
              <Text style={style.time}>{dog.lastMealTime}</Text>
            ) : (
              <Text style={style.time}>Unknown</Text>
            )}
          </Text>
          <Text style={style.text}>
            <Text>Next Meal: </Text>
            {dog.nextMealTime ? (
              <Text style={style.time}>{dog.nextMealTime}</Text>
            ) : (
              <Text style={style.time}>Unknown</Text>
            )}
          </Text>
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
    justifyContent: 'space-between',
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
  },
});
