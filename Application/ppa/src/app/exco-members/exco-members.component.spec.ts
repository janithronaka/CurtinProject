import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcoMembersComponent } from './exco-members.component';

describe('ExcoMembersComponent', () => {
  let component: ExcoMembersComponent;
  let fixture: ComponentFixture<ExcoMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcoMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcoMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
