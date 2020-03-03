import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsMenuComponent } from './playlists-menu.component';

describe('PlaylistsMenuComponent', () => {
  let component: PlaylistsMenuComponent;
  let fixture: ComponentFixture<PlaylistsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
