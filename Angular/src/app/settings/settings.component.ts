import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private fireAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

  deleteAccount() {
    const user = this.fireAuth.auth.currentUser;
    user.delete()
    .then(() => {
      this.router.navigateByUrl('login');
    })
    .catch(err => {
      console.error(err);
    });
  }

  ngOnInit() {
  }

}
