import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity  } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import DogComponent from './DogComponent'
import {getAllUserDogs} from '../../severSimulator/allUsersDog'
import addBtn from '../../assets/PngItem_1121197.png'
import Header from  '../../generalComponents/Header/Header'
import Form from '../../generalComponents/Templates/Form/Form';


export default class DogsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      allUserDogs:[],
      isModalVisible:false,
      image:null
    }
    this.onAddClick=this.onAddClick.bind(this);
    this.formCallBack=this.formCallBack.bind(this);
    this.buildForm=this.buildForm.bind(this);
    this.getPermissionAsync=this.getPermissionAsync.bind(this);
    this.pickImage=this.pickImage.bind(this);
  }
  componentDidMount() {
    let allUserDogs=getAllUserDogs();
    this.setState({allUserDogs:allUserDogs})
    this.getPermissionAsync();
    console.log('hi');
  }
  buildForm(){
    let fields=([
      {type:"text", field:"dogName", title:"dog name", labelVisibale:true},
      {type:"radio", field:"gender", title:"gender", labelVisibale:true, radioProps: [{label: 'male     ', value: 0 },{label: 'female', value: 1 }]},
      {type:'combo', field:"age", title:"age",labelVisibale:true, data:[{label:"1",value:1}, {label:"2",value:2}, {label:"3",value:3}, {label:"4",value:4}]},
      {type:'button', field:"pic", labelVisibale:false, title:"add pic", onClick:()=>{this.pickImage()}}
    ]); 
    return <Form fields={fields} callBack={this.formCallBack}></Form>
 
  }

  async getPermissionAsync(){
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  formCallBack(fieldsToValue){
    console.log(fieldsToValue);
      const newDog={
        dogImg:{uri: this.state.image},
        dogName:fieldsToValue.dogName
      }
      let newAllUserDogs=[...this.state.allUserDogs];
      newAllUserDogs.push(newDog);
      console.log(newAllUserDogs); //remove this
      const lastModalState=this.state.isModalVisible;
      this.setState({isModalVisible:!lastModalState,allUserDogs:newAllUserDogs});  
  }
  onAddClick(){
    const lastModalState=this.state.isModalVisible;
    this.setState({isModalVisible:!lastModalState});
  }
  async pickImage(){
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  render(){
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.dogs}>
            {this.state.allUserDogs.map(v=><DogComponent key={v.dogName} 
                                        dogImg={v.dogImg} 
                                        dogName={v.dogName} 
                                        lastMealTime={v.lastMealTime} 
                                        nextMealTime={v.nextMealTime} />)}
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
 