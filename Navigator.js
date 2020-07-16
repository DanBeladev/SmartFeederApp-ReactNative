import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/Login';
import SignInScreen from './screens/SignInScreen';
import DogsScreen from './screens/AllUserDog/DogsScreen';
import Header from './generalComponents/Header/Header';
import DrawerContent from './generalComponents/sideBar/testSideBar';
import DogDrawerContent from './generalComponents/sideBar/sideBarDogMenu.component';
import { connect } from 'react-redux';
import DogManagment from './screens/dogManagement/DogManagment.screen';
import Settings from './screens/dogManagement/Settings.screen';
import Statistics from './screens/dogManagement/Statistics.screen';
import HisunimScreen from './screens/dogManagement/Hisunim.screen';

const Stack = createStackNavigator();
const UserDrawer = createDrawerNavigator();
const DogDrawer = createDrawerNavigator();

function LoginStack() {
  return (
    <Stack.Navigator initialRouteName='Login'screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignIn' component={SignInScreen} />
    </Stack.Navigator>
  );
}

function DogManagemnetDrawer(props) {
  console.log(props);
  return (
    <DogDrawer.Navigator
      initialRouteName='DogDetails'
      drawerContent={(props) => <DogDrawerContent {...props} />}
    >
      <DogDrawer.Screen name='DogDetails' component={DogManagment} />
      <DogDrawer.Screen name='Hisunim' component={HisunimScreen} />
      <DogDrawer.Screen name='Settings' component={Settings} initialParams={{fetchDogs: props.route.params.params.updateUserDogs}}  />
      <DogDrawer.Screen name='Statistics' component={Statistics} />
    </DogDrawer.Navigator>
  );
}

function HomeDrawer() {
  return (
    <UserDrawer.Navigator
      initialRouteName='Home'
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <UserDrawer.Screen name='Home' component={DogsScreen} />
      <UserDrawer.Screen name='Fucker' component={Header} />
      <UserDrawer.Screen name='DogManagement' component={DogManagemnetDrawer} />
    </UserDrawer.Navigator>
  );
}

class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        {this.props.user.isSignIn ? <HomeDrawer /> : <LoginStack />}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    dog:state.dog.currentDog
  };
};
export default connect(mapStateToProps)(Navigator);
