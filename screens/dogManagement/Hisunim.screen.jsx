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

class HisunimScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hisunim: [],
      // hisunim: [
      //   {
      //     name: 'Kalevet',
      //     date: `${new Date().getDay()} - ${
      //       new Date().getMonth() + 1
      //     } - ${new Date().getFullYear()}`,
      //   },
      //   {
      //     name: 'Tzahevet',
      //     date: `${new Date().getDay()} - ${
      //       new Date().getMonth() + 1
      //     } - ${new Date().getFullYear()}`,
      //   },
      // ],
      isVisible: false,
      hisunType: '',
      date: '',
    };
  }

  componentDidMount = async() => {
    const { token } = this.props.user.userDetails;
    const dogId = this.props.dog.dogId || '5f097e367859393594c93369';
    const res = await API_INSTANCE.getHisunim(dogId, token);
    const hisunimFromApi = [...res.data];
    this.setState({hisunim: hisunimFromApi});
  } 

  onAddClick = () => this.setState({ isVisible: true });
  hideModal = () => this.setState({ isVisible: false });
  createHisun = async () => {
      const { token } = this.props.user.userDetails;
      const dogId = this.props.dog.dogId || '5f097e367859393594c93369';
      if (this.state.hisunType && this.state.date) {
        const hisun = {
          name: this.state.hisunType,
          date: this.state.date,
        };
        const res = await API_INSTANCE.addHisun(hisun, dogId, token);
        console.log('res: ', res);
        console.log('hisunim after adding: ', res.data)
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
  }

  getDate = (date) => {
    const t_date = new Date(date);
    const year = t_date.getFullYear();
    const month = t_date.getMonth()+1;
    const day = t_date.getDate();
    const res = `${year} - ${month} - ${day}`;
    return res;
  }

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
                    <DataTable.Cell>{this.getDate(hisun.date)} </DataTable.Cell>
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
              <Input
                placeholder='Date'
                value={this.state.date}
                onChangeText={(e) => this.setState({ date: e })}
              ></Input>
              <Button
                title='Add Hisun'
                onPress= {this.createHisun}
              ></Button>
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
    dog: state.dog
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
