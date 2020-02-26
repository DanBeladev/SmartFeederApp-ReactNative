import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";

export default class SignInScreen extends Component {
  state = {
    email: "",
    password: "",
    phone:"",
    fullName:"",
  };

  onEmailChangeHandler = selectedEmail => {
    this.setState({ email: selectedEmail });
  };

  onPhoneChangeHandler = selectedNumber => {
    this.setState({ phone: selectedNumber });
  };

  onFullNameChangeHandler = selectedName => {
    this.setState({ fullName: selectedName });
  };
  onPasswordChangedHandler = selectedPassword => {
    this.setState({ password: selectedPassword });
  };

  onSignInPressed = () => {
      Alert.alert(this.state.fullName + " " + this.state.phone + " "+ this.state.email + " "+ this.state.password + " ")
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Full Name</Text>
          <TextInput
            style={styles.emailInput}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.onFullNameChangeHandler(text)}
            value={this.state.fullName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Phone</Text>
          <TextInput
            style={styles.emailInput}
            keyboardType="phone-pad"
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.onPhoneChangeHandler(text)}
            value={this.state.phone}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.emailInput}
            keyboardType="email-address"
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.onEmailChangeHandler(text)}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.emailInput}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.onPasswordChangedHandler(text)}
            value={this.state.password}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.loginBtn} onPress={this.onSignInPressed}>
            Sign In
          </Text>
        </View>
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
  },
  img: {
    borderRadius: 100,
    height: 200,
    width: 200,
    marginVertical: 50
  },
  emailInput: {
    textAlign: "center",
    height: 50,
    width: 300,
    maxWidth: "70%",
    borderBottomColor: "grey",
    borderBottomWidth: 3,
    borderWidth: 3,
    borderRadius: 50,
    marginVertical: 10,
    backgroundColor: "white"
  },
  inputContainer: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10
  },
  text: {
    width: 100,
    fontSize: 22,
    marginEnd: 10
  },
  loginContainer: {
    // flex:1,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#0F0F0F",
    marginTop: 50
  },
  loginBtn: {
    fontSize: 22,
    color: "white"
  }
});
