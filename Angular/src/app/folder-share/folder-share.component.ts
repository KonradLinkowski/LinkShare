import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
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
  private findSubscription: Subscription;
  private allUsers: User[];
  private users: User[];
  private searchString = '';
  private selectedUsers: User[] = [];

  constructor(private fireStore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  search() {
    this.users = this.allUsers.filter(u => u.displayName.toLowerCase().includes(this.searchString));
  }

  check(checkbox: HTMLInputElement, index: number) {
    const user = this.users[index];
    if (checkbox.checked && !this.selectedUsers.includes(user)) {
      this.selectedUsers.push(user);
    } else if (!checkbox.checked && this.selectedUsers.includes(user)) {
      const userIndex = this.selectedUsers.findIndex(u => u.id === user.id);
      this.selectedUsers.splice(userIndex, 1);
    }
  }

  share() {
    this.selectedUsers.forEach(u => {
      this.fireStore.collection<Folder>('folders').doc(this.folderId).update({
        users: firestore.FieldValue.arrayUnion(u.id)
      });
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
  }

  ngOnDestroy() {
    this.findSubscription.unsubscribe();
  }

}
