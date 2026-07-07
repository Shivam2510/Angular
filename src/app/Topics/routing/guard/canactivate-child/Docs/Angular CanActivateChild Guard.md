# Angular CanActivateChild Guard (Complete Interview + Implementation Guide)

# What is CanActivateChild?

`CanActivateChild` is an Angular Route Guard used to control access to **all child routes** of a parent route.

Instead of protecting every child route individually, you protect the parent route once.

---

# Simple Definition

> **CanActivateChild determines whether a user can access any child route of a parent route.**

---

# Why Do We Need CanActivateChild?

Suppose we have an Admin section.

```text
/admin
    ├── dashboard
    ├── users
    ├── settings
    ├── reports
    └── roles
```

Every page should be accessible **only to authenticated users**.

---

## Without CanActivateChild

```ts
{
  path: 'dashboard',
  canActivate: [authGuard]
}

{
  path: 'users',
  canActivate: [authGuard]
}

{
  path: 'settings',
  canActivate: [authGuard]
}
```

Problems:

* Duplicate code
* Hard to maintain
* Easy to forget protecting a new child route

---

## With CanActivateChild

```ts
{
  path: '',

  canActivateChild: [canActivateChildGuard],

  children: [
    {
      path: 'dashboard'
    },
    {
      path: 'users'
    },
    {
      path: 'settings'
    }
  ]
}
```

One guard protects every child route.

---

# CanActivate vs CanActivateChild

| CanActivate                 | CanActivateChild          |
| --------------------------- | ------------------------- |
| Protects one route          | Protects all child routes |
| Applied on individual route | Applied on parent route   |
| Used for standalone pages   | Used for feature sections |

---

# Folder Structure

```text
topics/
└── guard/
    └── canactivate-child/
        ├── admin/
        │   ├── admin.ts
        │   ├── admin.html
        │
        ├── dashboard/
        ├── users/
        ├── settings/
        │
        ├── guard/
        │   └── can-activate-child.guard.ts
        │
        └── admin.routes.ts
```

---

# Parent Component

The parent component acts as a **layout**.

```html
<h1>Admin Panel</h1>

<a routerLink="dashboard">Dashboard</a>
<a routerLink="users">Users</a>
<a routerLink="settings">Settings</a>

<router-outlet></router-outlet>
```

---

# Why RouterOutlet?

The parent component needs a place to display child components.

Flow:

```text
App RouterOutlet
       │
       ▼
Admin Component
       │
       ▼
Admin RouterOutlet
       │
       ▼
Dashboard / Users / Settings
```

---

# Child Route Configuration

```ts
export const adminRoutes: Routes = [
  {
    path: '',

    loadComponent: () =>
      import('./admin').then(m => m.Admin),

    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./users/users')
            .then(m => m.Users)
      },

      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings')
            .then(m => m.Settings)
      }

    ]
  }
];
```

---

# Why children?

Instead of creating flat routes:

```text
/admin-dashboard
/admin-users
/admin-settings
```

Angular creates hierarchical routes:

```text
/admin/dashboard
/admin/users
/admin/settings
```

This matches the application's feature structure.

---

# Guard Implementation

```ts
import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const canActivateChildGuard: CanActivateChildFn = () => {

  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
```

---

# Route Configuration with Guard

```ts
{
  path: '',

  canActivateChild: [
    canActivateChildGuard
  ],

  loadComponent: () =>
    import('./admin')
      .then(m => m.Admin),

  children: [
    ...
  ]
}
```

Only one line protects every child route.

---

# Navigation Flow

```text
User
 │
 ▼
/admin/users
 │
 ▼
Parent Route
 │
 ▼
CanActivateChild
 │
 ▼
Authentication Check
 │
 ├── true
 │      │
 │      ▼
 │   Users Component
 │
 └── UrlTree
        │
        ▼
     Redirect
```

---

# Relative Navigation

Inside the parent component:

```html
<a routerLink="dashboard">Dashboard</a>
<a routerLink="users">Users</a>
<a routerLink="settings">Settings</a>
```

These are **relative routes**.

If the current URL is:

```text
/admin
```

Then:

```text
routerLink="dashboard"
```

becomes:

```text
/admin/dashboard
```

---

# Absolute Navigation

```html
<a [routerLink]="['/admin', 'dashboard']">
```

Always starts from the application root.

---

# Relative vs Absolute

| Relative                    | Absolute                    |
| --------------------------- | --------------------------- |
| `routerLink="dashboard"`    | `['/admin', 'dashboard']`   |
| Uses current route          | Uses application root       |
| Best inside feature layouts | Best from global navigation |

---

# CanActivate vs CanActivateChild Flow

## CanActivate

```text
/dashboard
      │
      ▼
CanActivate
      │
      ▼
Dashboard
```

---

## CanActivateChild

```text
/admin
      │
      ├── dashboard
      ├── users
      └── settings
           │
           ▼
CanActivateChild
           │
           ▼
Selected Child Component
```

---

# Real-World Examples

## Admin Portal

```text
/admin/dashboard
/admin/users
/admin/settings
```

---

## HR Portal

```text
/hr/employees
/hr/payroll
/hr/leaves
```

---

## Banking Application

```text
/account/summary
/account/transactions
/account/statements
```

---

# Interview Questions

## What is CanActivateChild?

It protects all child routes of a parent route.

---

## When should you use CanActivateChild?

When multiple child routes require the same authorization logic.

---

## Difference between CanActivate and CanActivateChild?

* CanActivate protects a single route.
* CanActivateChild protects every child route under a parent.

---

## Why use child routes?

To create modular, scalable feature-based routing with shared layouts.

---

## Why use RouterOutlet in the parent component?

Because Angular needs a placeholder where child components will be rendered.

---

## Why use relative routerLink inside a parent layout?

It keeps navigation independent of the parent URL, making the feature easier to move or rename.

---

# Best Practices

* Use feature-based routing.
* Keep parent components as layout components.
* Use `CanActivateChild` instead of repeating `canActivate`.
* Use `loadChildren()` for feature routes.
* Use `loadComponent()` for standalone components.
* Prefer relative navigation inside feature layouts.
* Keep authentication logic inside a dedicated Auth service.

---

# Quick Revision

```text
Parent Route
      │
      ▼
CanActivateChild
      │
      ▼
Dashboard
Users
Settings
Reports
Roles

One Guard
Multiple Child Routes
```

---

# One-Line Interview Definition

> **CanActivateChild is an Angular Route Guard that protects all child routes of a parent route by executing a single authorization check before any child route is activated.**
