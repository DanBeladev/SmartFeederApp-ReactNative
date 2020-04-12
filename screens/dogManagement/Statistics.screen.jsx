import React from "react";
import {View,Text,StyleSheet} from "react-native";

export default class Statistics extends React.Component{
    render(){
        const {dog} = this.props;
        return (
            <View style={style.container}>
                <Text>STATISTICS</Text>
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