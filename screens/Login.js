import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../actions/usersActions';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import * as constants from '../common/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_URL, API_INSTANCE } from '../api/api';

class Login extends Component {
  state = {
    email: 'shmueli@gmail.com', // only for tests
    password: '12345', // only for tests
    errorMessage: null,
    isLoggedIn: false,
  };

  onEmailChangeHandler = (selectedEmail) => {
    this.setState({ email: selectedEmail });
  };

  onPasswordChangedHandler = (selectedPassword) => {
    this.setState({ password: selectedPassword });
  };

  onRegisterHandler = () => {
    this.props.navigation.navigate('SignIn');
  };

  onLoginPressed = async () => {
    this.setState({ isLoggedIn: true });
    const data = await API_INSTANCE.login(
      this.state.email,
      this.state.password
    );
    if (data.error) {
      this.setState({ errorMessage: data.error, isLoggedIn: false });
    } else {
      this.props.setUser(data.data);
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.screen}>
          <Image
            style={styles.img}
            source={require('../assets/hand.png')}
          ></Image>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.emailInput}
              keyboardType='email-address'
              blurOnSubmit
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Email'
              onChangeText={(text) => this.onEmailChangeHandler(text)}
              value={this.state.email}
              onSubmitEditing={() => this.password.focus()}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.emailInput}
              blurOnSubmit
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={(text) => this.onPasswordChangedHandler(text)}
              value={this.state.password}
              ref={(input) => (this.password = input)}
            />
          </View>
          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>
          <View style={styles.loginContainer}>
            {this.state.isLoggedIn ? (
              <ActivityIndicator size='large' />
            ) : (
              <TouchableOpacity>
                <Text style={styles.loginBtn} onPress={this.onLoginPressed}>
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableWithoutFeedback onPress={this.onRegisterHandler}>
            <Text style={styles.register}>
              Not have an acoount? press here to{' '}
              <Text style={{ color: 'white', fontSize: 20 }}>register</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(signInUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#71C8B3',
  },
  img: {
    borderRadius: 100,
    height: 200,
    width: 200,
    marginVertical: 50,
  },
  emailInput: {
    textAlign: 'center',
    height: 50,
    width: 300,
    maxWidth: '70%',
    borderBottomColor: 'grey',
    borderBottomWidth: 3,
    borderWidth: 3,
    borderRadius: 50,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  errorMessage: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: constants.errorColor,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    width: 100,
    fontSize: 22,
    marginEnd: 10,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#0F0F0F',
    marginTop: 50,
  },
  loginBtn: {
    fontSize: 22,
    color: 'white',
  },
  register: {
    marginVertical: 10,
    fontSize: 15,
    color: 'blue',
  },
});
