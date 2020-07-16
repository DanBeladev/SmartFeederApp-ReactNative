import React from 'react';
import {
  Modal,
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { DataTable } from 'react-native-paper';
import { headerHeight } from '../../common/constants';
import ActionButton from 'react-native-action-button';
import { Input } from 'react-native-elements';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import { API_INSTANCE } from '../../api/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDate } from '../../generalComponents/Utils';

class HisunimScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hisunim: [],
      isVisible: false,
      hisunType: '',
      date: '',
      showDatePicker: false,
    };
  }

  componentDidMount = async () => {
    const { token } = this.props.user.userDetails;
    const {_id} = this.props.dog.currentDog;
    console.log('dog :' ,_id)
    const res = await API_INSTANCE.getHisunim(_id, token);
    const hisunimFromApi = [...res.data];
    console.log('hisunim from server: ',)
    this.setState({ hisunim: hisunimFromApi });
  };

  onAddClick = () => this.setState({ isVisible: true });
  hideModal = () => this.setState({ isVisible: false });
  createHisun = async () => {
    const { token } = this.props.user.userDetails;
    const {_id} = this.props.dog.currentDog;
    const dateToAPI = this.state.date.replace(/ /g,'');
    if (this.state.hisunType && this.state.date) {
      const hisun = {
        name: this.state.hisunType,
        date: dateToAPI,
      };
      const res = await API_INSTANCE.addHisun(hisun, _id, token);
      const newHisunim = [...res.data];
      this.setState({
        hisunim: newHisunim,
        hisunType: '',
        date: '',
        isVisible: false,
      });
    } else {
      Alert.alert('please fill all fields');
    }
  };

  showTimepicker = () => {
    this.setState({ showDatePicker: true });
  };

  dateChanged = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate);
    this.setState({ date: getDate(currentDate), showDatePicker: false });
  };

  render() {
    return (
      <React.Fragment>
        <DogHeader {...this.props} />
        <View style={styles.container}>
          <DataTable style={{ top: headerHeight - 20 }}>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {this.state.hisunim.map((hisun) => {
                return (
                  <DataTable.Row key={hisun.name}>
                    <DataTable.Cell>{hisun.name}</DataTable.Cell>
                    <DataTable.Cell>{getDate(hisun.date)} </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
          <Modal visible={this.state.isVisible}>
            <Text
              style={{ left: 10, top: 10 }}
              onPress={() => {
                this.setState({ isVisible: false });
              }}
            >
              Back
            </Text>
            <View style={styles.addContainer}>
              <Input
                style={{ maxWidth: 20 }}
                placeholder='Hisun Type'
                value={this.state.hisunType}
                onChangeText={(e) => this.setState({ hisunType: e })}
              ></Input>
              <Button onPress={this.showTimepicker} title="Choose Hisun Date"></Button>
              <Text style={{ textAlign: 'center' }}>{this.state.date}</Text>
              {this.state.showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  display='spinner'
                  onChange={this.dateChanged}
                />
              )}
              <Button title='Add Hisun' onPress={this.createHisun}></Button>
            </View>
          </Modal>
          <ActionButton
            position='center'
            size={70}
            buttonColor='green'
            onPress={this.onAddClick}
            style={{ bottom: 50 }}
          />
        </View>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    dog: state.dog,
  };
};

export default connect(mapStateToProps)(HisunimScreen);
const styles = StyleSheet.create({
  container: {
    top: headerHeight,
    backgroundColor: 'white',
    flex: 1,
    alignContent: 'center',
  },
  addContainer: {
    top: headerHeight - 20,
    // left: 10,
    maxWidth: '100%',
    // alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 50,
    // flexDirection: 'column',
    borderWidth: 2,
    // flex: 2,
    height: 300,
    marginHorizontal: 10,
  },
});
