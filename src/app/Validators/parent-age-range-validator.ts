// This validator is for a FormGroup in Angular.

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function parentAgeRangeValidator(min: number, max: number):ValidatorFn{
    return (control: AbstractControl): (ValidationErrors | null) => {
        const age = control.value;

        if (!age) {
            return null;
        }

        if (age < min || age > max) {
        return {
            invalidAgeRange: true
        };
        }

        return null;
        
    }
}