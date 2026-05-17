# Angular Interview Preparation Notes (Forms + Services + State Management)

This document covers important Angular concepts used in real-world applications and interviews, especially:

* Reactive Forms
* Standalone Components
* Services & Dependency Injection
* BehaviorSubject (State Management)
* Edit vs Create Flow
* RxJS basics
* Signals (`toSignal`, `effect`)

---

# 1. Reactive Forms Basics

Reactive Forms are used for structured and scalable form handling.

## Form Setup

```ts
this.userForm = new FormGroup({
  fullName: new FormControl('', [Validators.required]),
  gender: new FormControl(''),
  occupation: new FormControl(''),
  terms: new FormControl(false),
});
```

## Submit Form

```ts
userDetailSubmit() {
  const user = {
    id: crypto.randomUUID(),
    ...this.userForm.value
  };
}
```

---

# 2. Create vs Edit Logic (VERY IMPORTANT)

## Create Mode

* Generate new ID
* Add new object to list

```ts
id: crypto.randomUUID()
```

## Edit Mode

* Use existing ID
* Update existing object

```ts
id: selectedUser.id
```

---

# 3. Why NOT create new object in edit?

Because:

* ID represents identity
* New ID = new record
* Same ID = update existing record

---

# 4. Service State Management (BehaviorSubject)

## Store Data

```ts
private userData = new BehaviorSubject<userData[]>([]);
public userData$ = this.userData.asObservable();
```

## Add Data

```ts
setUserData(user: userData) {
  this.userData.next([...this.userData.value, user]);
}
```

## Update Data

```ts
updateUserDetails(updatedUser: userData) {
  const updatedList = this.userData.value.map(user =>
    user.id === updatedUser.id ? updatedUser : user
  );

  this.userData.next(updatedList);
}
```

---

# 5. Edit Flow (Component Communication)

## Step Flow

1. Click Edit
2. Store selected user in service
3. Form receives data
4. patchValue() fills form

## Service

```ts
private selectedUser = new BehaviorSubject<userData | null>(null);
selectedUser$ = this.selectedUser.asObservable();

editUser(user: userData) {
  this.selectedUser.next(user);
}

clearSelectedUser() {
  this.selectedUser.next(null);
}
```

---

# 6. Patch Form Data

## Correct way

```ts
this.userService.selectedUser$.subscribe(user => {
  if (user) {
    this.userForm.patchValue(user);
  }
});
```

## Why patchValue?

* Works even if partial data
* Avoids strict field mismatch errors

---

# 7. Angular Error NG01002

Cause:

* setValue() used with missing fields
* wrong object passed

Fix:

```ts
patchValue()
```

---

# 8. RxJS Operators (Important for Interviews)

## map

Transform data

## filter

Filter data

## tap

Debug/logging

## switchMap

API chaining

## debounceTime

Delay input handling

---

# 9. async pipe (Best Practice)

```html
@for (user of users$ | async; track user.id) {
}
```

Benefits:

* Auto subscribe
* Auto unsubscribe

---

# 10. Signals (Modern Angular)

## Convert Observable → Signal

```ts
selectedUser = toSignal(this.userService.selectedUser$);
```

## React to changes

```ts
effect(() => {
  const user = this.selectedUser();

  if (user) {
    this.userForm.patchValue(user);
  }
});
```

---

# 11. NG0203 Error (Injection Context)

## Cause

* using effect/toSignal in wrong place

## Fix

* field initializer OR constructor

---

# 12. When to clear selected user?

After update:

```ts
this.clearSelectedUser();
```

Why?

* Prevent accidental re-edit
* Reset form mode

---

# 13. Best Industry Approach Summary

| Use Case      | Approach        |
| ------------- | --------------- |
| UI display    | async pipe      |
| State logic   | BehaviorSubject |
| Modern state  | Signals         |
| Edit form     | patchValue      |
| Update record | map()           |

---

# 14. Key Interview Concepts

* Why immutability matters
* Difference between setValue & patchValue
* BehaviorSubject vs Observable
* Signals vs RxJS
* Edit vs Create flow
* Injection context errors

---

# FINAL RULE

👉 Never create new ID in edit mode
👉 Always update existing record
👉 Always prefer immutable update (map)
👉 Use patchValue for forms
