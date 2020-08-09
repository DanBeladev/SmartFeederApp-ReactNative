import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import RadioForm from 'react-native-simple-radio-button';
import { Image, View, Text, StyleSheet, Picker, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDate } from '../../../generalComponents/Utils';

export default class RowInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: null,
      showDatePicker:false,
      chosenDate:undefined
    };
    this.getPermissionAsync = this.getPermissionAsync.bind(this);
    this.pickImage = this.pickImage.bind(this);
    this.dateChanged=this.dateChanged.bind(this);
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  dateChanged(event, selectedDate){
    this.setState({showDatePicker: false});
    let date = selectedDate;
    this.props.onGettingValue(date, this.props.params.field)
    this.setState({chosenDate:date});
  };

  async pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.props.onGettingValue({ uri: result.uri }, this.props.params.field);
      }
    } catch (E) {
      console.log(E);
    }
  }
  async getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  render() {
    if (!this.props.params) {
      return '';
    }
    switch (this.props.params.type) {
      case 'text':
      console.log(this.props.params)
        this.elem = (
          <TextInput
            style={styles.elements}
            placeholder={this.props.params.val?this.props.params.val:this.props.title}
            onChangeText={(val) =>
              this.props.onGettingValue(val, this.props.params.field)
            }
          />
        );
        break;
      case 'radio':
        this.elem = (
          <RadioForm
            radio_props={this.props.params.radioProps}
            initial={this.props.params.val?this.props.params.val:0}
            onPress={(value) =>
              this.props.onGettingValue(value, this.props.params.field)
            }
            formHorizontal={true}
            style={styles.radioButtons}
          ></RadioForm>
        );
        break;
      case 'combo':
        this.elem = (
          <View style={{...styles.elements, height:60}}>
          <Picker
            selectedValue={this.state.val}
            onValueChange={(value) => {
              this.setState({ val: value });
              this.props.onGettingValue(value, this.props.params.field);
            }}
          >
            {console.log(this.props.params.val) && this.props.params.val?
              <Picker.Item key={this.props.params.val} label={this.props.params.val} value={this.props.params.val}/>
              :<Picker.Item key={this.props.params.title} label={this.props.params.title} value={0} />
            }
            {this.props.params.data.map((v) => (
              <Picker.Item key={v.label} label={v.label} value={v.value} />
            ))}
          </Picker>
          </View>

        );
        break;
      case 'pic':
        this.elem = (
            <Button onPress={() => this.pickImage()} style={styles.addPicture}>
              {this.props.params.title}
            </Button>
        );
        break;
      case 'button':
        this.elem = (
          <TouchableOpacity
            onPress={() => this.props.params.pickImage()}
            style={styles.addPicture}
          >
            <Text style={styles.addPictureText}>{this.props.params.title}</Text>
          </TouchableOpacity>
        );
      case 'date':
        this.elem =(
          <View style={styles.date}>
            <Button onPress={() => {this.setState({showDatePicker:true})}} style={styles.addPicture}>
              {this.props.params.title}
            </Button>
            <Text style={styles.text}>{this.state.chosenDate? getDate(this.state.chosenDate):
              (this.props.params.val)?getDate(this.props.params.val):"No Chosen Date" }</Text>
          </View>  
        )  

    }
    return (
      <View style={styles.container}>
        {
          <Text style={{ color: 'red', paddingRight: 20 }}>
            {this.props.params.isMandetory ? '*' : ''}
          </Text>
        }
        {this.elem}
        {this.state.showDatePicker? <DateTimePicker
        value={new Date()}
        display='spinner'
        onChange = {this.dateChanged}
        />:null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
  },
  chosenPic:{
    backgroundColor:'red',
    width: 150
  },
  elements: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    padding: 8,
  },
  addPicture: {
    height: 40,
    width: 150,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    color: 'white',
  },
  addPictureText: {
    color: 'blue',
  },
  radioButtons: {
    flex: 1,
    justifyContent: 'space-around',
  },
  combo: {
    height: '100%',
    width: '30%',
    backgroundColor: 'white',
  },
  date:{
    flexDirection:'row'
  },
  text: {
    top:10,
    left:10
  }
});
