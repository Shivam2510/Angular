# Angular CanActivate Guard (Complete Interview + Implementation Guide)

# What is CanActivate?

CanActivate is an Angular route guard used to control whether a route can open before the component loads.

---

# Simple Definition

```text
CanActivate decides whether user can access a route.
```

---

# Real-World Use Cases

* Login protection
* Dashboard access
* Admin pages
* Role-based access
* Subscription checks

---

# Modern Functional Guard

## auth.guard.ts

```ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
```

---

# Explanation

## inject(Auth)

Gets service instance inside functional guard.

---

## return true

```ts
return true;
```

Allows navigation.

---

## return false

```ts
return false;
```

Blocks navigation silently.

User stays on current page.

---

## return createUrlTree()

```ts
return router.createUrlTree(['/login']);
```

Redirects navigation.

Modern best practice.

---

# Why createUrlTree()?

## Wrong Approach

```ts
router.navigate(['/login']);
return false;
```

---

## Correct Approach

```ts
return router.createUrlTree(['/login']);
```

---

# Why?

* Angular router manages navigation lifecycle properly
* Cleaner implementation
* Better performance
* Recommended by Angular

---

# Route Configuration

```ts
{
  path: 'dashboard',
  canActivate: [authGuard],

  loadComponent: () =>
    import('./dashboard/dashboard')
      .then(m => m.Dashboard)
}
```

---

# Meaning of canActivate

```text
Before opening dashboard
→ run authGuard
```

---

# Fake Auth Service Example

```ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  isLoggedIn = signal(false);

  login(): void {
    this.isLoggedIn.set(true);
  }

  logout(): void {
    this.isLoggedIn.set(false);
  }
}
```

---

# Why Signals?

Modern Angular reactive state management.

```ts
isLoggedIn()
```

reads signal value.

---

# Full Flow

```text
User opens /dashboard
        ↓
CanActivate runs
        ↓
Check login state
        ↓
true → allow
false → block
UrlTree → redirect
```

---

# false vs UrlTree

| Return  | Behavior       |
| ------- | -------------- |
| true    | Allow route    |
| false   | Block route    |
| UrlTree | Redirect route |

---

# Real Project Examples

## Dashboard Protection

```text
/dashboard
```

Only authenticated users allowed.

---

## Admin Route

```text
/admin
```

Only admin users allowed.

---

## Subscription Feature

```text
/premium-feature
```

Only premium users allowed.

---

# Old vs Modern Guard

| Old              | Modern           |
| ---------------- | ---------------- |
| Class guard      | Functional guard |
| constructor DI   | inject()         |
| More boilerplate | Cleaner          |

---

# Common Interview Questions

## What is CanActivate?

Used to allow or block route access before component loads.

---

## Why use createUrlTree()?

Because it provides proper Angular-controlled redirection.

---

## Difference between false and UrlTree?

* false blocks navigation
* UrlTree redirects navigation

---

## Why functional guards are preferred?

Cleaner syntax and better Angular modern architecture.

---

# Best Practices

* Use functional guards
* Keep logic minimal
* Move auth logic to service
* Prefer createUrlTree()
* Use signals for auth state

---

# One-Line Definition

CanActivate is an Angular route guard used to allow, block, or redirect route access before a component loads.
