import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChild } from './home-child';

describe('HomeChild', () => {
  let component: HomeChild;
  let fixture: ComponentFixture<HomeChild>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeChild],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeChild);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
