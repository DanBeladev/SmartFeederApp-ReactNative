import React from 'react';
import Routes from './Routes';
import firebaseConfig from './api/firebaseConfig'
import * as firebase from 'firebase';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default function App() {
  return (
    <Routes />
    );
}
