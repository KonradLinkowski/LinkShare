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

  linkForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  onSubmit() {
    console.log(this.folderId);
    this.firestore.collection('folders').doc(this.folderId).collection<Link>('links').add({
      name: this.linkForm.value.name,
      url: this.linkForm.value.url,
      description: this.linkForm.value.description,
      owner: this.fireAuth.auth.currentUser.uid
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
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
