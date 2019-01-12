import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Link } from '../link';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  links: Link[];
  private linksValueChanges: Subscription;

  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  logout() {
    this.fireAuth.auth.signOut();
  }

  ngOnInit() {
    this.linksValueChanges = this.firestore.collection<Link>('links', ref => ref.where('owner', '==', this.fireAuth.auth.currentUser.uid))
      .valueChanges().subscribe(links => this.links = links);
  }

  ngOnDestroy() {
    this.linksValueChanges.unsubscribe();
  }
}
