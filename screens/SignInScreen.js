import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as constants from '../common/constants';
import { API_INSTANCE } from '../api/api';
import { connect } from 'react-redux';
import { signInUser } from '../actions/usersActions';

class SignInScreen extends Component {
  state = {
    email: 'shmueli@gmail.com',
    password: '12345',
    phone: '052555555',
    fullName: 'shaul',
    errorMessage: null,
  };

  onEmailChangeHandler = (selectedEmail) => {
    this.setState({ email: selectedEmail });
  };

  onPhoneChangeHandler = (selectedNumber) => {
    this.setState({ phone: selectedNumber });
  };

  onFullNameChangeHandler = (selectedName) => {
    this.setState({ fullName: selectedName });
  };
  onPasswordChangedHandler = (selectedPassword) => {
    this.setState({ password: selectedPassword });
  };

  inputValidator = () => {
    const isValid =
      this.state.fullName &&
      this.state.phone &&
      this.state.email &&
      this.state.password
        ? true
        : false;
    return isValid;
  };

  onSignInPressed = async () => {
    const validInput = this.inputValidator();
    if (validInput) {
      const user = {
        username: this.state.fullName,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
      };
      const data = await API_INSTANCE.signup(user);
      if (data.error) {
        this.setState({ errorMessage: data.error });
      } else {
        const data = await API_INSTANCE.login(
          user.email,
          user.password
        );
        if (data.error) {
          this.setState({ errorMessage: data.error });
        } else {
          this.props.setUser(data.data);
        }
      }
    } else {
      this.setState({ errorMessage: 'Please insert details' });
    }
  };

  backPressed = () => {
    this.props.navigation.goBack();
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
          <TextInput
            placeholder='Full Name'
            style={styles.emailInput}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text) => this.onFullNameChangeHandler(text)}
            value={this.state.fullName}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Phone'
            style={styles.emailInput}
            keyboardType='phone-pad'
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text) => this.onPhoneChangeHandler(text)}
            value={this.state.phone}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder='Email'
            keyboardType='email-address'
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text) => this.onEmailChangeHandler(text)}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Password'
            style={styles.emailInput}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text) => this.onPasswordChangedHandler(text)}
            value={this.state.password}
          />
        </View>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

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
  backContainer: {
    alignContent: 'flex-start',
  },
  backBtn: {
    color: 'blue',
    width: 60,
    backgroundColor: 'white',
    borderRadius: 50,
    textAlign: 'center',
    fontSize: 15,
    padding: 5,
    borderWidth: 2,
  },
  inputContainer: {
    flex: 1,
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
    // flex:1,
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
});
