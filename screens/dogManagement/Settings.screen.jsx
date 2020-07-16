import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import { headerHeight } from '../../common/constants';
import Form from '../../generalComponents/Templates/Form/Form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getDate } from '../../generalComponents/Utils';
import RadioForm from 'react-native-simple-radio-button';
import { API_INSTANCE } from '../../api/api';
import { setOutDog } from '../../actions/dogsActions';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toShowDatePicker: false,
      name: props.dog.name,
      date: props.dog.birthDate,
      gender: props.dog.gender,
      breed: 'Jack Rassel',
      mealAmount: 30,
      // gender: 0,
    };

    this.radioProps = [
      { label: 'Male', value: 0 },
      { label: 'Female', value: 1 },
    ];
  }

  formCallBack = () => {
    console.log('callback');
  };
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
  showDatePicker = () => {
    this.setState({ toShowDatePicker: true });
  };
  dateChanged = (event, selectedDate) => {
    if (selectedDate) {
      this.setState({ date: selectedDate, toShowDatePicker: false });
    } else {
      this.setState({ toShowDatePicker: false });
    }
  };

  onCancelClicked = () => {
    this.setState({
      name: this.props.dog.name,
      date: this.props.dog.birthDate,
      breed: 'Jack Rassel',
      mealAmount: 30,
      gender: 0,
    });
  };

  onSaveClicked = () => {};

  onDeleteClicked = async () => {
    const { _id } = this.props.dog;
    const { token } = this.props.user;
    const res = await API_INSTANCE.deleteDog(_id, token);
    if (res.status === 204) {
    console.log('dog deleted: ');
    console.log('params: ',this.props.route.parmas);
    this.props.navigation.jumpTo('Home');
    await this.props.route.params.fetchDogs();
    }else{
      console.log('error with deleting dog with id: ',_id);
    }
  };

  render() {
    const date = getDate(this.state.date);
    const mealAmount = `${this.state.mealAmount}`;
    return (
      <View style={styles.container}>
        <DogHeader {...this.props} />
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.header}>Settings</Text>
            <ScrollView>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder='Dog Name'
                  maxLength={20}
                  value={this.state.name}
                  onChangeText={(value) => {
                    this.setState({ name: value });
                  }}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder='Breed'
                  maxLength={20}
                  value={this.state.breed}
                  onChangeText={(value) => {
                    this.setState({ breed: value });
                  }}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder='Meal Amount'
                  maxLength={20}
                  value={mealAmount}
                  onChangeText={(value) => {
                    this.setState({ mealAmount: value });
                  }}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder='Birth Date'
                  maxLength={20}
                  onFocus={this.showDatePicker}
                  value={date}
                />
                {this.state.toShowDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    display='spinner'
                    onChange={this.dateChanged}
                  />
                )}
                <RadioForm
                  radio_props={this.radioProps}
                  initial={this.state.gender}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  animation={true}
                  key={this.state.gender}
                  onPress={(value) => {
                    console.log(value);
                    this.setState({ gender: value });
                  }}
                />
              </View>
            </ScrollView>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => console.log('ok')}>
                <MaterialCommunityIcons name='check' color='green' size={50} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onDeleteClicked}>
                <MaterialCommunityIcons name='delete' color='red' size={50} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onCancelClicked}>
                <MaterialCommunityIcons name='cancel' color='grey' size={50} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    backgroundColor: 'red',
    flex: 1,
  },
  content: {
    top: headerHeight,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
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
    borderColor: '#CCCCCC',
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
});
