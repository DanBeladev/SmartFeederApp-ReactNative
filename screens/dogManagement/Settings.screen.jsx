import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import { headerHeight, backgroundColor } from '../../common/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  getDate,
  openGallery,
  getDateWithoutSpaces,
} from '../../generalComponents/Utils';
import RadioForm from 'react-native-simple-radio-button';
import { API_INSTANCE, API_BASE_URL } from '../../api/api';
import { setOutDog } from '../../actions/dogsActions';
import { Alert } from 'react-native';
import DogBreedSelector from '../../generalComponents/DogBreedSelector';
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toShowDatePicker: false,
      name: this.props.dog.name,
      date: this.props.dog.birthDate,
      gender: this.props.dog.gender,
      image: this.props.dog.image,
      breed: 'American Eskimo Dog (Miniature)',
      mealAmount: 30,
    };

    this.radioProps = [
      { label: 'Male', value: 0 },
      { label: 'Female', value: 1 },
    ];
  }
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

  dogChanged = (value) => {
    console.log('in settings: ', value);
    this.setState({ breed: value });
  };

  onCancelClicked = () => {
    console.log('state: ', this.state.image);
    console.log('props: ', this.props.dog.image);
    console.log('props gender', this.props.dog.gender);
    this.setState({
      name: this.props.dog.name,
      date: this.props.dog.birthDate,
      breed: this.props.breed,
      gender: this.props.dog.gender,
      image: this.props.dog.image,
      mealAmount: 30,
    });
  };

  getOnlyChangedFields = () => {
    const res = [];
    this.state.name !== this.props.dog.name
      ? res.push({ name: this.state.name })
      : null;
    this.state.gender !== this.props.dog.gender
      ? res.push({ gender: this.state.gender })
      : null;
    this.state.date !== this.props.dog.birthDate
      ? res.push({ birthDate: getDateWithoutSpaces(this.state.date) })
      : null;
    this.state.image !== this.props.dog.image
      ? res.push({ image: this.state.image })
      : null;
      // this.state.mealAmount !== this.props.dog.mealAmount
      // ? res.push({ mealAmount: this.state.mealAmount })
      // : null;
      // this.state.breed !== this.props.dog.breed
      // ? res.push({ breed: this.state.breed })
      // : null;
      return res;
  };

  onSaveClicked = async () => {
    const { _id, name } = this.props.dog;
    const { token } = this.props.user;
    const changedFields = this.getOnlyChangedFields();
    const res = await API_INSTANCE.updateDog(_id, token, {changes: changedFields});
    if (res.status === 200) {
      Alert.alert(`${name} was updated`);
      this.props.navigation.navigate('DogManagment');
      await this.props.route.params.fetchDogs();
    } else {
      console.log('error with updating dog with id: ', _id);
    }
  };

  chooseImage = async () => {
    const res = openGallery((data) => {
      this.setState({ image: data });
    });
  };

  onDeleteClicked = async () => {
    const { _id, name } = this.props.dog;
    const { token } = this.props.user;
    const res = await API_INSTANCE.deleteDog(_id, token);
    if (res.status === 204) {
      Alert.alert(`${name} was deleted successfuly`);
      this.props.navigation.jumpTo('Home');
      await this.props.route.params.fetchDogs();
    } else {
      console.log('error with deleting dog with id: ', _id);
    }
  };

  render() {
    const date = getDate(this.state.date);
    const mealAmount = `${this.state.mealAmount}`;
    const gender =
      this.state.gender === 'Male' || this.state.gender === '0' ? 0 : 1;
    return (
      <View style={styles.container}>
        <DogHeader {...this.props} />
        <View style={styles.formContainer}>
          <View>
            {/* <Text style={styles.header}>Settings</Text> */}
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
                <DogBreedSelector
                  breed={this.state.breed}
                  handleChanged={this.dogChanged}
                />
                <View style={styles.gender}>
                  <RadioForm
                    radio_props={this.radioProps}
                    initial={gender}
                    formHorizontal={true}
                    labelHorizontal={false}
                    buttonColor={'#2196f3'}
                    animation={true}
                    key={gender}
                    onPress={(value) => {
                      console.log(value);
                      this.setState({ gender: value });
                    }}
                  />
                </View>
                <TouchableOpacity onPress={this.chooseImage}>
                  {this.state.image === this.props.dog.image ? (
                    <Avatar.Image
                      size={200}
                      style={styles.image}
                      source={{ uri: `${API_BASE_URL}${this.state.image}` }}
                    />
                  ) : (
                    <Avatar.Image
                      size={200}
                      style={styles.image}
                      source={this.state.image}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={this.onSaveClicked}>
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
    marginTop: 50,
    justifyContent: 'space-between',
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
    backgroundColor: backgroundColor,
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
