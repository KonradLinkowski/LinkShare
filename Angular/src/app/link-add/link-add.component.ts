import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-link-add',
  templateUrl: './link-add.component.html',
  styleUrls: ['./link-add.component.css']
})
export class LinkAddComponent implements OnInit {
  linkForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private firestore: AngularFirestore) { }

  onSubmit() {
    this.firestore.collection('links').add({
      name: this.linkForm.value.name,
      url: this.linkForm.value.url,
      description: this.linkForm.value.description
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
