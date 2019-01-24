import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-folder-add',
  templateUrl: './folder-add.component.html',
  styleUrls: ['./folder-add.component.css']
})
export class FolderAddComponent implements OnInit {
  @Input() callback: (error?: firebase.firestore.DocumentReference) => void;
  folderForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  onSubmit() {
    this.firestore.collection('folders').add({
      name: this.folderForm.value.name,
      owner: this.fireAuth.auth.currentUser.uid
    })
    .then(() => {
      this.callback();
    })
    .catch(err => {
      this.callback(err);
    });
    this.folderForm.setValue({
      name: ''
    });
  }

  ngOnInit() {
  }

}
