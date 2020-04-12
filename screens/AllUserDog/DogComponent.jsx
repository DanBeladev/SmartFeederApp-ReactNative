import React from "react";
import {View,Text,StyleSheet,Image,TextInput,TouchableWithoutFeedback, Alert} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

export default class DogComponent extends React.Component{
    dogPressed = () => {
        const {dog} = this.props;
        console.log('in dog component before transform' , dog)
        Actions.dogManagement({dog});
    }
    render(){
        const { dog } = this.props;
        return (
            <TouchableOpacity style={style.container} onPress={this.dogPressed}>
                <View style={style.leftSide}>
                    <Image style={style.image} source={dog.dogImg}></Image>
                    <Text style={style.dogName}>{dog.dogName}</Text>
                </View>
                <View style={style.innerText}>
                    <Text style={style.text}>
                        <Text>Last Meal: </Text>
                        {dog.lastMealTime ?  <Text style={style.time}>{dog.lastMealTime}</Text> : <Text style={style.time}>Unknown</Text>}
                    </Text>
                    <Text style={style.text}>
                        <Text>Next Meal: </Text>
                        {dog.nextMealTime ?  <Text style={style.time}>{dog.nextMealTime}</Text> : <Text style={style.time}>Unknown</Text>}
                    </Text>
                </View>
         </TouchableOpacity>
            
        );
    }
}

const style=StyleSheet.create({
    container: {
        backgroundColor:"#fffff9",
        flexDirection:"row",
        height:250,
        width: "100%",
        padding:20,
        justifyContent:'space-between',
        borderRadius: 30,
        borderWidth:1,
        marginTop:20,
        
    },
    image:{
        height:150,
        maxHeight:"100%",
        maxWidth:"80%",
        borderRadius:100,
    },
    innerText: {
        justifyContent:'space-between',
        marginVertical:10
    },

    leftSide:{
        flex:1,
        flexDirection:'column',
    },

    dogName:{
        fontSize:25,
        fontWeight: 'bold',
        color:'blue',
        textAlign:'center',
        width:"80%",
        height:30,
        marginTop:10,
        marginBottom:20,
    },

    text: {
        fontSize:20,
    },
    time: {
        color:'black',
        fontWeight:'bold'
    }

})