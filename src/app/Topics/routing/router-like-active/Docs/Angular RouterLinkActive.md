# Angular RouterLinkActive - Complete Interview Notes

# What is RouterLinkActive?

`RouterLinkActive` is a built-in Angular directive that **automatically adds or removes CSS classes** based on whether the associated route is currently active.

It is commonly used to highlight the active navigation link.

---

# Simple Definition

> **RouterLinkActive automatically applies a CSS class when the associated routerLink matches the current URL.**

---

# Why Do We Need RouterLinkActive?

Without `RouterLinkActive`, we would manually check the current URL.

Example:

```ts
if (this.router.url === '/users') {
  // Add active class
}
```

As the number of navigation links grows, this becomes difficult to maintain.

With `RouterLinkActive`, Angular performs this automatically.

---

# Real-World Use Cases

* Sidebar navigation
* Top navigation menu
* Admin dashboard
* Mobile navigation
* Breadcrumbs

Almost every Angular application uses `RouterLinkActive`.

---

# Folder Structure

```text
router-link-active/
│
├── components/
│     ├── home/
│     ├── users/
│     └── about/
│
└── router-link-active.routes.ts
```

---

# Route Configuration

```ts
import { Routes } from '@angular/router';

export const routerLinkActiveRoutes: Routes = [

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

# Basic Usage

```html
<a
  routerLink="../home"
  routerLinkActive="active">
  Home
</a>
```

When the current route is:

```text
/home
```

Angular automatically renders:

```html
<a class="active">
  Home
</a>
```

---

# Multiple Navigation Links

```html
<nav>

  <a
    routerLink="../home"
    routerLinkActive="active">
    Home
  </a>

  <a
    routerLink="../users"
    routerLinkActive="active">
    Users
  </a>

  <a
    routerLink="../about"
    routerLinkActive="active">
    About
  </a>

</nav>
```

Angular automatically determines which link should receive the `active` class.

---

# Required Imports

Standalone components must import:

```ts
imports: [

  RouterLink,

  RouterLinkActive

]
```

---

# CSS Example

```css
nav{
  display:flex;
  gap:20px;
}

a{
  text-decoration:none;
  color:black;
  padding:10px;
}

.active{
  background:royalblue;
  color:white;
  font-weight:bold;
}
```

---

# Navigation Flow

```text
User Clicks

Users

      │

      ▼

Angular Router

      │

      ▼

Current URL

/users

      │

      ▼

Compare routerLink

      │

 ┌────┴─────┐
 │          │
Match    No Match
 │          │
 ▼          ▼
Add      Remove
active   active
```

---

# Internal Working

Whenever navigation completes:

```text
NavigationEnd

↓

Current URL

↓

Compare every routerLink

↓

Add / Remove CSS class
```

No TypeScript code is required.

---

# Advantages

* No manual URL comparison.
* Cleaner templates.
* Automatic active state handling.
* Works with nested routing.
* Easy to style using CSS.

---

# Best Practices

* Use `RouterLinkActive` for all navigation menus.
* Keep active styles consistent throughout the application.
* Combine with `RouterLinkActiveOptions` when exact matching is required.
* Avoid manually comparing `router.url` for navigation highlighting.

---

# Common Interview Questions

## What is RouterLinkActive?

A directive that automatically adds a CSS class to a link when its route is active.

---

## Why use RouterLinkActive?

To visually highlight the current navigation item without writing custom TypeScript logic.

---

## Does RouterLinkActive require TypeScript?

No.

It works entirely in the template.

---

## Which module/directive must be imported?

For standalone components:

```ts
RouterLink
RouterLinkActive
```

---

## Can RouterLinkActive apply any CSS class?

Yes.

Example:

```html
routerLinkActive="active"
```

or

```html
routerLinkActive="selected"
```

or

```html
routerLinkActive="current-page"
```

Any valid CSS class name can be used.

---

# Quick Revision

```text
Current URL

/users

      │

      ▼

routerLinkActive

      │

      ▼

Users Link

↓

class="active"
```

---

# One-Line Interview Definition

> **RouterLinkActive is an Angular directive that automatically adds or removes CSS classes based on whether the associated routerLink matches the currently active route.**
