import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import DogComponent from './DogComponent';
import * as firebase from 'firebase';
import dogAvatar from '../../assets/noDogImg.jpg';
import ActionButton from 'react-native-action-button';
import Form from '../../generalComponents/Templates/Form/Form';
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
  }
  componentDidMount() {
    const { userID } = this.props.user.userDetails;
    console.log('userID:', userID);
    firebase
      .database()
      .ref('Users/' + userID)
      .once('value')
      .then((snapshot) => {
        let user = snapshot.val();
        console.log('user? ', user);
        this.setState({ allUserDogs: user.dogsList, isLoaded: true });
      });
  }
  buildForm = () => {
    let fields = [
      {
        type: 'text',
        field: 'dogName',
        title: 'dog name',
        labelVisibale: true,
      },
      {
        type: 'radio',
        field: 'gender',
        title: 'gender',
        labelVisibale: true,
        radioProps: [
          { label: 'male     ', value: 0 },
          { label: 'female', value: 1 },
        ],
      },
      {
        type: 'combo',
        field: 'age',
        title: 'age',
        labelVisibale: true,
        data: [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
        ],
      },
      { type: 'pic', field: 'dogImg', labelVisibale: false, title: 'add pic' },
    ];
    return <Form fields={fields} callBack={this.formCallBack}></Form>;
  };

  formCallBack = (fieldsToValue) => {
    let newDogImage = fieldsToValue.dogImg ? fieldsToValue.dogImg : dogAvatar;
    const newDog = {
      dogImg: newDogImage,
      dogName: fieldsToValue.dogName,
    };
    let newAllUserDogs = [...this.state.allUserDogs];
    newAllUserDogs.push(newDog);
    firebase
      .database()
      .ref('Users/' + this.props.user.userDetails.userID + '/dogsList')
      .set(newAllUserDogs);
    const lastModalState = this.state.isModalVisible;
    this.setState({
      isModalVisible: !lastModalState,
      allUserDogs: newAllUserDogs,
    });
  };

  onAddClick = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header {...this.props} />
        {this.state.isLoaded ? (
          <View style={styles.dogs}>
            {this.state.allUserDogs.length > 0 ? (
              this.state.allUserDogs.map((dog) => (
                <DogComponent key={dog.dogName} dog={dog} {...this.props} />
              ))
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

export default connect(mapStateToProps)(DogsScreen);

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
