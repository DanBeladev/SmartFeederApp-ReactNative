import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/Login';
import SignInScreen from './screens/SignInScreen';
import DogsScreen from './screens/AllUserDog/DogsScreen';
import Header from './generalComponents/Header/Header';
import SideMenu from './generalComponents/sideBar/sideBarMenu.component';
import { connect } from 'react-redux';

const Stack = createStackNavigator();
const UserDrawer = createDrawerNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/hand.png')}
    />
  );
}

function LoginStack() {
    return (
        <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignIn' component={SignInScreen} />
      </Stack.Navigator>
    )
}

function HomeDrawer() {
  return (
    <UserDrawer.Navigator initialRouteName='Home' drawerContent={props => <SideMenu {...props} />}> 
      <UserDrawer.Screen options={{}} name='Home' component={DogsScreen} />
      <UserDrawer.Screen name='Fucker' component={Header} />
    </UserDrawer.Navigator>
  );
}

class Navigator extends Component {
  state = {
    isSignIn: true,
  };
  render() {
    return (
      <NavigationContainer>
        {this.props.user.isSignIn ? (
          <HomeDrawer />
        ) : (
            <LoginStack />
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Navigator);
