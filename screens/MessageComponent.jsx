import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import Header from '../generalComponents/Header/Header';
import { headerHeight } from '../common/constants';
import { API_INSTANCE, API_BASE_URL } from '../api/api';
import { getDate, getDateWithoutSpaces } from '../generalComponents/Utils';
import { LogBox } from 'react-native';

class MessageComponent extends React.Component {
  constructor(props) {
    super(props);
    const isReaden = this.props.isAlreadyBeenRead;
    this.state = {
      isReaden: isReaden,
      showMessage: false,
      isModalVisible: false,
    };
    this.HandlePress = this.HandlePress.bind(this);
    this.buildMessagePrompt = this.buildMessagePrompt.bind(this);
  }

  async HandlePress() {
    const { userToken, messageId } = this.props;
    if (this.state.isReaden === false) {
      const res = await API_INSTANCE.markMessageAsRead(userToken, messageId);
    }
    this.setState({ isModalVisible: true, isReaden: true });
  }

  buildMessagePrompt() {
    return (
      <View style={style.messageContainer}>
        <View style={style.container}>
          <Text style={style.title}>{this.props.title}</Text>
          <Text style={style.date}>{this.props.date}</Text>
        </View>
        <Text>{this.props.messageBody}</Text>
      </View>
    );
  }

  render() {
    const additionalStyle = this.state.isReaden ? {} : style.unreadMessageStyle;
    const date = new Date(this.props.date);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const datestr = `${getDateWithoutSpaces(
      this.props.date
    )}  ${hour}:${minutes}`;
    const imageUrl = `${API_BASE_URL}${this.props.dogImage}`;
    console.log(imageUrl);
    console.log(datestr);
    return (
      <View style={style.container}>
        <Text
          style={{ ...style.title, ...additionalStyle }}
          onPress={this.HandlePress}
        >
          {this.props.title}
        </Text>
        <Text style={style.date}>{datestr}</Text>
        <View>
            <Image source={{ uri: imageUrl }}></Image>
            <View>
              <Text>{this.props.dogName}</Text>
            </View>
          </View>

        <Modal
          onBackdropPress={() => {
            this.setState({ isModalVisible: false });
          }}
          isVisible={this.state.isModalVisible}
        >
          {this.buildMessagePrompt()}
        </Modal>
      </View>
    );
  }
}

export default MessageComponent;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    borderWidth: 2,
    margin: 5,
    padding: 10,
    height:70,
  },
  title: {
    color: 'blue',
    flex: 2,
    textDecorationLine: 'underline',
  },
  unreadMessageStyle: {
    fontWeight: 'bold',
  },
  date: {
    color: 'gray',
    fontWeight: 'bold',
    flex: 1,
  },
  messageContainer: {
    backgroundColor: 'white',
    height: 500,
  },
});
