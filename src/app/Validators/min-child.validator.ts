// This validator is for a FormArray in Angular.

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function minChildValidator(): ValidatorFn{
    return (control: AbstractControl): (ValidationErrors | null) =>{
        const children = control.value;

        if (!children || children.length < 1) {
        return {
            minimumChildRequired: true
        };
        }

        return null;
    }
}