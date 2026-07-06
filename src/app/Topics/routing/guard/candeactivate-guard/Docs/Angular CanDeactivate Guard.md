# Angular CanDeactivate Guard (Complete Interview Notes)

## What is CanDeactivate?

`CanDeactivate` is an Angular Route Guard that decides **whether a user can leave the current route before navigation occurs**.

Unlike `CanActivate`, which controls **entering** a route, `CanDeactivate` controls **leaving** a route.

---

# Simple Definition

> **CanDeactivate is used to prevent users from leaving a page when there are unsaved changes or when navigation should be confirmed.**

---

# Real-World Use Cases

* Unsaved Reactive Forms
* Edit Profile Page
* Employee Edit Screen
* Product Edit Screen
* Blog Editor
* Settings Page

Example:

```text
User edits profile
       ↓
Clicks Home
       ↓
CanDeactivate Guard runs
       ↓
Show confirmation dialog
       ↓
Leave / Stay
```

---

# CanActivate vs CanDeactivate

| CanActivate                 | CanDeactivate                      |
| --------------------------- | ---------------------------------- |
| Controls entering a route   | Controls leaving a route           |
| Runs before component loads | Runs before component is destroyed |
| Authentication              | Unsaved changes                    |

---

# Folder Structure

```text
topics/
└── guards/
    ├── guards/
    │   └── can-deactivate.guard.ts
    ├── interfaces/
    │   └── can-deactivate.interface.ts
    └── user-edit/
```

---

# Step 1: Create Interface

## can-deactivate.interface.ts

```ts
export interface CanDeactivateComponent {
  canDeactivate(): boolean;
}
```

---

# Why Create an Interface?

The interface creates a **contract**.

Any component implementing this interface **must provide** a `canDeactivate()` method.

Example:

```ts
export class UserEdit
implements CanDeactivateComponent {

    canDeactivate(): boolean {
        return true;
    }

}
```

---

# Why Not Skip the Interface?

Without the interface:

```ts
CanDeactivateFn<UserEdit>
```

works only for one component.

With the interface:

```ts
CanDeactivateFn<CanDeactivateComponent>
```

the same guard can protect:

* Edit User
* Edit Employee
* Edit Product
* Edit Customer
* Edit Profile

One reusable guard.

---

# Step 2: Create Guard

```ts
import { CanDeactivateFn } from '@angular/router';
import { CanDeactivateComponent } from '../interfaces/can-deactivate.interface';

export const canDeactivateGuard:
CanDeactivateFn<CanDeactivateComponent> =
(component) => {

    return component.canDeactivate();

};
```

---

# Understanding

Angular automatically passes the **current component instance** to the guard.

Example:

```text
Current Page

UserEditComponent
        ↓
Angular passes it
        ↓
component.canDeactivate()
```

---

# What Does `implements` Do?

```ts
implements CanDeactivateComponent
```

does **NOT** connect the guard.

It only tells TypeScript:

> "This class has a `canDeactivate()` method."

The actual connection happens in the route configuration.

---

# Route Configuration

```ts
{
    path: 'edit-user',

    canDeactivate: [canDeactivateGuard],

    loadComponent: () =>
        import('./user-edit/user-edit')
            .then(m => m.UserEdit)
}
```

---

# Component Implementation

```ts
export class UserEdit
implements CanDeactivateComponent {

    protected userForm = new FormGroup({
        fullName: new FormControl(''),
        email: new FormControl('')
    });

    canDeactivate(): boolean {

        if (!this.userForm.dirty) {
            return true;
        }

        return confirm(
            'You have unsaved changes. Do you really want to leave?'
        );

    }

}
```

---

# Why `!dirty`?

## Form NOT Modified

```text
dirty = false
```

Return

```ts
true
```

Leave page immediately.

---

## Form Modified

```text
dirty = true
```

Show confirmation dialog.

```text
OK
```

↓

```ts
true
```

Leave.

```text
Cancel
```

↓

```ts
false
```

Stay.

---

# Why `markAsPristine()`?

After saving:

```ts
this.userForm.markAsPristine();
```

Angular changes

```text
dirty = false
```

Now leaving the page does **not** show the confirmation dialog.

---

# Navigation Flow

```text
User opens Edit Page
        ↓
Changes form
        ↓
Clicks Home
        ↓
Angular detects navigation
        ↓
CanDeactivate Guard executes
        ↓
component.canDeactivate()
        ↓
true / false
```

---

# CanDeactivate Return Types

```ts
true
```

Allow navigation.

---

```ts
false
```

Block navigation.

---

```ts
Observable<boolean>
```

Used with dialogs.

---

```ts
Promise<boolean>
```

Async validation.

---

# Basic vs Industry Approach

## Learning

```ts
confirm(...)
```

Simple browser dialog.

---

## Production

Angular Material Dialog

```text
Leave without saving?

Yes
No
```

Returns:

```ts
Observable<boolean>
```

---

# Why Use an Interface?

Without Interface

```text
Guard
   ↓
UserEdit only
```

With Interface

```text
Guard
   ├── UserEdit
   ├── EmployeeEdit
   ├── ProductEdit
   ├── CustomerEdit
   └── ProfileEdit
```

One guard works for all.

---

# Common Interview Questions

### What is CanDeactivate?

Used to prevent users from leaving a route when there are unsaved changes.

---

### When does CanDeactivate execute?

Before leaving the current route.

---

### Why use an interface?

To create a reusable contract so one guard can work with multiple components.

---

### What does `implements` do?

It enforces that the component provides the required `canDeactivate()` method.

---

### What is `CanDeactivateFn<T>`?

`CanDeactivateFn` is Angular's functional guard type.

The generic `<T>` specifies the type of component the guard protects.

Example:

```ts
CanDeactivateFn<CanDeactivateComponent>
```

This tells TypeScript that the component has a `canDeactivate()` method.

---

### Why use `markAsPristine()`?

After saving, the form should no longer be considered modified.

This prevents unnecessary confirmation dialogs.

---

# Best Practices

✅ Use functional guards.

✅ Create a reusable interface.

✅ Keep business logic inside the component.

✅ Keep the guard simple.

✅ Use `confirm()` only for learning.

✅ Use Angular Material Dialog (or a custom dialog) in production.

---

# Quick Revision

```text
User edits form
        ↓
dirty = true
        ↓
Clicks another route
        ↓
CanDeactivate Guard
        ↓
component.canDeactivate()
        ↓
true  → Leave

false → Stay
```

---

# One-Line Interview Definition

> **CanDeactivate is an Angular Route Guard that determines whether a user can leave the current route, commonly used to prevent accidental navigation when there are unsaved changes.**
