import React from "react";
import {View,Text,StyleSheet,Image} from "react-native";
import DogHeader from "../../generalComponents/Header/DogHeader.component";
import ActionButton, { ActionButtonItem } from "react-native-action-button";
import DogDetails from "../../generalComponents/digDetails/DogDetails.component";

export default class DogManagment extends React.Component{
    render(){
        console.log('props',this.props);
        const {dog} = this.props;
        console.log(dog);
        return (
            <View style={style.container}>
                <DogHeader  dog = {{dogName: 'Nala', dogImg: require('../../assets/hand.png')}} />
                <DogDetails />
            </View>
);
        }
}

const style=StyleSheet.create({
    container: {
        backgroundColor:"red",
        flex:1
    },
});