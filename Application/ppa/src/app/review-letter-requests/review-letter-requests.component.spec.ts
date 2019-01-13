import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLetterRequestsComponent } from './review-letter-requests.component';

describe('ReviewLetterRequestsComponent', () => {
  let component: ReviewLetterRequestsComponent;
  let fixture: ComponentFixture<ReviewLetterRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewLetterRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLetterRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
