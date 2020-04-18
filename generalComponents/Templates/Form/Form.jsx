import React, { Component } from "react";
import RowInForm from './RowInForm';
import {View, Button, Text,  StyleSheet, Image, TextInput, TouchableOpacity} from "react-native";

export default class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fieldsToValue:{},
            errorMessage:""
        }
        this.buildForm=this.buildForm.bind(this);
        this.handleChangingValue=this.handleChangingValue.bind(this);
        this.checkValidation=this.checkValidation.bind(this);
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
    checkValidation(){
        let result=true;
        this.props.fields.forEach(v=>{
            if(v.valueType==="Integer"){
                if(isNaN(this.state.fieldsToValue[v.field])){
                    this.setState({errorMessage:`"${v.title}" should be a number`});
                    result=false;
                }
            }
            console.log(v);
            console.log(this.state.fieldsToValue[v.field])
            if(v.isMandetory && !this.state.fieldsToValue[v.field] ){
                this.setState({errorMessage:`"${v.title}" has to be filled`});
                result=false
            }
        })
        return result;
    }

    render(){
        return (<View style={styles.container}>
                    {this.buildForm()}
                    <TouchableOpacity style={styles.but} on onPress={()=>{
                        if(this.checkValidation()){
                            this.props.callBack(this.state.fieldsToValue)}
                        }}>
                        <Text style={styles.textBtn}>Send</Text>
                        <Text style={{color:"red", width:"100%"}}>{this.state.errorMessage}</Text>
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