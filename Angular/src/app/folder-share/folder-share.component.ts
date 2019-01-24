import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, bindCallback } from 'rxjs';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Folder } from '../models/folder';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-folder-share',
  templateUrl: './folder-share.component.html',
  styleUrls: ['./folder-share.component.css']
})
export class FolderShareComponent implements OnInit, OnDestroy {
  @Input() folderId: string;
  @Input() callback: (error?: firebase.firestore.DocumentReference) => void;

  private findSubscription: Subscription;
  private sharedSubscription: Subscription;
  private allUsers: User[];
  private users: User[] = [];
  private searchString = '';
  private sharedUsers: User[] = [];

  constructor(private fireStore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  search() {
    this.users = this.allUsers.filter(u => {
      return u.displayName.toLowerCase().includes(this.searchString)
      && !this.sharedUsers.some(s => s.id === u.id);
    });
  }

  selectUser(user: User) {
    this.sharedUsers.push(user);
    this.search();
  }

  deselectUser(user: User) {
    this.sharedUsers.splice(this.sharedUsers.findIndex(u => u.id === user.id), 1);
    this.search();
  }

  share() {
    this.fireStore.collection<Folder>('folders').doc(this.folderId).update({
      users: this.sharedUsers.map(u => u.id)
    })
    .then(() => {
      this.callback();
    })
    .catch(err => {
      this.callback(err);
    });
  }

  ngOnInit() {
    this.findSubscription = this.fireStore
    .collection<User>('users').snapshotChanges()
    .subscribe(users => {
      this.allUsers = users.filter(u => u.payload.doc.id !== this.fireAuth.auth.currentUser.uid)
      .map(u => {
        return {
          id: u.payload.doc.id,
          displayName: u.payload.doc.data().displayName
        };
      });
      this.search();
    });

    this.sharedSubscription = this.fireStore
    .collection<Folder>('folders').doc(this.folderId).get()
    .subscribe(folder => {
      this.fireStore.collection<User>('users').get()
      .toPromise().then(snap => {
        const users = folder.data().users || [];
        snap.docs.forEach(doc => {
          const user: User = {
            id: doc.id,
            displayName: doc.data().displayName
          };
          if (users.includes(user.id)) {
            this.sharedUsers.push(user);
          }
        });
        this.search();
      });
    });
  }

  ngOnDestroy() {
    this.findSubscription.unsubscribe();
  }

}
