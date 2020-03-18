import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default class UserPage extends Component {
  state = {
    email: "",
    password: ""
  };
//comment by dekel
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
        <Text>email: {this.props.user.email}</Text>
        <Text>password: {this.props.user.password}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
