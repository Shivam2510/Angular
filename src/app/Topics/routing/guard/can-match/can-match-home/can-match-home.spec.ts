import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanMatchHome } from './can-match-home';

describe('CanMatchHome', () => {
  let component: CanMatchHome;
  let fixture: ComponentFixture<CanMatchHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanMatchHome],
    }).compileComponents();

    fixture = TestBed.createComponent(CanMatchHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
