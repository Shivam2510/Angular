# Angular Redirect Routes (Part 1 - Interview Notes)

# What is Redirect Routing?

A **Redirect Route** automatically navigates the user from one URL to another.

Instead of rendering a component, Angular changes the URL to another route.

---

# Simple Definition

> **Redirect Routing is used to automatically navigate users from one route to another without loading a component for the original route.**

---

# Why Do We Need Redirect Routes?

Redirect routes help:

* Set a default page.
* Support old URLs after route changes.
* Improve user experience.
* Maintain backward compatibility.

---

# Real-World Examples

## Default Route

User opens:

```text
/
```

Automatically redirect to:

```text
/home
```

---

## Old URL

Old application:

```text
/products
```

New application:

```text
/store
```

Redirect:

```text
/products
      │
      ▼
/store
```

---

## Dashboard

User opens:

```text
/dashboard-old
```

Automatically redirect to:

```text
/dashboard
```

---

# Folder Structure

```text
redirect/
│
├── home/
├── login/
├── dashboard/
└── redirect.routes.ts
```

---

# Register Feature Route

```ts
{
  path: 'redirect',

  loadChildren: () =>
    import('./redirect/redirect.routes')
      .then(m => m.redirectRoutes)
}
```

---

# Redirect Route Configuration

```ts
import { Routes } from '@angular/router';

export const redirectRoutes: Routes = [

  {
    path: '',

    redirectTo: 'home',

    pathMatch: 'full'
  },

  {
    path: 'home',

    loadComponent: () =>
      import('./home/home')
        .then(m => m.Home)
  },

  {
    path: 'login',

    loadComponent: () =>
      import('./login/login')
        .then(m => m.Login)
  },

  {
    path: 'dashboard',

    loadComponent: () =>
      import('./dashboard/dashboard')
        .then(m => m.Dashboard)
  }

];
```

---

# Redirect to Another Route

```ts
{
    path: '',

    redirectTo: 'home',

    pathMatch: 'full'
}
```

When the user opens:

```text
/redirect
```

Angular changes the URL to:

```text
/redirect/home
```

and then loads:

```text
HomeComponent
```

---

# Redirect Old URLs

```ts
{
    path: 'old-dashboard',

    redirectTo: 'dashboard',

    pathMatch: 'full'
}
```

When the user opens:

```text
/redirect/old-dashboard
```

Angular automatically navigates to:

```text
/redirect/dashboard
```

---

# Navigation Flow

```text
User

/redirect

     │

     ▼

Redirect Route

     │

     ▼

/redirect/home

     │

     ▼

Home Component
```

---

# Why Doesn't Redirect Route Have loadComponent()?

Incorrect:

```ts
{
    path: '',

    redirectTo: 'home',

    loadComponent: ...
}
```

Correct:

```ts
{
    path: '',

    redirectTo: 'home',

    pathMatch: 'full'
}
```

A redirect route **never loads a component**.

Its only responsibility is to change the URL.

---

# Route Execution Flow

```text
User enters URL

        │

        ▼

Angular matches redirect route

        │

        ▼

URL changes

        │

        ▼

Angular matches destination route

        │

        ▼

Destination component loads
```

---

# Best Practices

* Use redirect routes for default pages.
* Redirect deprecated URLs instead of removing them.
* Keep redirect routes near the top of the routing configuration.
* Do not combine `redirectTo` with `loadComponent` or `component`.
* Always define `pathMatch` explicitly.

---

# Common Interview Questions

## What is Redirect Routing?

It automatically redirects users from one route to another before any component is rendered.

---

## Does a redirect route load a component?

No.

A redirect route only changes the URL.

The destination route is responsible for loading the component.

---

## Why use redirect routes?

* Default navigation
* URL migration
* Backward compatibility
* Better user experience

---

## Can redirect routes lazy-load components?

No.

Redirect routes never load components directly.

They redirect to another route, and that destination route may be lazy-loaded.

---

# Quick Revision

```text
User

/redirect

      │

      ▼

Redirect Route

      │

      ▼

/redirect/home

      │

      ▼

HomeComponent
```

---

# One-Line Interview Definition

> **A Redirect Route automatically navigates users from one URL to another without rendering a component, making it useful for default pages, URL migration, and backward compatibility.**
