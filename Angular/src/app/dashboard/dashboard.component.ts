import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Link } from '../link';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  links: Link[];

  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  logout() {
    this.fireAuth.auth.signOut();
  }

  ngOnInit() {
    this.firestore.collection<Link>('links').valueChanges().subscribe(links => this.links = links);
  }
}
