import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Folder } from '../folder';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Link } from '../link';

@Component({
  selector: 'app-link-folder',
  templateUrl: './link-folder.component.html',
  styleUrls: ['./link-folder.component.css']
})
export class LinkFolderComponent implements OnInit, OnDestroy {
  @Input() folder: Folder;
  links: Link[];
  private linksValueChanges: Subscription;

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.linksValueChanges = this.firestore
      .collection<Folder>('folders').doc(this.folder.id)
      .collection<Link>('links', ref => ref.where('owner', '==', this.fireAuth.auth.currentUser.uid))
      .valueChanges().subscribe(links => this.links = links);
  }

  ngOnDestroy(): void {
    this.linksValueChanges.unsubscribe();
  }
}
