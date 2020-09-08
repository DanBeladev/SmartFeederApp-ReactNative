import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Button } from 'react-native';
import Header from '../generalComponents/Header/Header';
import { headerHeight } from '../common/constants';
import MessageComponent from './MessageComponent';
import { API_INSTANCE } from './../api/api';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chosenIndex: 0,
    };
    this.buildMessagesComponents = this.buildMessagesComponents.bind(this);
  }

  buildMessagesComponents() {
    return this.state.messages.map((element) => {
      return (
        <MessageComponent
          key={element._id}
          messageBody={element.body}
          title={element.title}
          date={element.date}
          isAlreadyBeenRead={element.isAlreadyBeenRead}
          messageId={element._id}
          userToken={this.props.user.userDetails.token}
          dogImage = {element.dogImage}
          dogName = {element.dogName}
        />
      );
    });
  }

  async componentDidMount() {
    const { token } = this.props.user.userDetails;
    const data = await API_INSTANCE.getAllMessages(
      token,
      this.state.chosenIndex
    );
    const messages = [...data.data];
    this.setState({ messages: messages });
  }

  prevClicked = async () => {
    const { token } = this.props.user.userDetails;
    const res = await API_INSTANCE.getAllMessages(token, this.state.chosenIndex-1);
    console.log('prev res: ',res.data);
    this.setState({messages: [...res.data], chosenIndex: this.state.chosenIndex-1})
  };

  nextClicked = async () => {
    const { token } = this.props.user.userDetails;
    const res = await API_INSTANCE.getAllMessages(token, this.state.chosenIndex+1);
    console.log('next res: ',res.data);
    this.setState({messages: [...res.data], chosenIndex: this.state.chosenIndex+1})
  };

  render() {
    return (
      <View style={style.container}>
        <Header {...this.props} />
        <View style={style.content}>{this.buildMessagesComponents()}</View>
        <View style={style.prevNext}>
          <Button
            title='Prev'
            onPress={() => this.prevClicked()}
            disabled={this.state.chosenIndex == 0}
          />
          <Button title='Next' onPress={() => this.nextClicked()} disabled={this.state.messages.length < 10} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Notifications);

const style = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
  },
  content: {
    top: headerHeight,
    flex:1
  },
  prevNext: {
    flexDirection:'row',
    justifyContent:'space-between',
    bottom: 10,
    margin: 10,
  },
});
