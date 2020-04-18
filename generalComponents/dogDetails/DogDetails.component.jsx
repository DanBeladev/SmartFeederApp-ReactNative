import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { headerHeight } from '../../common/constants';

export default class DogDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hisunim: [
        {
          name: 'Kalevet',
          date: `${new Date().getDay()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getFullYear()}`,
        },
        {
          name: 'Tzahevet',
          date: `${new Date().getDay()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getFullYear()}`,
        },
      ],
      isVisible: true,
      hisunType: '',
      date: '',
    };
  }

  onAddClick = () => this.setState({ isVisible: true });
  hideModal = () => this.setState({ isVisible: false });
  buildForm = () => {
    return (
      <View>
        <Text>sHALP</Text>
        <Text>MODLA</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={{ top: 80 }}>
        <Text>Dog Details</Text>
        <Text>Screen</Text>
      </View>
    );
  }
}

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
