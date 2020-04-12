import React , { Component } from 'react';
import { Router , Stack, Scene, Drawer } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import Login from './screens/Login';
import SignInScreen from './screens/SignInScreen';
import DogsScreen from './screens/AllUserDog/DogsScreen';
import DogManagment from './screens/dogManagement/DogManagment.screen';
import SideMenu from './generalComponents/sideBar/sideBarMenu.component';
import Header from './generalComponents/Header/Header';
import { backgroundColor } from './common/constants';
import DogSideMenu from './generalComponents/sideBar/sideBarDogMenu.component';
import Settings from './screens/dogManagement/Settings.screen';
import Statistics from './screens/dogManagement/Statistics.screen';


export default class Routes extends Component {

    render(){
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={Login} title="Login" />
                    <Drawer navigationBarStyle={styles.drawer} key="drawerMenu" hideNavBar contentComponent={SideMenu}>
                        <Scene key="home"  initial component={DogsScreen} title="Dogs" />
                        <Scene key="test" component={Header} title="test" />
                    </Drawer>
                    <Drawer navigationBarStyle={styles.dogDrawer} key="dogMenu" hideNavBar contentComponent={DogSideMenu} >
                        <Scene key="dogManagement"  initial component={DogManagment} />
                        <Scene key="settings" component={Settings} title="Settings" />
                        <Scene key="statistics" component={Statistics} title="Statistics" />
                    </Drawer>
                    <Scene key="register" component={SignInScreen} title="Register" />
                </Stack>
            </Router>
        )
    }
}


const styles = StyleSheet.create({
    drawer: {
               backgroundColor: backgroundColor,
    },
    dogDrawer: {
        backgroundColor:'blue',
        
    }
});