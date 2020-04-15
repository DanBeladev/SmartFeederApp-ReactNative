import React from 'react';
import Routes from './Routes';
import firebaseConfig from './api/firebaseConfig'
import {Provider} from 'react-redux'
import * as firebase from 'firebase';
import store from './store'

// Initialize Firebase 
firebase.initializeApp(firebaseConfig);


export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
    );
}
