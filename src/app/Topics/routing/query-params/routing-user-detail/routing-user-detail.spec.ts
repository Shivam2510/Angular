import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingUserDetail } from './routing-user-detail';

describe('RoutingUserDetail', () => {
  let component: RoutingUserDetail;
  let fixture: ComponentFixture<RoutingUserDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingUserDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutingUserDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
