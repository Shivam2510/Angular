# Angular Wildcard Route (`**`) - Complete Interview Notes

# What is a Wildcard Route?

A **Wildcard Route** is a special Angular route that matches **every URL that does not match any configured route**.

It is commonly used to display a **404 - Page Not Found** page.

---

# Simple Definition

> **A Wildcard Route catches all unmatched URLs and displays a fallback page, typically a custom 404 page.**

---

# Why Do We Need a Wildcard Route?

Without a wildcard route:

```text
User

/unknown-page

      │

      ▼

Angular

↓

NG04002

Cannot match any routes
```

The application throws a routing error.

---

With a wildcard route:

```text
User

/unknown-page

      │

      ▼

Angular

↓

Wildcard Route (**)

↓

Not Found Component
```

The application displays a friendly 404 page.

---

# Syntax

```ts
{
    path: '**',

    loadComponent: () =>
        import('./components/not-found/not-found')
            .then(m => m.NotFound)
}
```

The special path:

```text
**
```

means:

```text
Match every unmatched URL
```

---

# Folder Structure

```text
wildcard/
│
├── components/
│     ├── home/
│     ├── about/
│     ├── contact/
│     └── not-found/
│
└── wildcard.routes.ts
```

---

# Route Configuration

```ts
import { Routes } from '@angular/router';

export const wildcardRoutes: Routes = [

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
    path: 'about',

    loadComponent: () =>
      import('./components/about/about')
        .then(m => m.About)
  },

  {
    path: 'contact',

    loadComponent: () =>
      import('./components/contact/contact')
        .then(m => m.Contact)
  },

  {
    path: '**',

    loadComponent: () =>
      import('./components/not-found/not-found')
        .then(m => m.NotFound)
  }

];
```

---

# Route Matching Flow

Suppose the user opens:

```text
/wildcard/random-page
```

Angular checks:

```text
home
```

↓

No

↓

```text
about
```

↓

No

↓

```text
contact
```

↓

No

↓

```text
**
```

↓

Yes

↓

NotFoundComponent

---

# Why Must `**` Be the Last Route?

Angular checks routes **from top to bottom**.

Example:

```ts
[
    {
        path: '**',
        loadComponent: ...
    },

    {
        path: 'home',
        loadComponent: ...
    }
]
```

User opens:

```text
/home
```

Angular checks:

```text
**
```

↓

Matches everything

↓

Stops searching

↓

Loads NotFoundComponent

The Home route is never reached.

---

# Correct Order

```ts
[
    {
        path: 'home'
    },

    {
        path: 'about'
    },

    {
        path: 'contact'
    },

    {
        path: '**'
    }
]
```

Angular first checks all valid routes.

Only if none match does it use the wildcard route.

---

# Wildcard vs Redirect

## Redirect Route

```ts
{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
}
```

Purpose:

Redirect users to another valid route.

---

## Wildcard Route

```ts
{
    path: '**',
    loadComponent: ...
}
```

Purpose:

Handle invalid URLs.

---

# Real-World Examples

User opens:

```text
/products123
```

↓

404 Page

---

User opens:

```text
/about-old
```

↓

404 Page

---

User opens:

```text
/random-url
```

↓

404 Page

---

# Best Practices

* Always place the wildcard route last.
* Display a user-friendly 404 page.
* Provide navigation back to the Home page.
* Do not place `**` above valid routes.
* Keep the 404 page simple and informative.

---

# Common Interview Questions

## What is a Wildcard Route?

A special route that matches every unmatched URL.

---

## Why do we use `**`?

To display a custom 404 page instead of Angular's routing error.

---

## Why must the wildcard route be last?

Angular evaluates routes from top to bottom. Since `**` matches every URL, placing it earlier prevents other routes from being reached.

---

## Difference between Redirect and Wildcard?

| Redirect                   | Wildcard               |
| -------------------------- | ---------------------- |
| Redirects to another route | Handles unknown routes |
| Uses `redirectTo`          | Uses `**`              |
| For valid navigation       | For invalid navigation |

---

# Quick Revision

```text
User

/random-page

      │

      ▼

Angular Checks Routes

      │

      ▼

No Match

      │

      ▼

Wildcard (**)

      │

      ▼

404 Page
```

---

# One-Line Interview Definition

> **A Wildcard Route (`**`) catches all unmatched URLs and displays a fallback page, usually a custom 404 page, improving the user experience and preventing routing errors.**
