import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionActualComponent } from './cancion-actual.component';

describe('CancionActualComponent', () => {
  let component: CancionActualComponent;
  let fixture: ComponentFixture<CancionActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancionActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
