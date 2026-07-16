# Angular Programmatic Navigation (Part 1) - Complete Interview Notes

# What is Programmatic Navigation?

Programmatic Navigation means navigating between routes using **TypeScript code** instead of HTML.

Instead of:

```html
<a routerLink="/users">Users</a>
```

we navigate using:

```ts
this.router.navigate(['/users']);
```

---

# Simple Definition

> **Programmatic Navigation allows navigation between routes from TypeScript using Angular's Router service.**

---

# Why Do We Need Programmatic Navigation?

Sometimes navigation is triggered by application logic rather than a user clicking a link.

Examples:

* Login successful
* Registration successful
* Save form
* Delete record
* Logout
* Payment completed
* API success response

These situations cannot use `routerLink`.

---

# Real-World Examples

## Login

```text
User Login

      │

      ▼

API Success

      │

      ▼

Dashboard
```

---

## Save Employee

```text
Save Employee

      │

      ▼

API Success

      │

      ▼

Employee List
```

---

## Logout

```text
Logout

      │

      ▼

Clear Token

      │

      ▼

Login Page
```

---

# Router Service

Angular provides navigation through the **Router** service.

Modern Angular (v15+):

```ts
private router = inject(Router);
```

Older Angular:

```ts
constructor(
    private router: Router
) {}
```

Modern Angular prefers `inject()` in standalone components and functional APIs.

---

# Basic Navigation

```ts
this.router.navigate([
    '/routing-demo/navigation/users'
]);
```

Angular updates the URL and loads the matching component.

---

# Folder Structure

```text
navigation/
│
├── components/
│     ├── home/
│     ├── users/
│     └── about/
│
└── navigation.routes.ts
```

---

# Route Configuration

```ts
import { Routes } from '@angular/router';

export const navigationRoutes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home')
        .then(m => m.Home)
  },

  {
    path: 'users',
    loadComponent: () =>
      import('./components/users/users')
        .then(m => m.Users)
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about')
        .then(m => m.About)
  }

];
```

---

# Home Component

```ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.html'
})
export class Home {

  private router = inject(Router);

  protected goToUsers(): void {

    this.router.navigate([
      '/routing-demo/navigation/users'
    ]);

  }

  protected goToAbout(): void {

    this.router.navigate([
      '/routing-demo/navigation/about'
    ]);

  }

}
```

---

# Home Template

```html
<h1>Home Page</h1>

<button (click)="goToUsers()">
    Navigate to Users
</button>

<br><br>

<button (click)="goToAbout()">
    Navigate to About
</button>
```

---

# Navigation Flow

```text
Button Click

      │

      ▼

Router.navigate()

      │

      ▼

Angular Router

      │

      ▼

URL Changes

      │

      ▼

Matching Component Loads
```

---

# Why Does navigate() Accept an Array?

```ts
this.router.navigate([
    'users'
]);
```

Angular treats every array item as a URL segment.

---

Example

```ts
this.router.navigate([
    'users',
    10
]);
```

Result:

```text
/users/10
```

---

Another Example

```ts
this.router.navigate([
    'employee',
    100,
    'details'
]);
```

Result:

```text
/employee/100/details
```

This approach avoids manual string concatenation and is ideal for dynamic routes.

---

# Absolute Navigation

```ts
this.router.navigate([
    '/users'
]);
```

Starts from the application root.

---

# Dynamic Navigation

```ts
const userId = 5;

this.router.navigate([
    '/users',
    userId
]);
```

Result:

```text
/users/5
```

---

# Router.navigate() vs routerLink

## routerLink

```html
<a routerLink="/users">
    Users
</a>
```

Used in templates.

---

## navigate()

```ts
this.router.navigate([
    '/users'
]);
```

Used in TypeScript.

---

# When Should You Use navigate()?

* Login success
* Logout
* Save operation
* Delete operation
* API success callback
* Conditional navigation
* Button click handled in TypeScript

---

# Advantages

* Navigation from business logic.
* Dynamic route generation.
* Supports route parameters.
* Supports query parameters.
* Supports navigation extras.
* Clean integration with API responses.

---

# Best Practices

* Prefer `inject(Router)` in modern Angular.
* Use `navigate()` for dynamic navigation.
* Avoid string concatenation when building URLs.
* Pass route segments as an array.

---

# Common Interview Questions

## What is Programmatic Navigation?

Navigation performed using Angular's `Router` service from TypeScript.

---

## What is the difference between routerLink and navigate()?

| routerLink        | navigate()         |
| ----------------- | ------------------ |
| Template          | TypeScript         |
| User clicks link  | Business logic     |
| Static navigation | Dynamic navigation |

---

## Why use inject(Router)?

Modern Angular recommends `inject()` instead of constructor injection in standalone components and functional APIs.

---

## Why does navigate() use an array?

Angular treats each array element as a route segment, making it easier and safer to build dynamic URLs.

---

# Quick Revision

```text
Button Click

      │

      ▼

Router.navigate()

      │

      ▼

Angular Router

      │

      ▼

Route Match

      │

      ▼

Component Loads
```

---

# One-Line Interview Definition

> **Programmatic Navigation uses Angular's Router service to navigate between routes from TypeScript, making it ideal for navigation triggered by application logic such as login, form submission, or API responses.**
