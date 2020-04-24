import React, { useState } from 'react';
import { connect } from 'react-redux';
import {setDog} from '../../actions/dogsActions';
import { StyleSheet, View, Text, ActivityIndicator, Button } from 'react-native';
import Modal from 'react-native-modal';
import DogComponent from './DogComponent';
import * as firebase from 'firebase';
import ActionButton from 'react-native-action-button';
import Form from '../../generalComponents/Templates/Form/Form';
import {uploadImage} from '../../generalComponents/Utils';
import Header from '../../generalComponents/Header/Header';
import { backgroundColor, headerHeight } from '../../common/constants';

class DogsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      allUserDogs:[],
      isModalVisible: false,
      currentUserID: '',
    };
    this.storage=firebase.storage().ref();
    this.dataBase=firebase.database();
    this.counter=0;
  }
  componentDidMount() {
    const { userID,name } = this.props.user.userDetails;
    let allDogs=this.state.allUserDogs;
    firebase.database().ref('Dogs/').orderByChild('ownerID').equalTo(userID).on('value',snapshot=>{
      let index=0;
      snapshot.forEach((dogFromDb)=>{
        if(dogFromDb){
        const dog=dogFromDb.val();
        allDogs.push(dog);
      }}) 
      this.setState({isLoaded:true, allUserDogs:allDogs});
    })
  }
  buildForm = () => {
    let fields = [
      {
        type: 'text',
        field: 'dogName',
        title: 'Dog Name',
        isMandetory:true,
        labelVisibale: true,
      },
      {
        type: 'radio',
        field: 'gender',
        title: 'Gender',
        labelVisibale: true,
        radioProps: [
          { label: 'Male     ', value: 0 },
          { label: 'Female', value: 1 },
        ],
      },
      {
        type: 'text',
        field: 'age',
        title: 'Age',
        labelVisibale: true,
        valueType:"Integer"
      },
      { type: 'pic', field: 'dogImg', labelVisibale: false, title: 'add pic' },
    ];
    return <Form fields={fields} callBack={this.formCallBack}></Form>;
  };

  formCallBack = (fieldsToValue) => { 
    let newest=[...this.state.allUserDogs];
    this.setState({isModalVisible:false});
    const { userID,name } = this.props.user.userDetails;
    const newDog = {
      dogName: fieldsToValue.dogName,
      ownerID: userID,
      gender:fieldsToValue.gender?fieldsToValue.gender:0,
      age:fieldsToValue.age  
    }; 
    firebase.database().ref('Dogs/').push(newDog);
    if(fieldsToValue.dogImg){
      newDog["dogImg"]=fieldsToValue.dogImg;
      uploadImage(fieldsToValue.dogImg.uri,userID+"/"+fieldsToValue.dogName+"Profile")
    }
    newest.push(newDog);
    this.setState({allUserDogs: newest,isModalVisible:false});
  };


  callBackForDogChoosing=(dog)=>{
    this.props.setDog(dog) 
  }

  onAddClick = () => {
    this.setState({ isModalVisible: true });
  };

  render() {
    const allDogsObj=this.state.allUserDogs;

    return (
      <View style={styles.container}>
        <Header {...this.props} />
        {this.state.isLoaded ? (
          <View style={styles.dogs}>
            {allDogsObj.length > 0 ? (
              allDogsObj.map((dog) =>{ 
              return <DogComponent key={dog.dogName}
               dog={dog} callBack={this.callBackForDogChoosing} navigation={this.props.navigation} />})):(
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
const mapDispatchToProps=(dispatch)=>{
  return{
      setDog:(dog)=>{
          dispatch(setDog(dog));
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DogsScreen);

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
