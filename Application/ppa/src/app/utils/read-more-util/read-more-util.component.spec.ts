import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreUtilComponent } from './read-more-util.component';

describe('ReadMoreUtilComponent', () => {
  let component: ReadMoreUtilComponent;
  let fixture: ComponentFixture<ReadMoreUtilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadMoreUtilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
