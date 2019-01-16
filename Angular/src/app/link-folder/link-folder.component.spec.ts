import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkFolderComponent } from './link-folder.component';

describe('LinkFolderComponent', () => {
  let component: LinkFolderComponent;
  let fixture: ComponentFixture<LinkFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
