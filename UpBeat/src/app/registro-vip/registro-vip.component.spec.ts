import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVipComponent } from './registro-vip.component';

describe('RegistroVipComponent', () => {
  let component: RegistroVipComponent;
  let fixture: ComponentFixture<RegistroVipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroVipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroVipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
