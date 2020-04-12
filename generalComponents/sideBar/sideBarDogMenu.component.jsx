import React from "react";
import {View,  Text,  StyleSheet, Image, TextInput, TouchableWithoutFeedback} from "react-native";
import { Icon } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import * as firebase from 'firebase';
import { TouchableOpacity } from "react-native-gesture-handler";
export default class DogSideMenu extends React.Component{
    constructor(props){
        super(props);
  this.items = [
    {
      navOptionThumb: 'camera',
      navOptionName: 'Details',
      screenToNavigate: 'dogManagement',
      fireFunction: this.details
    },
    {
      navOptionThumb: 'build',
      navOptionName: 'Statistics',
      screenToNavigate: 'statistics',
      fireFunction: this.statisticsHandler
    },
    {
        navOptionThumb: 'build',
        navOptionName: 'Settings',
        screenToNavigate: 'settings',
        fireFunction: this.statisticsHandler
      },
    {
        navOptionThumb: 'build',
        navOptionName: 'Logout',
        screenToNavigate: 'login',
        fireFunction: this.logoutHandler
      },
  ];
}
details = (screenToNavigate) =>{
    Actions[screenToNavigate].call();
}

statisticsHandler = (screenToNavigate) =>{
    Actions[screenToNavigate].call();
    }

logoutHandler = (screenToNavigate) => {
    firebase.auth().signOut().then(()=> Actions.reset(screenToNavigate))
    .catch((err) => console.log('logout failed - ',err));
}

render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <Image
          source={require('../../assets/hand.png')}
          style={styles.sideMenuProfileIcon}
        />
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
        
          {this.items.map((item, key) => (
            <TouchableOpacity
            onPress={()=>item.fireFunction(item.screenToNavigate)}
            key={key}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              >
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: global.currentScreenIndex === key ? 'red' : 'black',
                }}
               >
                {item.navOptionName}
              </Text>
            </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
    backgroundColor: 'black'
  },
});