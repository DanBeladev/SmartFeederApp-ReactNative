import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './screens/Login'
import SignInScreen from './screens/SignInScreen'
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

  return (
    <View style={styles.container}>
      {pageToShow}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
