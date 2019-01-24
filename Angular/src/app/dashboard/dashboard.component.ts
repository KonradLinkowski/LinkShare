import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Folder } from '../models/folder';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  folders: Folder[];
  sharedFolders: Folder[];
  private foldersValueChanges: Subscription;
  private shaderFoldersValueChanges: Subscription;
  private modalIsOpen: boolean;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  logout() {
    this.fireAuth.auth.signOut();
  }

  openModal(value: boolean) {
    this.modalIsOpen = value;
  }

  onFolderAdded(error: firebase.firestore.DocumentReference) {
    if (error) {
      console.error(error);
    }
  }

  ngOnInit() {
    this.foldersValueChanges = this.firestore
    .collection<Folder>('folders', ref => ref.where('owner', '==', this.fireAuth.auth.currentUser.uid))
    .snapshotChanges().subscribe(folders => {
      this.folders = folders.map(fold => {
        const data = fold.payload.doc.data();
        return {
          id: fold.payload.doc.id,
          name: data.name,
          owner: data.owner,
          users: data.users
        };
      });
    });

    this.shaderFoldersValueChanges = this.firestore
    .collection<Folder>('folders', ref => ref.where('users', 'array-contains', this.fireAuth.auth.currentUser.uid))
    .snapshotChanges().subscribe(folders => {
      this.sharedFolders = folders.map(fold => {
        const data = fold.payload.doc.data();
        return {
          id: fold.payload.doc.id,
          name: data.name,
          owner: data.owner,
          users: data.users
        };
      });
    });
  }

  ngOnDestroy() {
    this.foldersValueChanges.unsubscribe();
    this.shaderFoldersValueChanges.unsubscribe();
  }
}
