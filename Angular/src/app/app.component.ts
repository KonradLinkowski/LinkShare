import { Component } from '@angular/core';
import { database, signWithProvider } from '../services/firebase-setup'
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LinkShare';
  onClickMe() {
    database.collection('test').add({
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
  private 
  google() {
    const provider = new firebase.auth.GoogleAuthProvider();
    signWithProvider(provider)
  }
  facebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    signWithProvider(provider)
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
