import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionMenuComponent } from './admission-menu.component';

describe('AdmissionMenuComponent', () => {
  let component: AdmissionMenuComponent;
  let fixture: ComponentFixture<AdmissionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
