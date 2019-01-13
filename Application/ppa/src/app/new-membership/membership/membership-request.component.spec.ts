import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipRequestComponent } from './membership-request.component';

describe('MembershipScreen1Component', () => {
  let component: MembershipRequestComponent;
  let fixture: ComponentFixture<MembershipRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
