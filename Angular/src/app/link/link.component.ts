import { Component, OnInit, Input } from '@angular/core';
import { Link } from '../models/link';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input() link: Link;

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {
  }

}
