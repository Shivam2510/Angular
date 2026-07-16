# Angular Navigation Extras - replaceUrl (Complete Interview Notes)

# What is replaceUrl?

`replaceUrl` is a Navigation Extra that tells Angular to **replace the current browser history entry** instead of creating a new one during navigation.

Basic navigation:

```ts
this.router.navigate(['/users']);
```

Navigation with `replaceUrl`:

```ts
this.router.navigate(
  ['/users'],
  {
    replaceUrl: true
  }
);
```

---

# Simple Definition

> **replaceUrl replaces the current entry in the browser history instead of pushing a new entry onto the history stack.**

---

# Understanding Browser History

Suppose the user visits:

```text
Home

↓

Users

↓

About
```

Browser History

```text
Home

↓

Users

↓

About
```

Current Page

```text
About
```

Press

```text
← Back
```

↓

```text
Users
```

Press

```text
← Back
```

↓

```text
Home
```

This is the browser's normal history behavior.

---

# Normal Angular Navigation

```ts
this.router.navigate(['/home']);
```

History

```text
Home
```

---

```ts
this.router.navigate(['/users']);
```

History

```text
Home

↓

Users
```

---

```ts
this.router.navigate(['/about']);
```

History

```text
Home

↓

Users

↓

About
```

Every navigation creates a **new history entry**.

---

# Navigation with replaceUrl

Suppose the current page is

```text
Users
```

Now navigate using

```ts
this.router.navigate(
  ['/about'],
  {
    replaceUrl: true
  }
);
```

History becomes

```text
Home

↓

About
```

Notice

```text
Users
```

is removed.

It has been replaced.

---

# Visual Comparison

## Normal Navigation

```text
Home

↓

Users

↓

About
```

History

```text
Home

↓

Users

↓

About
```

Back Button

```text
About

↓

Users

↓

Home
```

---

## replaceUrl

```text
Home

↓

Users
```

Navigate

```ts
replaceUrl: true
```

↓

History

```text
Home

↓

About
```

Back Button

```text
About

↓

Home
```

The **Users** entry no longer exists.

---

# Implementation

```ts
protected goToUsersReplaceUrl(): void {

  this.router.navigate(
    ['/routing-demo/navigation/users'],
    {
      replaceUrl: true
    }
  );

}
```

---

# Testing

Current Page

```text
Home
```

↓

Click

```text
Users (replaceUrl)
```

↓

Current URL

```text
/users
```

↓

Press

```text
← Back
```

Expected

The browser skips the replaced history entry.

If Home was the replaced entry, Back goes to the page before Home (or exits the application if there is no previous history).

---

# Real-World Use Cases

## Login

```text
Login

↓

Dashboard
```

After successful login, users should not return to the Login page.

```ts
this.router.navigate(
  ['/dashboard'],
  {
    replaceUrl: true
  }
);
```

---

## Logout

```text
Dashboard

↓

Login
```

Replace Dashboard so the user cannot return using the Back button.

---

## OTP Verification

```text
OTP

↓

Dashboard
```

Prevent returning to the OTP page.

---

## Password Reset

```text
Reset Password

↓

Login
```

Prevent returning to the reset page.

---

## Payment Success

```text
Checkout

↓

Payment

↓

Success
```

Avoid accidental payment resubmission when the Back button is pressed.

---

# replaceUrl vs Normal Navigation

| Normal Navigation                      | replaceUrl                     |
| -------------------------------------- | ------------------------------ |
| Adds new history entry                 | Replaces current history entry |
| Back returns to previous Angular route | Back skips the replaced route  |
| Default behavior                       | Special navigation behavior    |

---

# Can replaceUrl be combined with other Navigation Extras?

Yes.

Example

```ts
this.router.navigate(
  ['/users'],
  {
    queryParams: {
      page: 1
    },
    replaceUrl: true
  }
);
```

Result

```text
/users?page=1
```

The current history entry is replaced while also adding query parameters.

---

# Best Practices

* Use after successful login.
* Use after logout.
* Use after OTP verification.
* Use after password reset.
* Use after payment success.
* Avoid using it for normal application navigation where users expect the Back button to work.

---

# Common Interview Questions

## What is replaceUrl?

A Navigation Extra that replaces the current browser history entry instead of adding a new one.

---

## Does replaceUrl change the URL?

Yes.

The browser navigates to the new URL.

The difference is only in how browser history is updated.

---

## When should replaceUrl be used?

* Login
* Logout
* OTP verification
* Password reset
* Payment success
* One-time redirect flows

---

## Can replaceUrl be used with queryParams?

Yes.

```ts
this.router.navigate(
  ['/users'],
  {
    queryParams: {
      page: 1
    },
    replaceUrl: true
  }
);
```

---

# Common Mistakes

❌ Thinking `replaceUrl` prevents navigation.

It still navigates normally.

---

❌ Thinking `replaceUrl` hides the URL.

It does not.

Only the browser history behavior changes.

---

❌ Confusing `replaceUrl` with `skipLocationChange`.

* `replaceUrl` **updates the URL** and **replaces the current history entry**.
* `skipLocationChange` **navigates without updating the browser's address bar**.

---

# Quick Revision

```text
Normal Navigation

Home

↓

Users

↓

About

History

Home

↓

Users

↓

About


--------------------------------


replaceUrl

Home

↓

Users

↓

About

History

Home

↓

About

Users removed
```

---

# One-Line Interview Definition

> **`replaceUrl` is a Navigation Extra that replaces the current browser history entry during navigation, preventing users from returning to the previous page using the browser Back button.**
