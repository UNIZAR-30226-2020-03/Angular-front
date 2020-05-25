import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumesMenuComponent } from './albumes-menu.component';

describe('AlbumesMenuComponent', () => {
  let component: AlbumesMenuComponent;
  let fixture: ComponentFixture<AlbumesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
