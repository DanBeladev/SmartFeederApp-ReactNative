import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './screens/Login'
import SignInScreen from './screens/SignInScreen'


export default function App() {
  const [registerPressed,setRegisterPressed] = useState(false)

  const onRegisterPressed = () => {
    setRegisterPressed(true);
  }

  const goBack = () => {
    setRegisterPressed(false);
  }

  let pageToShow;
  if(registerPressed)
  {
    pageToShow = <SignInScreen goBack={goBack}/>
  }
  else
  {
    pageToShow = <Login onRegisterPress={onRegisterPressed}/>
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
