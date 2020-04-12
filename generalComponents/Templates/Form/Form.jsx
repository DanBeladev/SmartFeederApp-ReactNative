import React, { Component } from "react";
import RowInForm from './RowInForm';
import {View, Button, Text,  StyleSheet, Image, TextInput, TouchableOpacity} from "react-native";

export default class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fieldsToValue:{}
        }
        this.buildForm=this.buildForm.bind(this);
        this.handleChangingValue=this.handleChangingValue.bind(this);
        this.row=this.buildForm();

    }
    buildForm(){
        return this.props.fields.map(v=><RowInForm params={v} key={v.title} onGettingValue={this.handleChangingValue}></RowInForm>)
    }

    handleChangingValue(newVale,field){
        let newFieldsToValue={...this.state.fieldsToValue};
        newFieldsToValue[field]=newVale
        this.setState({fieldsToValue:newFieldsToValue})
    }

    render(){
        return (<View style={styles.container}>
                    {this.buildForm()}
                    <TouchableOpacity style={styles.but} on onPress={()=>{this.props.callBack(this.state.fieldsToValue)}}>
                        <Text style={styles.textBtn}>Send</Text>
                    </TouchableOpacity>
                </View>) ;
    }
}

const styles=StyleSheet.create({
    container: {
        backgroundColor:"#808080",
        width:"100%",
        height:"50%",
        alignItems:'flex-start'
        
    },
    but: {
        width:"40%",
        height:30,
        backgroundColor:'#008B8B',
        marginTop:20,
        alignItems:'center',
        borderRadius:100,
        marginHorizontal:"25%"
    },
    textBtn:{
        fontSize:23,
    }

})