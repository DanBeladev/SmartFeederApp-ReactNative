import React, { Component } from "react";
import {View,  Text,  StyleSheet, Image, TextInput, TouchableWithoutFeedback} from "react-native";
import menuImg from '../../assets/menu.png'

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={menuImg} style={styles.menu} />
                <Text style={styles.mainContent}> Fucker</Text>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container: {
        backgroundColor:"#9999ff",
        flexDirection:'row',
        width:'100%',
        height:40,
        top:24,
        justifyContent:'flex-start'
    },
    menu:{
        width:30,
        height:30,
        marginLeft:20
    },
    mainContent:{
        marginHorizontal:'30%',
        fontSize:23
    }

})