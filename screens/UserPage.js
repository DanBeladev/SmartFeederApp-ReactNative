import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onEmailChangeHandler = selectedEmail => {
    this.setState({ email: selectedEmail });
  };

  onPasswordChangedHandler = selectedPassword => {
    this.setState({ password: selectedPassword });
  };

  onRegisterHandler = () => {
    console.log("registerd");
    this.setState({ registeredPressed: true });
  };

  render() {
    return (
      <View>
        <Text>{this.props.user.fullName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
