import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingUserList } from './routing-user-list';

describe('RoutingUserList', () => {
  let component: RoutingUserList;
  let fixture: ComponentFixture<RoutingUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingUserList],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutingUserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
