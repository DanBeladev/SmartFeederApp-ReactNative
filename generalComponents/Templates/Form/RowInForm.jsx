import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import RadioForm from 'react-native-simple-radio-button';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  TextInput,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class RowInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: null,
    };
    this.image;
    this.getPermissionAsync = this.getPermissionAsync.bind(this);
    this.pickImage = this.pickImage.bind(this);
  }
  componentDidMount() {
    this.getPermissionAsync();
  }
  async pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.image = result.uri;
        this.props.onGettingValue({ uri: this.image }, this.props.params.field);
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
        this.elem = (
          <TextInput
            style={styles.elements}
            placeholder={this.props.title}
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
            initial={0}
            onPress={(value) =>
              this.props.onGettingValue(value, this.props.params.field)
            }
            formHorizontal={true}
          ></RadioForm>
        );
        break;
      case 'combo':
        this.elem = (
          <Picker
            style={styles.combo}
            selectedValue={this.state.val}
            onValueChange={(value) => {
              this.setState({ val: value });
              this.props.onGettingValue(value, this.props.params.field);
            }}
          >
            {this.props.params.data.map((v) => (
              <Picker.Item key={v.label} label={v.label} value={v.value} />
            ))}
          </Picker>
        );
        break;
      case 'pic':
        this.elem = (
            <TouchableOpacity onPress={() => this.props.params.pickImage()} style={styles.addPicture}>
            <Text style={{fontSize:15}}>{this.props.params.title}</Text>
        </TouchableOpacity>
        );
        break;
      case 'button':
        this.elem = (
          <TouchableOpacity onPress={() => this.props.params.pickImage()} style={styles.addPicture}>
              <Text >{this.props.params.title}</Text>
          </TouchableOpacity>
        );
    }
    return (
      <View style={styles.container}>
        {/* <Text>{this.props.params.labelVisibale?this.props.params.title:""}</Text> */}
        {
          <Text style={{ color: 'red', paddingRight: 20 }}>
            {this.props.params.isMandetory ? '*' : ''}
          </Text>
        }
        {this.elem}
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
  elements: {
    // height:"80%",
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    padding: 8,
    // textShadowColor:'red'
  },
  addPicture: {
    backgroundColor: 'blue',
    height: 40,
    width: 150,
    borderRadius: 100,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:2,
    borderColor: 'black'
  },
  radioButton: {
    height: 13,
  },
  combo: {
    height: '100%',
    width: '30%',
    backgroundColor: 'white',
  },
});
