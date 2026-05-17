# Angular Reactive Forms - Interview Preparation Guide

A practical interview-focused guide covering FormControl, FormGroup, FormArray, Validators, Custom Validators, Async Validators, and common patterns.

---

# 1. What are Reactive Forms?

Reactive Forms are model-driven forms in Angular.

Form state lives in TypeScript.

Advantages:

* Better control
* Easy validation
* Scalable
* Testable
* Predictable

Import:

```ts
import { ReactiveFormsModule } from '@angular/forms';
```

Standalone component:

```ts
imports: [ReactiveFormsModule]
```

---

# 2. FormControl

Used for a single input.

Example:

```ts
fullName: new FormControl('')
```

With validator:

```ts
fullName: new FormControl('', Validators.required)
```

Value:

```ts
control.value
```

Returns primitive value.

Example:

```ts
'Shivam'
```

Interview:

FormControl manages one form field.

---

# 3. FormGroup

Used to group multiple controls.

Example:

```ts
userForm = new FormGroup({
  fullName: new FormControl(''),
  age: new FormControl('')
})
```

Value:

```ts
userForm.value
```

Returns object.

Example:

```ts
{
  fullName: 'Shivam',
  age: 25
}
```

Interview:

FormGroup manages related controls.

---

# 4. FormArray

Used for dynamic controls.

Example:

```ts
children: new FormArray([])
```

Add:

```ts
this.children.push(childForm)
```

Remove:

```ts
this.children.removeAt(index)
```

Value:

Returns array.

Interview:

FormArray is used for dynamic forms.

---

# 5. Getter for FormArray

Cleaner access.

```ts
get children(): FormArray {
  return this.userForm.get('children') as FormArray;
}
```

Use:

```ts
this.children.push(...)
```

Interview:

Getter avoids repeated type casting.

---

# 6. Built-in Validators

Examples:

```ts
Validators.required
Validators.email
Validators.min(1)
Validators.max(10)
Validators.minLength(3)
Validators.maxLength(10)
Validators.pattern()
```

---

# 7. Custom Validator

Single field custom validation.

Example:

```ts
childAgeValidator()
```

Returns:

```ts
ValidatorFn
```

Use:

```ts
new FormControl('', [childAgeValidator()])
```

Interview:

Custom validators are used for business logic.

---

# 8. FormGroup Validator

Used when comparing fields.

Example:

```ts
passwordMatchValidator
```

Use:

```ts
new FormGroup({...}, {
  validators: passwordMatchValidator
})
```

Interview:

Used for multi-field validation.

---

# 9. FormArray Validator

Used for array-level validation.

Example:

```ts
minChildValidator()
```

Use:

```ts
new FormArray([], [minChildValidator()])
```

Interview:

Used to validate array rules.

---

# 10. Async Validator

Used for API/server validation.

Example:

```ts
usernameExistsValidator()
```

Use:

```ts
new FormControl('', [], [usernameExistsValidator()])
```

Returns:

```ts
Observable<ValidationErrors | null>
```

Interview:

Used for async checks like username availability.

---

# 11. setValue()

Sets all controls.

```ts
this.userForm.setValue({...})
```

Rule:

Must provide all fields.

---

# 12. patchValue()

Sets partial values.

```ts
this.userForm.patchValue({...})
```

Rule:

Partial update allowed.

Interview:

patchValue is safer for partial updates.

---

# 13. reset()

Reset form.

```ts
this.userForm.reset()
```

---

# 14. hasError()

Check errors.

```ts
control.hasError('required')
```

Template:

```html
@if(control?.hasError('required'))
```

Better than:

```ts
control.errors?.['required']
```

---

# 15. touched

Checks if user interacted.

```ts
control.touched
```

Use for showing errors.

---

# 16. dirty

Checks if value changed.

```ts
control.dirty
```

---

# 17. valid / invalid

```ts
control.valid
control.invalid
```

Used for form submission.

Example:

```ts
if(this.userForm.valid)
```

---

# 18. pending

Used in async validators.

```ts
control.pending
```

Example:

Show loading state.

---

# 19. disable submit button

```html
<button [disabled]="userForm.invalid">
```

Best practice.

---

# 20. Dynamic FormArray Structure

Example:

```text
userForm
 └── children (FormArray)
      ├── child 1 (FormGroup)
      ├── child 2 (FormGroup)
```

---

# 21. Template bindings

Root form:

```html
[formGroup]="userForm"
```

FormArray:

```html
formArrayName="children"
```

FormGroup in array:

```html
[formGroupName]="i"
```

Control:

```html
formControlName="childName"
```

---

# 22. Common Errors

Cannot find control with name '0'

Reason:

Missing formArrayName wrapper.

Fix:

```html
<div formArrayName="children">
```

---

# 23. setValue vs patchValue

setValue:

Needs all fields.

patchValue:

Needs only required fields.

Interview:

Use patchValue for edit forms.

---

# 24. Best Practices

✔ Use ReactiveFormsModule
✔ Use getters for nested controls
✔ Keep validators in separate files
✔ Use hasError()
✔ Use touched with error messages
✔ Use patchValue for edit mode
✔ Use FormArray for dynamic data
✔ Use async validators for server checks

---

# 25. Most Asked Interview Questions

What is Reactive Form?
Difference between FormControl and FormGroup?
What is FormArray?
Difference between setValue and patchValue?
What is custom validator?
What is async validator?
Difference between touched and dirty?
Difference between valid and invalid?
Why use FormArray?
How to validate password and confirm password?

---

# Quick Revision

FormControl → single field
FormGroup → multiple fields
FormArray → dynamic fields
Validator → validation logic
Async Validator → API validation
setValue → full update
patchValue → partial update
hasError → check errors
pending → loading state
reset → clear form
