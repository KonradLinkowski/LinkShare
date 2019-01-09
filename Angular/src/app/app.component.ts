import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { OAuthCredential } from '@firebase/auth-types';
import { exists } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LinkShare';
  onClickMe() {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection('test').add({
      name: 'test',
      test: 323
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
  private signWithProvider(provider: firebase.auth.AuthProvider) {
    firebase.auth().signInWithPopup(provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = (<OAuthCredential>result.credential).accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log(user)
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      const doc = db.collection('users').doc(user.uid)
      doc.get()
      .then(res => {
        if (!res.exists) {
          doc.set({
            displayName: user.displayName
          })
          .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
        }
      })
      .catch(error => {
        console.log(error);
      })
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode, errorMessage);
    });
  }
  google() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.signWithProvider(provider)
  }
  facebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    this.signWithProvider(provider)
  }
  signout() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('logged out')
    }).catch(function(error) {
      // An error happened.
      console.log('errored')
    });
  }
}
