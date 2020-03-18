import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
import UserPage from './UserPage'
<<<<<<< HEAD
import { TouchableOpacity } from "react-native-gesture-handler";

=======
// nave comment
>>>>>>> 4ca4b38dff31a81ea4e3442faf494f630ede45a8
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    isLoggedIn:false,
  };

  onEmailChangeHandler = selectedEmail => {
    this.setState({ email: selectedEmail });
  };

  onPasswordChangedHandler = selectedPassword => {
    this.setState({ password: selectedPassword });
  };

  onRegisterHandler = () => {
      this.setState({registeredPressed:true})
  };

  onLoginPressed = () => {
    this.setState({isLoggedIn:true});
  }

  renderPage = () => {
    console.log('render page')
    if(this.state.isLoggedIn)
    {
      console.log('is logged in')
      const user = 
      {
          email:this.state.email,
          password:this.state.password
      } 
       return(<UserPage userDetails={user} />);
    }
    else{
      console.log('not logged in')
      return( <View style={styles.screen}>
        <Image
          style={styles.img}
          source={require("../assets/hand.png")}
        ></Image>
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
          <Text style={styles.loginBtn} onPress={this.onLoginPressed}>
            Login
          </Text>
        </View>
        <TouchableOpacity onPress={this.props.onRegisterPress}>
          <Text style={styles.register}>
            Not have an acoount? press here to register
          </Text>
        </TouchableOpacity> 
      </View>)
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <Image
          style={styles.img}
          source={require("../assets/hand.png")}
        ></Image>
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
          <Text style={styles.loginBtn} onPress={this.onLoginPressed}>
            Login
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onRegisterPress}>
          <Text style={styles.register}>
            Not have an acoount? press here to register
          </Text>
        </TouchableWithoutFeedback> 
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
  },
  register: {
    marginVertical: 10,
    fontSize: 15,
    color: "blue"
  }
});
