import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';


export function childAgeValidator(): ValidatorFn{
    return (control: AbstractControl): (ValidationErrors | null) => {
        const childAge = control.value;

        if (!childAge) {
            return null;
        }


        if(childAge < 1 || childAge > 18){
            return {invalidChildAge: true}
        }

        return null;
    }
}