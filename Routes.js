import React , { Component } from 'react';

import { Router , Stack, Scene } from 'react-native-router-flux';
import Login from './screens/Login';
import SignInScreen from './screens/SignInScreen';
import DogsScreen from './screens/AllUserDog/DogsScreen';


export default class Routes extends Component {

    render(){
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={Login} title="Login" />
                    <Scene key="register" component={SignInScreen} title="Register" />
                    <Scene key="home" component={DogsScreen} title="Dogs" />
                </Stack>
            </Router>
        )
    }
}