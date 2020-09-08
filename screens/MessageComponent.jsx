import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';
import Header from '../generalComponents/Header/Header';
import { headerHeight } from '../common/constants';
import { API_INSTANCE } from '../api/api';


class MessageComponent extends React.Component {
    constructor(props){
        super(props);
        const isReaden = this.props.isAlreadyBeenRead;
        this.state={
            isReaden: isReaden,
            showMessage: false,
            isModalVisible: false,
        }  
        this.HandlePress = this.HandlePress.bind(this); 
        this.buildMessagePrompt = this.buildMessagePrompt.bind(this); 
    }

    async HandlePress(){
        console.log('is unread? ',this.state.isReaden);
        if(this.state.isReaden===false){
            console.log("messageId ", this.props.messageId);
            const res = await API_INSTANCE.markMessageAsRead(this.props.userToken, this.props.messageId);
            console.log("res: ",res);
        }
        this.setState({ isModalVisible: true, isReaden:true });
    }

    buildMessagePrompt(){
        return(
            <View style={style.messageContainer}>
                <View style={style.container}>
                    <Text style={style.title}>{this.props.title}</Text>
                    <Text style={style.date}>{this.props.date}</Text>
                </View>
                <Text>{this.props.messageBody}</Text>
            </View>
        )
    }
    
    render(){
        const additionalStyle = this.state.isReaden? {} : style.unreadMessageStyle;
        return(
            <View style={style.container}>
                <Text style={{...style.title, ...additionalStyle}} onPress={this.HandlePress}>{this.props.title}</Text>
                <Text style={style.date}>{this.props.date}</Text>
                <Modal onBackdropPress={() => {this.setState({ isModalVisible: false });}} 
                    isVisible={this.state.isModalVisible}>
                    {this.buildMessagePrompt()}
                </Modal>
            </View>
        )
    }
}



export default MessageComponent;

const style = StyleSheet.create({
  container: {
    flexDirection:"row"
  },
  title:{
      color: "blue",
      flex:2,
      textDecorationLine: 'underline',
      
  },
  unreadMessageStyle:{
    fontWeight: 'bold',
  },
  date:{
    color: "gray",
    fontWeight: 'bold',
    flex:1
  },
  messageContainer: {
    backgroundColor:"white",
    height:500
  },
});
