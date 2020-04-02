import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCClbm3y5njz-U6NOvhnJ-PFhIRHRaMr9k",
  authDomain: "fbtest-f87bf.firebaseapp.com",
  databaseURL: "https://fbtest-f87bf.firebaseio.com",
  projectId: "fbtest-f87bf",
  storageBucket: "fbtest-f87bf.appspot.com",
  messagingSenderId: "607025932588",
  appId: "1:607025932588:web:4f8bc0973dfdd76d90e489"
};
// Initialize Firebase
if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("Logged in with user: ", user);
  } else {
    console.log('Not logged in')
  }
});

export default function App() {
  // TODO: Implementation
  const handleAuth = async () => {
    try {
      await Facebook.initializeAsync('219323322505831'); // enter your Facebook App Id 
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential)
          .then(user => {
            console.log('Logged in successfully', user)
          })
          .catch((error) => {
            console.log('Error occurred ', error)
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAuth} >
        <Text>Facebook Login</Text>
      </TouchableOpacity>
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
