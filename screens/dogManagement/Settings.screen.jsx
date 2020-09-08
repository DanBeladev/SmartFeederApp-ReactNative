import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import { headerHeight, backgroundColor } from '../../common/constants';
import { connect } from 'react-redux';
import { API_INSTANCE, API_BASE_URL } from '../../api/api';
import { setOutDog } from '../../actions/dogsActions';
import { Alert } from 'react-native';
import Form from '../../generalComponents/Templates/Form/Form'
import {getDateWithoutSpaces} from '../../generalComponents/Utils'
import {getAllDogFormFields} from '../AllUserDog/dogFormFields'

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  getOnlyChangedFields = (fieldsToValue) =>{
    const dog = this.props.dog;
    return Object.keys(fieldsToValue).filter(v=>dog[v]!==fieldsToValue[v]);
  }

  onSaveClicked = async (fieldsToValue) => {
    const { _id, name } = this.props.dog;
    const { token } = this.props.user;
    const changedFields = this.getOnlyChangedFields(fieldsToValue);
    let data = new FormData();
    changedFields.forEach(v=>{
      if(v!=="dogImg"){
        if(v=="birthDate"){
          fieldsToValue[v]=getDateWithoutSpaces(fieldsToValue[v]);
        }
        data.append(v, fieldsToValue[v]);
      }
      else{
        if(fieldsToValue.dogImg.uri){
          const array = fieldsToValue.dogImg.uri.split('/');
          const name = array[array.length - 1];
          var photo = {
            uri: fieldsToValue.dogImg.uri,
            type: 'image/jpeg',
            name: name,
          };
          data.append('image', photo);
        }
      }  
    })
    const res = await API_INSTANCE.updateDog(_id, token, data)
    if (res.status === 200) {
      Alert.alert(`${name} was updated successfuly`);
      this.props.navigation.navigate('Home');
      await this.props.route.params.fetchDogs();
    } else {
      console.log('error with updating dog with id: ', _id);
    }
  };


  onDeleteClicked = async () => {
    const { _id, name } = this.props.dog;
    const { token } = this.props.user;
    const res = await API_INSTANCE.deleteDog(_id, token);
    if (res.status === 204) {
      Alert.alert(`${name} was deleted successfuly`);
      this.props.navigation.navigate('Home');
      await this.props.route.params.fetchDogs();
    } else {
      console.log('error with deleting dog with id: ', _id);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <DogHeader {...this.props} />
        <ScrollView style={styles.formContainer}>
          <Form
            fields={getAllDogFormFields(this.props.dog)}
            callBack={this.onSaveClicked}
            closeForm={() => {
              this.setState({ isModalVisible: false });
            }}/>
          </ScrollView>
          <Button style={styles.delete} onPress={this.onDeleteClicked} title={"Delete"} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userDetails,
    dog: state.dog.currentDog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNoDog: (dog) => {
      dispatch(setOutDog(dog));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
  },
  content: {
    top: headerHeight,
  },
  formContainer: {
    flex: 2,
    marginTop: 100,
    position:"absolute",
    height:"100%",
    backgroundColor: '#F5FCFF',
    backgroundColor: backgroundColor,
  },
  delete:{
    position:"relative"
    
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingTop: 15,
  },
  textInput: {
    margin: 10,
    borderColor: 'green',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconsContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    alignSelf: 'center',
    margin: 10,
  },
  gender: { alignSelf: 'center', margin: 10 },
});
