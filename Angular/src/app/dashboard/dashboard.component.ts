import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Folder } from '../folder';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  folders: Folder[];
  private foldersValueChanges: Subscription;

  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  logout() {
    this.fireAuth.auth.signOut();
  }

  ngOnInit() {
    this.foldersValueChanges = this.firestore
      .collection<Folder>('folders', ref => ref.where('owner', '==', this.fireAuth.auth.currentUser.uid))
      .snapshotChanges().subscribe(folders => {
        this.folders = folders.map(fold => {
          return {
            id: fold.payload.doc.id,
            name: fold.payload.doc.data().name,
            owner: fold.payload.doc.data().owner
          };
        });
      });
  }

  ngOnDestroy() {
    this.foldersValueChanges.unsubscribe();
  }
}
