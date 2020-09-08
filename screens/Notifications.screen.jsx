import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../generalComponents/Header/Header';
import { headerHeight } from '../common/constants';
import MessageComponent from './MessageComponent';
import { API_INSTANCE } from './../api/api';

class Notifications extends React.Component {
  constructor(props){
    super(props);
    this.state={
      messages: []
    }
    this.buildMessagesComponents = this.buildMessagesComponents.bind(this);
  }

  buildMessagesComponents(){
    return this.state.messages.map(element => {
      console.log(element);
      return <MessageComponent messageBody = {element.body} title={element.title}
               date={element.date} isAlreadyBeenRead={element.isAlreadyBeenRead} 
               messageId = {element._id}
               userToken = {this.props.user.userDetails.token}
               />
    });
  }

  async componentDidMount(){
    const { token } = this.props.user.userDetails;
    const data = await API_INSTANCE.getAllMessages(token);
    console.log(data);
    const messages = [...data.data];
    console.log(messages);
    this.setState({ messages: messages });
  }

  render() {
    return (
      <View style={style.container}>
        <Header {...this.props} />
        <View style={style.content}>
          {this.buildMessagesComponents()}
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
  content:{
      top: headerHeight
  }
});
