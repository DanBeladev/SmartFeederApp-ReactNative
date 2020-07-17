import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Picker } from 'react-native-picker-dropdown';
import { API_INSTANCE } from '../api/api';

export default class DogBreedSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBreeds: [],
    };
  }

  componentDidMount = async () => {
    const res = await API_INSTANCE.fetchDogNames();
    const fullData = [...res.data];
    const arrayOfNames = [];
    fullData.forEach((item) => arrayOfNames.push({name: item.name}));
    this.setState({ allBreeds: arrayOfNames });
  };

  changedDog = (value) => {
      this.props.handleChanged(value);
  }

  render() {
      const item = this.props.breed;
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={item}
          onValueChange={this.changedDog}
          mode='dialog'
          textStyle={styles.pickerText}
        >
          <Picker.Item label='Please Select Dog Breed' value='' />
          {this.state.allBreeds.map((item) => (
            <Picker.Item  key={item.name} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
