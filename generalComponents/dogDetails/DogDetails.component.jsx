import React from "react";
import {View,  Text,  StyleSheet} from "react-native";

export default class DogDetails extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>hey</Text>
                <Text>Dog details</Text>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex:1,
    }
})