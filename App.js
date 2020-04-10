import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './screens/Login'
import SignInScreen from './screens/SignInScreen'
import DogsScreen from './screens/AllUserDog/DogsScreen'
import UserPage from './screens/UserPage';


export default function App() {
  const [registerPressed,setRegisterPressed] = useState(false)
  const [loginPressed,setLoginPressed] = useState(false)

  const onRegisterPressed = () => {
    setRegisterPressed(true);
  }

  const goBack = () => {
    setRegisterPressed(false);
  }

  const onLoginHandler = () =>{
    setLoginPressed(true)
  }

  let pageToShow;
  if(registerPressed)
  {
    pageToShow = <SignInScreen goBack={goBack}/>
  }
  else if(loginPressed)
  {
    const userDetails = {
      email:"dan",
      password:"123"
    }
    pageToShow=<UserPage user={userDetails}/>
  }
  else
  {
    pageToShow = <Login onLoginPressed={onLoginHandler} onRegisterPress={onRegisterPressed}/>
  }
  pageToShow= <DogsScreen></DogsScreen>
  return (pageToShow);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
