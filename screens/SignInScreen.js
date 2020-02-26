import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Button
} from "react-native";

export default class SignInScreen extends Component {
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


  render() {
    return (
      <View style={styles.screen}>
        <Text>sign up</Text>
        <Text onPress={this.props.goBack}>Go back</Text> 
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    marginTop: 10,
    alignItems: "center",
    flex: 1,
    backgroundColor: "#71C8B3"
  }
});
