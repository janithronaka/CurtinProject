import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageSidebarComponent } from './homepage-sidebar.component';

describe('HomepageSidebarComponent', () => {
  let component: HomepageSidebarComponent;
  let fixture: ComponentFixture<HomepageSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
