import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginResetCodeComponent } from './login-reset-code.component';

describe('LoginResetCodeComponent', () => {
  let component: LoginResetCodeComponent;
  let fixture: ComponentFixture<LoginResetCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginResetCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginResetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
