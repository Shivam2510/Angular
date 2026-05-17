import { AbstractControl, ValidationErrors } from "@angular/forms";


export function passwordMatchValidator(group: AbstractControl): (ValidationErrors | null){
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  if (password !== confirmPassword) {
    return {
      passwordMismatch: true
    };
  }

  return null;
}