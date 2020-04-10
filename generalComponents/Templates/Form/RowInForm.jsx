import React, { Component } from "react";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import {View,  Text,  StyleSheet, Picker, TextInput} from "react-native";

export default class RowInForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            val:"1"
        }
    }
    render(){
        if(!this.props.params){
            return "";
        }
        switch (this.props.params.type){
            case "text":
                this.elem=<TextInput style={styles.elements}/>
                break;
            case "radio":
                this.elem=<RadioForm radio_props={this.props.params.radioProps} initial={0} onPress={(value)=>console.log(value)} formHorizontal={true}></RadioForm>
                break;
            case "combo":
                this.elem=<Picker style={styles.combo} selectedValue={this.state.val} onValueChange={(value)=>{this.setState({val:value})}}>
                    {this.props.params.data.map(v=><Picker.Item key={v.label} label={v.label} value={v.value}/>)}
                </Picker>
                break;
        }
        return <View style={styles.container}><Text>{this.props.params.title+":  "}</Text>{this.elem}</View>
    }
}

const styles=StyleSheet.create({
    container: {
        flexDirection:'row',
        marginTop:20
    },
    title: {
        fontSize:20,
    },
    elements:{
        height:"80%",
        width:"70%",
        backgroundColor:"white"
    },
    radioButton:{
        height:13
    },
    combo:{
        height:"100%",
        width: "30%",
        backgroundColor:"white" 
    }

})