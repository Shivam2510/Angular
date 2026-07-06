import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { delay, map, Observable, of } from "rxjs";

export function usernameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable< ValidationErrors | null > => {
           return of(control.value).pipe(
            delay(1000),
            map(value => {
                return  (value.toLowerCase() === 'shivam') ? { usernameTaken: true }: null;
            })
           )
        }
}