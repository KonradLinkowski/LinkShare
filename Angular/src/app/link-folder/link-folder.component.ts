import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Folder } from '../models/folder';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Link } from '../models/link';

@Component({
  selector: 'app-link-folder',
  templateUrl: './link-folder.component.html',
  styleUrls: ['./link-folder.component.css']
})
export class LinkFolderComponent implements OnInit, OnDestroy {
  @Input() folder: Folder;
  links: Link[];
  private linksValueChanges: Subscription;
  private modal: string;

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  private isMine() {
    return this.fireAuth.auth.currentUser && this.folder.owner === this.fireAuth.auth.currentUser.uid;
  }

  openModal(value?: string) {
    this.modal = value;
  }

  deleteFolder() {
    this.firestore.collection('folders').doc(this.folder.id).delete()
    .catch(err => {
      console.error(err);
    });
  }

  onLinkAddition(error: firebase.firestore.DocumentReference) {
    if (error) {
      console.error(error);
    }
  }

  ngOnInit() {
    this.linksValueChanges = this.firestore
    .collection<Folder>('folders').doc(this.folder.id)
    .collection<Link>('links')
    .snapshotChanges().subscribe(links => {
      this.links = links.map(l => {
        const data = l.payload.doc.data();
        return {
          id: l.payload.doc.id,
          name: data.name,
          description: data.description,
          url: data.url,
          owner: data.owner,
          folder: data.folder
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.linksValueChanges.unsubscribe();
  }
}
