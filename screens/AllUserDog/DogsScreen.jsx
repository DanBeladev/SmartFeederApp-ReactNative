import React from 'react';
import { connect } from 'react-redux';
import { setDog } from '../../actions/dogsActions';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import DogComponent from './DogComponent';
import * as firebase from 'firebase';
import ActionButton from 'react-native-action-button';
import Form from '../../generalComponents/Templates/Form/Form';
import Header from '../../generalComponents/Header/Header';
import { backgroundColor, headerHeight } from '../../common/constants';
import { API_INSTANCE } from '../../api/api';


class DogsScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('in ctor');
    this.state = {
      isLoaded: false,
      allUserDogs: [],
      isModalVisible: false,
      currentUserID: '',
    };
  }

  fetchDogs = async () => {
    const { token } = this.props.user.userDetails;
    const data = await API_INSTANCE.getDogs(token);
    const dogs = [...data.data];
    this.setState({ allUserDogs: dogs, isLoaded: true });
  };

  async componentDidMount() {
    this.fetchDogs();
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
        // valueType: 'Integer',
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
  formCallBack = async (fieldsToValue) => {
    let data = new FormData();
    data.append('name', fieldsToValue.dogName);
    data.append('gender', fieldsToValue.gender ? fieldsToValue.gender : 'male');
    data.append('birthDate', '2002-11-15');
    if (fieldsToValue.dogImg && fieldsToValue.dogImg.uri) {
      const array = fieldsToValue.dogImg.uri.split('/');
      const name = array[array.length - 1];
      var photo = {
        uri: fieldsToValue.dogImg.uri,
        type: 'image/jpeg',
        name: name,
      };
      data.append('image', photo);
    }
    const { token } = this.props.user.userDetails;
    const res = await API_INSTANCE.addDog(data, token);
    if (res.data) {
      const newDog = res.data;
      const newDogsArray = [...this.state.allUserDogs, newDog];
      this.setState({ allUserDogs: newDogsArray, isModalVisible: false });
    } else {
      this.setState({ isModalVisible: false });
    }
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
                return (
                  <DogComponent
                    key={dog._id}
                    dog={dog}
                    callBack={this.callBackForDogChoosing}
                    navigation={this.props.navigation}
                    fetchDogs = {this.fetchDogs}
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
