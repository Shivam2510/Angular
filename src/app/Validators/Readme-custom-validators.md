# Angular Custom Validators - Interview Preparation Guide

This guide covers Angular custom validators in depth for interview preparation and real-world usage.

---

# 1. What is a Validator?

A validator is a function that checks whether form input is valid.

Angular provides built-in validators:

* required
* minLength
* maxLength
* pattern
* email
* min
* max

Example:

```ts
fullName: new FormControl('', Validators.required)
```

---

# 2. What is a Custom Validator?

A custom validator is a validator created by developers for custom business rules.

Example:

* Age must be between 1 and 18
* Password must contain uppercase and special characters
* Start date must be before end date
* At least one child required

---

# 3. Validator Function Structure

```ts
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function customValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return null;
  };
}
```

---

# 4. Important Types

## AbstractControl

Base class for:

* FormControl
* FormGroup
* FormArray

It gives access to:

```ts
control.value
control.errors
control.valid
control.invalid
```

---

## ValidationErrors

Validation error object.

Example:

```ts
{
  invalidAge: true
}
```

---

## ValidatorFn

Function type for validators.

Signature:

```ts
(control: AbstractControl) => ValidationErrors | null
```

---

# 5. Custom FormControl Validator Example

Age validator:

```ts
export function ageValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const age = control.value;

    if (age < 1 || age > 18) {
      return {
        invalidAge: true
      };
    }

    return null;
  };
}
```

Use:

```ts
childAge: new FormControl('', [
  Validators.required,
  ageValidator()
])
```

---

# 6. Display Validation Error

```html
@if (userForm.get('childAge')?.errors?.['invalidAge']) {
  <p>Invalid age</p>
}
```

---

# 7. Parameterized Validator

Dynamic validator.

Example:

```ts
export function ageRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const age = control.value;

    if (age < min || age > max) {
      return {
        invalidRange: true
      };
    }

    return null;
  };
}
```

Use:

```ts
ageRangeValidator(1, 18)
```

---

# 8. FormGroup Custom Validator

Used when validating multiple controls together.

Example:

Password match validator.

```ts
export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return {
      passwordMismatch: true
    };
  }

  return null;
}
```

Use:

```ts
new FormGroup({...}, {
  validators: passwordMatchValidator
})
```

---

# 9. FormArray Custom Validator

Used for validating entire array.

Example:

Minimum 1 child required.

```ts
export function minChildValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control.value;

    if (formArray.length < 1) {
      return {
        minimumChildRequired: true
      };
    }

    return null;
  };
}
```

Use:

```ts
children: new FormArray([], [
  minChildValidator()
])
```

---

# 10. Synchronous vs Asynchronous Validator

## Sync Validator

Immediate validation.

Example:

```ts
Validators.required
```

or custom.

---

## Async Validator

Used for server validation.

Example:

* Username already exists
* Email already registered

Returns Observable or Promise.

---

# 11. Async Validator Example

```ts
import { AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function usernameExistsValidator(): AsyncValidatorFn {
  return (control) => {
    return of(control.value).pipe(
      delay(1000),
      map((value) => {
        return value === 'admin'
          ? { usernameTaken: true }
          : null;
      })
    );
  };
}
```

---

# 12. setValidators()

Dynamically change validators.

```ts
control.setValidators([
  Validators.required
]);
```

Apply:

```ts
control.updateValueAndValidity();
```

---

# 13. clearValidators()

Remove validators.

```ts
control.clearValidators();
control.updateValueAndValidity();
```

---

# 14. Common Interview Questions

Q1. Difference between built-in and custom validators?

Built-in are predefined.
Custom are business-specific.

---

Q2. Difference between FormControl and FormGroup validator?

FormControl → single field.
FormGroup → multiple field relation.

---

Q3. Why AbstractControl?

Because it is the base type for all form controls.

---

Q4. Difference between sync and async validator?

Sync returns immediately.
Async waits for server/process.

---

# 15. Best Practices

✔ Keep validators in separate file
✔ Reuse validators
✔ Use parameterized validators
✔ Keep validation logic clean
✔ Use meaningful error keys

---

# 16. Why do we call custom validator like `childAgeValidator()`?

This is an important interview concept.

When we write:

```ts
childAge: new FormControl('', [
  Validators.required,
  childAgeValidator()
])
```

it may look like the validator runs immediately.

But it does **not** validate immediately.

What happens:

## Step 1: Outer function runs

```ts
childAgeValidator()
```

This outer function only returns another function.

Example:

```ts
export function childAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // actual validation logic
  };
}
```

The outer function is called once.

Its job is to create the validator.

---

## Step 2: Angular stores validator

Angular stores the returned validator function.

It does not execute validation yet.

---

## Step 3: Angular executes later

Angular runs the validator when:

* form initializes
* value changes
* updateValueAndValidity() runs

Then Angular passes:

```ts
control
```

into the validator.

---

## Why this pattern?

It allows parameterized validators.

Example:

```ts
ageRangeValidator(1, 18)
```

Outer function receives config.
Inner function performs validation.

Pattern:

```ts
validatorFactory() -> returns validator function
Angular executes validator later
```

---

# 17. Industry Usage Examples

Password strength
Username uniqueness
Age validation
Date comparison
Salary range validation
File size validation
Phone validation
GST validation
PAN validation
Aadhaar validation

---

# Final Summary

FormControl Validator → single field validation
FormGroup Validator → multiple field validation
FormArray Validator → array validation
Async Validator → server-side validation

Custom validators are heavily asked in Angular interviews and used in production applications.
