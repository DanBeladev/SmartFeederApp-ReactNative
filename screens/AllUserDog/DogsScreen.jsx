import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity  } from 'react-native';
import Modal from 'react-native-modal';
import DogComponent from './DogComponent'
import {getAllUserDogs, getAddDogFields} from '../../severSimulator/allUsersDog'
import addBtn from '../../assets/PngItem_1121197.png'
import Header from  '../../generalComponents/Header/Header'
import Form from '../../generalComponents/Templates/Form/Form';

export default class DogsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isModalVisible:false,
    }
    this.onAddClick=this.onAddClick.bind(this);
    this.buildForm=this.buildForm.bind(this);
  }
  
  buildForm(){
    let fields=getAddDogFields();
    return <Form fields={fields} callBack={this.onAddClick}></Form>

  }
  onAddClick(){
      let lastModalState=this.state.isModalVisible;
      this.setState({isModalVisible:!lastModalState});
  }
  render(){
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.dogs}>
            {getAllUserDogs().map(v=><DogComponent key={v.dogName} dogImg={v.dogImg} dogName={v.dogName} lastMealTime={v.lastMealTime} nextMealTime={v.nextMealTime} />)}
            <TouchableOpacity onPress={this.onAddClick}>
              <Image source={addBtn} style={styles.addBtn} />
            </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.isModalVisible}>
          {this.buildForm()}
        </Modal>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7FA1F5',
    alignItems: 'center',
    justifyContent:'flex-start',
    flex:1
  },
  header:{
    marginTop:25,
    position:"relative",
    fontSize:35
  },
  dogs:{
    flexDirection:"column",
    width:"90%",
    height:350,
    margin:20,
  },
  addBtn:{
    width:50,
    height:50,
    position:'relative',
    left:'42%'
  }
  
});
 