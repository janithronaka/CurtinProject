import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageDashboardComponent } from './homepage-dashboard.component';

describe('HomepageDashboardComponent', () => {
  let component: HomepageDashboardComponent;
  let fixture: ComponentFixture<HomepageDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
