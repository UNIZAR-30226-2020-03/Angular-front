import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcualizadorComponent } from './ecualizador.component';

describe('EcualizadorComponent', () => {
  let component: EcualizadorComponent;
  let fixture: ComponentFixture<EcualizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcualizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcualizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
