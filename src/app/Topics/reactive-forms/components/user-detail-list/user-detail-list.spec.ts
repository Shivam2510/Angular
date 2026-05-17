import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailList } from './user-detail-list';

describe('UserDetailList', () => {
  let component: UserDetailList;
  let fixture: ComponentFixture<UserDetailList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailList],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
