import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setDog } from '../../actions/dogsActions';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import DogComponent from './DogComponent';
import * as firebase from 'firebase';
import ActionButton from 'react-native-action-button';
import Form from '../../generalComponents/Templates/Form/Form';
import { uploadImage } from '../../generalComponents/Utils';
import Header from '../../generalComponents/Header/Header';
import { backgroundColor, headerHeight } from '../../common/constants';
import Axios from 'axios';
import { API_INSTANCE, API_URL } from '../../api/api';

class DogsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      allUserDogs: [],
      isModalVisible: false,
      currentUserID: '',
    };
    this.storage = firebase.storage().ref();
    this.dataBase = firebase.database();
    this.counter = 0;
  }
  async componentDidMount() {
    console.log('in dogs screen', this.props.user.userDetails);
    const { token } = this.props.user.userDetails;
    const data = await API_INSTANCE.getDogs(token);
    const dogs = [...data.data];
    this.setState({allUserDogs: dogs, isLoaded: true});
  }

  buildForm = () => {
    let fields = [
      {
        type: 'text',
        field: 'dogName',
        title: 'Dog Name',
        isMandetory: true,
        labelVisibale: true,
      },
      {
        type: 'radio',
        field: 'gender',
        title: 'Gender',
        labelVisibale: true,
        radioProps: [
          { label: 'Male     ', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ],
      },
      {
        type: 'text',
        field: 'age',
        title: 'Age',
        labelVisibale: true,
        valueType: 'Integer',
      },
      {
        type: 'pic',
        field: 'dogImg',
        labelVisibale: false,
        title: 'Upload Image',
      },
    ];
    return (
      <Form
        fields={fields}
        callBack={this.formCallBack}
        // callBack={this.test}
        closeForm={() => {
          this.setState({ isModalVisible: false });
        }}
      ></Form>
    );
  };

  callBackForDogChoosing = (dog) => {
    this.props.setDog(dog);
  };

  onAddClick = () => {
    this.setState({ isModalVisible: true });
  };

  // get object with values of form
  formCallBack = (fieldsToValue) => {
    let newest = [...this.state.allUserDogs];
    this.setState({ isModalVisible: false });
    const { userID, name } = this.props.user.userDetails;
    const newDog = {
      dogName: fieldsToValue.dogName,
      ownerID: userID,
      gender: fieldsToValue.gender ? fieldsToValue.gender : 0,
      age: fieldsToValue.age,
    };
    firebase.database().ref('Dogs/').push(newDog);
    if (fieldsToValue.dogImg) {
      newDog['dogImg'] = fieldsToValue.dogImg;
      uploadImage(
        fieldsToValue.dogImg.uri,
        userID + '/' + fieldsToValue.dogName + 'Profile'
      );
    }
    newest.push(newDog);
    this.setState({ allUserDogs: newest, isModalVisible: false });
  };

/*
  var axios = require('axios');
  var FormData = require('form-data');
  var fs = require('fs');

  var data = new FormData();
  data.append('name', 'luli');
  data.append('gender', 'female');
  data.append('birthDate', '2002-11-15');
  data.append('image', fs.createReadStream('/C:/Users/shmue/Pictures/iCloud Photos/Downloads/1A6A0C69-0B1D-41CF-BCE9-08E3F13C0308.JPG'));
  
  var config = {
    method: 'post',
    url: 'http:\\\\localhost:3000/api/v1.0/dogs/new',
    headers: { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDc1MDZhODk5MjA4MDAxNzYwNGFjYyIsImlhdCI6MTU5NDM2NjE1NCwiZXhwIjoxNTk0OTcwOTU0fQ.EAp5qcUQTO5TThkKWzpXTObunQ53g6zAHKeg7R0hFek', 
      ...data.getHeaders()
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
*/
  test = (fieldsToValue) => {
    console.log('in test');
    console.log('in test-fields->', fieldsToValue);
    const { token } = this.props.user.userDetails;
    let data = new FormData();
    data.append('name', fieldsToValue.dogName);
    data.append('gender', fieldsToValue.gender);
    data.append('birthDate', '2002-11-15');
    console.log('image uri: ',fieldsToValue.dogImg.uri );
    data.append('photo', {
      uri: fieldsToValue.dogImg.uri,
      name: 'photo.png',
      filename: 'imageName.png',
      type: 'image/png',
    });
    data.append('Content-Type', 'image/png');
    console.log('data: ',data);
    Axios.post(`${API_URL}dogs/new`, {
      data: data,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => checkStatus(res))
      .then((res) => res.json())
      .then((res) => {
        console.log('response' + JSON.stringify(res));
      })
      .catch((e) => console.log(e))
      .done();
    // console.log('in test');
    // const dog = {
    //   name: 'Rami',
    //   gender: 'Male',
    //   birthDate: '2000-11-15',
    // };
    // const { token } = this.props.user.userDetails;
    // API_INSTANCE.addDog(dog, token)
    //   .then((res) => {
    //     console.log(' created ', res);
    //   })
    //   .catch((err) => {
    //     console.log('oh no ', err);
    //   });
  };

  render() {
    const allDogsObj = this.state.allUserDogs;
    

    return (
      <View style={styles.container}>
        <Header {...this.props} />
        {this.state.isLoaded ? (
          <View style={styles.dogs}>
            {allDogsObj.length > 0 ? (
              allDogsObj.map((dog) => {
                console.log('dog is->', dog);
                return (
                  <DogComponent
                    key={dog._id}
                    dog={dog}
                    callBack={this.callBackForDogChoosing}
                    navigation={this.props.navigation}
                  />
                );
              })
            ) : (
              <Text style={styles.noDogsText}>You don't have any dogs</Text>
            )}
          </View>
        ) : (
          <ActivityIndicator style={styles.loader} size='large' />
        )}
        <Modal
          onBackdropPress={() => {
            this.setState({ isModalVisible: false });
          }}
          isVisible={this.state.isModalVisible}
        >
          {this.buildForm()}
        </Modal>
        <ActionButton
          position='center'
          size={70}
          buttonColor='green'
          onPress={this.onAddClick}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setDog: (dog) => {
      dispatch(setDog(dog));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogsScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  header: {
    marginTop: 25,
    position: 'relative',
    fontSize: 35,
  },
  dogs: {
    flexDirection: 'column',
    width: '90%',
    height: 100,
    top: headerHeight,
  },
  loader: {
    top: '30%',
  },
  noDogsText: {
    fontSize: 30,
  },
});
