import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private fireAuth: AngularFireAuth) { }

  logout() {
    this.fireAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
