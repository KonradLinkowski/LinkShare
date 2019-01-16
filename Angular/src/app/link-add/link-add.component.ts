import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Link } from '../models/link';

@Component({
  selector: 'app-link-add',
  templateUrl: './link-add.component.html',
  styleUrls: ['./link-add.component.css']
})
export class LinkAddComponent implements OnInit {
  @Input() folderId: string;
  @Input() callback: (error?: firebase.firestore.DocumentReference) => void;

  linkForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  onSubmit() {
    this.firestore.collection('folders').doc(this.folderId).collection('links').add({
      name: this.linkForm.value.name,
      url: this.linkForm.value.url,
      description: this.linkForm.value.description,
      owner: this.fireAuth.auth.currentUser.uid,
      folder: this.folderId
    })
    .then(() => {
      this.callback();
    })
    .catch(err => {
      this.callback(err);
    });
    this.linkForm.setValue({
      name: '',
      url: '',
      description: ''
    });
  }

  ngOnInit() {
  }

}
