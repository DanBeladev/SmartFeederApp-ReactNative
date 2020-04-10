import React, { Component } from "react";
import {View,Text,StyleSheet,Image,TextInput,TouchableWithoutFeedback} from "react-native";

export default class DogComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={style.container}>
                <View style={style.leftSide}>
                    <Image style={style.image} source={this.props.dogImg}></Image>
                    <Text style={style.dogName}>{this.props.dogName}</Text>
                </View>
                <View style={style.innerText}>
                    <Text style={style.text}>{this.props.lastMealTime?"Last meal: "+this.props.lastMealTime: "Last meal: Unknown"}</Text>
                    <Text style={style.text}>{this.props.nextMealTime?"next meal: "+this.props.nextMealTime: "next meal: Unknown"}</Text>
                </View>
            </View>
            
        );
    }
}

const style=StyleSheet.create({
    container: {
        backgroundColor:"#D8BFD8",
        flexDirection:"row",
        height:"35%",
        margin:10
    },
    image:{
        height:"80%",
        width:90,
        borderRadius:100,
        marginRight:30,
        flex:3
    },
    innerText: {
        justifyContent:'space-between',
        marginVertical:10
    },

    leftSide:{
        flexDirection:'column',
    },

    dogName:{
        flex:1,
        fontSize:20,
        left:'10%'
    },

    text: {
        fontSize:18
    }

})