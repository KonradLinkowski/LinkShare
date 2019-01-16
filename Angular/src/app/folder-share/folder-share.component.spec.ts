import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderShareComponent } from './folder-share.component';

describe('FolderShareComponent', () => {
  let component: FolderShareComponent;
  let fixture: ComponentFixture<FolderShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
