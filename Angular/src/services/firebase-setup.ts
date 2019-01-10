import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { OAuthCredential } from '@firebase/auth-types';

firebase.initializeApp({
  apiKey: "AIzaSyAyjOGVsKWcX_zeaeuChwBBo6e_QeKq4LM",
  authDomain: "linkshare-ec755.firebaseapp.com",
  databaseURL: "https://linkshare-ec755.firebaseio.com",
  projectId: "linkshare-ec755",
  storageBucket: "linkshare-ec755.appspot.com",
  messagingSenderId: "674524310907"
});

export const database = firebase.firestore();
database.settings({
    timestampsInSnapshots: true
});

export const signWithProvider = async (provider: firebase.auth.AuthProvider) => {
  try {
    const result = await firebase.auth().signInWithPopup(provider)
    const token = (<OAuthCredential>result.credential).accessToken;
    const user = result.user;
    const doc = database.collection('users').doc(user.uid)
    try {
      const response = await doc.get()
      if (!response.exists) {
        return await doc.set({
          displayName: user.displayName
        })
      } else {
        return response
      }
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode, errorMessage);
    }
  } catch (error) {

  }
}