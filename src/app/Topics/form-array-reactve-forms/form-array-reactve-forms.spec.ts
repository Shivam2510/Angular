import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayReactveForms } from './form-array-reactve-forms';

describe('FormArrayReactveForms', () => {
  let component: FormArrayReactveForms;
  let fixture: ComponentFixture<FormArrayReactveForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArrayReactveForms],
    }).compileComponents();

    fixture = TestBed.createComponent(FormArrayReactveForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
