import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  constructor(public fireAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
  }

  async login(provName: String) {
    let provider: auth.AuthProvider = null;
    switch (provName) {
      case 'google':
      provider = new auth.GoogleAuthProvider();
      break;
      case 'facebook':
      provider = new auth.FacebookAuthProvider();
      break;
      default:
      throw new TypeError('Unknown provider');
    }
    try {
      await this.fireAuth.auth.signInWithRedirect(provider);
    } catch (error) {
      console.error(error);
    }
  }

  private registerUser(credentials: auth.UserCredential): Promise<void> {
    return new Promise((resolve, reject) => {
      const user = credentials.user;
      const doc = this.firestore.collection('users').doc(user.uid);
      doc.snapshotChanges().subscribe(
        res => {
          if (!res.payload.exists) {
            doc.set({
              displayName: user.displayName
            })
            .then(() => {
              resolve();
            })
            .catch(error => {
              reject(error);
            });
          } else {
            resolve();
          }
        },
        err => reject(err)
      );
    });
  }

  ngAfterViewInit() {
      this.fireAuth.auth.getRedirectResult()
      .then(credentials => {
        if (credentials.user) {
          this.registerUser(credentials)
          .then(() => {
            this.router.navigateByUrl('');
          })
          .catch(error => {
            console.error(error);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}
