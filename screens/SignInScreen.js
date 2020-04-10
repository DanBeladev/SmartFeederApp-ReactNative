import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import * as constants from '../common/constants'
export default class SignInScreen extends Component {
  state = {
    email: "",
    password: "",
    phone: "",
    fullName: "",
    errorMessage: null
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

  inputValidator = () =>{
    const isValid = (this.state.fullName && this.state.phone && this.state.email && this.state.password) ? true: false;
     return isValid;
  }

  onSignInPressed = () => {
    const validInput = this.inputValidator();
    if(validInput){
      firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
      .then(() => {
        Alert.alert('addded succesfully');
        Actions.home();
      })
      .catch((err) => this.setState({errorMessage: err.message}));
    }
    else
    {
      this.setState({errorMessage: 'Please insert details'})
    }
  };

  backPressed = () => {
    Actions.pop();
  };

  render() {
    return (
      <View style={styles.screen}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={this.backPressed}
        >
          <Text style={styles.backBtn}>back</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.text}>Full Name</Text> */}
          <TextInput
            placeholder ="Full Name"
            style={styles.emailInput}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.onFullNameChangeHandler(text)}
            value={this.state.fullName}
          />
        </View>

        <View style={styles.inputContainer}>
          {/* <Text style={styles.text}>Phone</Text> */}
          <TextInput
            placeholder ="Phone"
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
          {/* <Text style={styles.text}>Email</Text> */}
          <TextInput
            style={styles.emailInput}
            placeholder ="Email"
            keyboardType="email-address"
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.onEmailChangeHandler(text)}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.text}>Password</Text> */}
          <TextInput
            placeholder ="Password"
            style={styles.emailInput}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.onPasswordChangedHandler(text)}
            value={this.state.password}
          />
        </View>
        <View style = {styles.errorMessage}>
        {this.state.errorMessage && <Text style = {styles.error}>{this.state.errorMessage}</Text>}
        </View>  
        <View style={styles.loginContainer}>
          <Text style={styles.loginBtn} onPress={this.onSignInPressed}>
            Sign Up
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
  errorMessage: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    color: constants.errorColor,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
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
  backContainer: {
    alignContent: "flex-start"
  },
  backBtn: {
    color: "blue",
    width: 60,
    backgroundColor: "white",
    borderRadius: 50,
    textAlign: "center",
    fontSize: 15,
    padding: 5,
    borderWidth: 2
  },
  inputContainer: {
    flex: 1,
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
