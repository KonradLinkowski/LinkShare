import { Component, OnInit, Input } from '@angular/core';
import { Link } from '../models/link';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input() link: Link;

  constructor(private sanitizer: DomSanitizer, private firestore: AngularFirestore) {}


  deleteLink() {
    this.firestore.collection('folders').doc(this.link.folder).collection('links').doc(this.link.id).delete()
    .catch(err => {
      console.error(err);
    });
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {
  }

}
