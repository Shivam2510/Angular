# Angular Navigation Extras - relativeTo (Complete Interview Notes)

# What is relativeTo?

`relativeTo` is a Navigation Extra that tells Angular to **resolve the navigation relative to the current active route** instead of starting from the application's root.

Without `relativeTo`

```ts
this.router.navigate([
  '/routing-demo/navigation/users'
]);
```

With `relativeTo`

```ts
this.router.navigate(
  ['../users'],
  {
    relativeTo: this.route
  }
);
```

---

# Simple Definition

> **relativeTo tells Angular where to start resolving a navigation path. Instead of beginning from the application root, Angular starts from the current activated route.**

---

# Why Do We Need relativeTo?

Suppose the current URL is

```text
/routing-demo/navigation/home
```

You want to navigate to

```text
/routing-demo/navigation/users
```

There are two approaches.

---

# Absolute Navigation

```ts
this.router.navigate([
  '/routing-demo/navigation/users'
]);
```

Angular starts from the application root.

Visual

```text
Application Root

↓

routing-demo

↓

navigation

↓

users
```

Works perfectly but requires the complete path.

---

# Relative Navigation

```ts
this.router.navigate(
  ['../users'],
  {
    relativeTo: this.route
  }
);
```

Angular starts from the current route.

Current Route

```text
/routing-demo/navigation/home
```

↓

Move one level up

```text
/routing-demo/navigation
```

↓

Append

```text
users
```

↓

Final URL

```text
/routing-demo/navigation/users
```

---

# Absolute vs Relative Navigation

## Absolute Navigation

```ts
this.router.navigate([
  '/routing-demo/navigation/about'
]);
```

Starts from the application root.

---

## Relative Navigation

```ts
this.router.navigate(
  ['../about'],
  {
    relativeTo: this.route
  }
);
```

Starts from the current route.

---

# Folder Analogy

Think of Angular routes like folders.

Current folder

```text
navigation/

home
```

To move to

```text
users
```

Instead of writing

```text
C:\Projects\App\navigation\users
```

you simply write

```text
../users
```

Angular routing follows the same concept.

---

# Required Imports

```ts
import { Router, ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
```

Inject both services.

```ts
private router = inject(Router);

private route = inject(ActivatedRoute);
```

---

# Basic Implementation

```ts
protected goToUsersRelative(): void {

  this.router.navigate(
    ['../users'],
    {
      relativeTo: this.route
    }
  );

}
```

---

# Navigation Flow

```text
Current Route

/routing-demo/navigation/home

        │

        ▼

relativeTo

        │

        ▼

../users

        │

        ▼

Angular Resolves

        │

        ▼

/routing-demo/navigation/users
```

---

# Common Relative Paths

## Current Route

```ts
['./']
```

Represents the current route.

---

## Parent Route

```ts
['../']
```

Moves one level up.

---

## Parent Then Child

```ts
['../users']
```

Moves to the parent route and then into the `users` route.

---

## Child Route

```ts
['details']
```

Navigates to a child route of the current route.

Example

Current URL

```text
/users
```

Navigation

```ts
['details']
```

Result

```text
/users/details
```

---

# Another Example

Current URL

```text
/products/details
```

Navigation

```ts
this.router.navigate(
  ['../reviews'],
  {
    relativeTo: this.route
  }
);
```

Result

```text
/products/reviews
```

---

# Why Use relativeTo?

Imagine your application's base route changes.

Today

```text
/routing-demo/navigation/users
```

Tomorrow

```text
/app/navigation/users
```

With absolute navigation, every hardcoded path must be updated.

With relative navigation, Angular calculates the path automatically from the current route.

This makes applications easier to maintain.

---

# Real-World Use Cases

* Child Routes
* Nested Routes
* Dashboard Modules
* Feature Modules
* Wizard Navigation
* Admin Panels

It is especially useful in applications with deep routing hierarchies.

---

# relativeTo vs Absolute Navigation

| Absolute Navigation          | relativeTo                        |
| ---------------------------- | --------------------------------- |
| Starts from application root | Starts from current route         |
| Requires full path           | Uses relative path                |
| More hardcoded               | More maintainable                 |
| Best for unrelated routes    | Best for sibling and child routes |

---

# Best Practices

* Use absolute navigation for global navigation (e.g., Home, Login, Dashboard).
* Use `relativeTo` inside feature modules and nested routing.
* Prefer relative navigation when moving between sibling or child routes.
* Avoid hardcoding long route paths when a relative path is sufficient.

---

# Common Interview Questions

## What is relativeTo?

A Navigation Extra that tells Angular to resolve navigation relative to the current activated route.

---

## When should you use relativeTo?

When navigating between sibling routes, child routes, or nested routes.

---

## What is the difference between absolute and relative navigation?

Absolute navigation starts from the application root.

Relative navigation starts from the current activated route.

---

## Why is relativeTo useful?

It reduces hardcoded paths and makes routing easier to maintain if the application's route structure changes.

---

## What do `./` and `../` mean?

Just like file system paths:

* `./` → Current route
* `../` → Parent route

---

# Common Mistakes

❌ Using `relativeTo` without injecting `ActivatedRoute`.

```ts
private route = inject(ActivatedRoute);
```

is required.

---

❌ Confusing `relativeTo` with `routerLink`.

`relativeTo` is a **Navigation Extra** used with `router.navigate()`.

---

❌ Using absolute paths when relative navigation is more appropriate.

---

# Quick Revision

```text
Current Route

/routing-demo/navigation/home

        │

        ▼

['../users']

        │

        ▼

relativeTo

        │

        ▼

/routing-demo/navigation/users
```

---

# One-Line Interview Definition

> **`relativeTo` is a Navigation Extra that tells Angular to resolve navigation relative to the current activated route instead of the application root, making navigation within nested routes cleaner and easier to maintain.**
