import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterRequestComponent } from './letter-request.component';

describe('LetterRequestComponent', () => {
  let component: LetterRequestComponent;
  let fixture: ComponentFixture<LetterRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
