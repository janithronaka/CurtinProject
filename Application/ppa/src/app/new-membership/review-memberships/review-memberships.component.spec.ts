import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMembershipsComponent } from './review-memberships.component';

describe('ReviewMembershipsComponent', () => {
  let component: ReviewMembershipsComponent;
  let fixture: ComponentFixture<ReviewMembershipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewMembershipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewMembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
