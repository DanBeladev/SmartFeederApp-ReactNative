import React, { useState } from 'react';
import { connect } from 'react-redux';
import {setDog} from '../../actions/dogsActions';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
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
      allUserDogs: [],
      isModalVisible: false,
      currentUserID: '',
    };
    this.storage=firebase.storage().ref();
    this.dataBase=firebase.database();
  }
  componentDidMount() {
    const { userID,name } = this.props.user.userDetails;
    this.dataBase.ref('Users/' + userID).once('value').then((snapshot) => {
        let user = snapshot.val();
        let newAllUserDogs=user.dogsList?user.dogsList:[];
        this.setState({allUserDogs:newAllUserDogs, isLoaded:true});
        if(user.dogsList){
          user.dogsList.forEach((v,index)=>{
            this.storage.child("images/"+name+"/"+user.dogsList[index].dogName+"Profile")
            .getDownloadURL().then((url)=>{
              let prevDogsList=[...this.state.allUserDogs];
              prevDogsList[index].dogImg=url;
              this.setState({allUserDogs:prevDogsList});
            }).catch((error)=>{console.log(error)})
          })
        }
      });
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
      { type: 'pic', field: 'dogImg', labelVisibale: false, title: 'upload picture' },
    ];
    return <Form fields={fields} callBack={this.formCallBack} closeForm ={()=>{this.setState({isModalVisible: false})}}></Form>;
  };

  formCallBack = (fieldsToValue) => {
    const { userID,name } = this.props.user.userDetails;
    let newDogImage = fieldsToValue.dogImg;
    if(fieldsToValue.dogImg){
      uploadImage(fieldsToValue.dogImg.uri,name+"/"+fieldsToValue.dogName+"Profile");
    }
    const newDog = {
      dogName: fieldsToValue.dogName,
    };
    let newAllUserDogs = this.state.allUserDogs;
    newAllUserDogs=newAllUserDogs.filter(v=>v!=undefined);
    newAllUserDogs.push({...newDog, dogImg:newDogImage});
    this.dataBase.ref('Users/' + userID).once('value').then((snapshot) => {
        let user = snapshot.val();
        let newDogArray=user.dogsList?[...user.dogsList]:[];
        newDogArray.push(newDog);
        firebase
          .database()
          .ref('Users/' + this.props.user.userDetails.userID + '/dogsList').set(newDogArray);
      })
    
    const lastModalState = this.state.isModalVisible;
    this.setState({
      isModalVisible: !lastModalState,
      allUserDogs: newAllUserDogs,
    });
  };

  callBackForDogChoosing=(dog)=>{
    this.props.setDog(dog)
  }

  onAddClick = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    console.log(this.state.allUserDogs);
    return (
      <View style={styles.container}>
        <Header {...this.props} />
        {this.state.isLoaded ? (
          <View style={styles.dogs}>
            {this.state.allUserDogs.length > 0 ? (
              this.state.allUserDogs.map((dog) =>{ 
                console.log("hereee")
                console.log(dog.dogImg);
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
