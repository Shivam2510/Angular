import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorUser } from './error-user';

describe('ErrorUser', () => {
  let component: ErrorUser;
  let fixture: ComponentFixture<ErrorUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorUser],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
