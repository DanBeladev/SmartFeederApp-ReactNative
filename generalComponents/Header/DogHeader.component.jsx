import React from "react";
import {View,  Text,  StyleSheet, Image, TextInput, TouchableWithoutFeedback} from "react-native";

export default class DogHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { dog } = this.props;
        return(
            <View style={styles.container}>
                <Image source={dog.dogImg} style={styles.menu} />
                <Text style ={styles.name}>{dog.dogName}</Text>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container: {
        flexDirection:'column',
        flex:1,
        backgroundColor:'white',
        width:'100%',
        maxHeight:130,
    },
    menu: {
        alignSelf:"center",
        borderRadius:100,
        width:100,
        height:100,
    },
    name: {
        textAlign:"center",
        fontSize: 20,
        fontWeight:"bold"
    }
})