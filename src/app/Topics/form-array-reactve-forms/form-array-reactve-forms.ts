import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { childAgeValidator } from '../../Validators/child-age.validator';
import { parentAgeRangeValidator } from '../../Validators/parent-age-range-validator';
import { passwordMatchValidator } from '../../Validators/password-match.validator';
import { minChildValidator } from '../../Validators/min-child.validator';
import { usernameExistsValidator } from '../../Validators/username-exists.validator';

@Component({
  selector: 'form-array-reactve-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './form-array-reactve-forms.html',
  styleUrl: './form-array-reactve-forms.scss',
  standalone: true
})
export class FormArrayReactveForms implements OnInit {
  protected userForm!: FormGroup;
    
    ngOnInit(): void {
      this.userForm = new FormGroup({
        fullName: new FormControl('', [Validators.required], [usernameExistsValidator()]),
        age: new FormControl('', [Validators.required, parentAgeRangeValidator(25, 60)]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        wifeName: new FormControl('', [Validators.required]),
        wifeAge: new FormControl('', [Validators.required, parentAgeRangeValidator(20, 56)]),
        mobileNumber: new FormControl('', [Validators.required]),
        children: new FormArray([], [minChildValidator()]),
      },{
        validators: passwordMatchValidator
      })
    }

    get children(){
      return this.userForm.get('children') as FormArray;
    }

    protected addChild(): void {
      let childForm:FormGroup = new FormGroup({
        childName: new FormControl('', Validators.required),
        childAge: new FormControl('', [Validators.required, childAgeValidator()]),
      },)

      this.children.push(childForm);
    }


    protected removeChild(index: number): void {
      this.children.removeAt(index);
    }

    protected submitForm(): void {
      console.log(this.userForm.value);
    }

}
