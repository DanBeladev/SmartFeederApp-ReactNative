import 'react-native-gesture-handler';
import React from 'react';
import firebaseConfig from './api/firebaseConfig';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import store from './store';
import Navigator from './Navigator';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}
