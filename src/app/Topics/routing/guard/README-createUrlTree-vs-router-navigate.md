# Angular `createUrlTree()` vs `router.navigate()` (Interview Guide)

## Why shouldn't we use `router.navigate()` inside a Guard?

Suppose we have the following guard:

```ts
export const authGuard: CanActivateFn = () => {

  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);

  return false;
};
```

Although this works in many situations, it is **not the recommended approach**.

---

# What Happens Internally?

When the user tries to open:

```text
/dashboard
```

Angular starts a navigation.

```
User clicks
      ↓
Navigation starts
      ↓
CanActivate Guard executes
```

Inside the guard:

```ts
router.navigate(['/login']);
```

starts **another navigation** while the first navigation is still running.

Flow:

```
Navigation 1 (/dashboard)
        ↓
Guard executes
        ↓
router.navigate('/login')
        ↓
Navigation 2 starts
```

Now Angular has two navigations.

This can make the routing lifecycle more complex and is not the recommended pattern.

---

# What does `createUrlTree()` do?

Instead of starting another navigation, we return a **UrlTree**.

```ts
return router.createUrlTree(['/login']);
```

Angular understands that the current navigation should be redirected.

Flow:

```
Navigation starts (/dashboard)
          ↓
Guard executes
          ↓
Returns UrlTree
          ↓
Angular changes destination
          ↓
Navigation continues to /login
```

Only **one navigation** occurs.

---

# Visual Comparison

## Using `router.navigate()`

```
User
  ↓
Navigation → /dashboard
  ↓
Guard
  ↓
router.navigate('/login')
  ↓
Second navigation starts
```

Two navigation cycles.

---

## Using `createUrlTree()`

```
User
  ↓
Navigation → /dashboard
  ↓
Guard
  ↓
return UrlTree
  ↓
Angular redirects
```

Single navigation cycle.

---

# Why Angular Recommends `createUrlTree()`

* Keeps navigation inside the current routing lifecycle.
* Avoids starting a second navigation.
* Cleaner routing flow.
* Better performance.
* Recommended by Angular for guards.

---

# `true` vs `false` vs `UrlTree`

## Return `true`

```ts
return true;
```

Meaning:

* Allow navigation.
* Component loads.

---

## Return `false`

```ts
return false;
```

Meaning:

* Block navigation.
* User stays on the current page.
* No redirect occurs.

Example use cases:

* Feature temporarily disabled
* Maintenance mode
* User cancelled an action

---

## Return `UrlTree`

```ts
return router.createUrlTree(['/login']);
```

Meaning:

* Block current route.
* Redirect to another route.
* Recommended for authentication and authorization.

Example use cases:

* User not logged in
* User does not have permission
* Subscription expired

---

# When Should You Use Each?

### `true`

```
User is authorized.
```

### `false`

```
Navigation should simply stop.
```

### `createUrlTree()`

```
User should be redirected somewhere else.
```

---

# Real Project Examples

### Authentication

```
/dashboard
```

Not logged in?

```
Redirect → /login
```

Use:

```ts
return router.createUrlTree(['/login']);
```

---

### Maintenance Mode

Application feature is disabled.

Use:

```ts
return false;
```

---

### Premium Feature

```
/premium
```

User is not subscribed.

Redirect:

```ts
return router.createUrlTree(['/pricing']);
```

---

# Interview Questions

## Why not use `router.navigate()` inside a guard?

Because it starts a **new navigation** while another navigation is already in progress.

---

## Why use `createUrlTree()`?

Because Angular redirects within the **same navigation lifecycle**, resulting in cleaner and more predictable routing.

---

## Difference between `false` and `createUrlTree()`?

| `false`                    | `createUrlTree()`             |
| -------------------------- | ----------------------------- |
| Blocks navigation          | Redirects navigation          |
| User stays on current page | User is sent to another route |
| No redirect                | Redirect occurs               |

---

# Best Practices

✅ Use `true` to allow navigation.

✅ Use `false` only when navigation should stop without redirecting.

✅ Prefer `return router.createUrlTree(...)` when redirecting.

✅ Avoid calling `router.navigate()` inside guards.

---

# Quick Revision

```
router.navigate()
    ↓
Starts a NEW navigation

createUrlTree()
    ↓
Redirects the CURRENT navigation

Guard Best Practice
-------------------
Allow      → return true
Block      → return false
Redirect   → return router.createUrlTree(...)
```

---

# One-Line Interview Definition

> `createUrlTree()` is preferred over `router.navigate()` inside Angular guards because it redirects the current navigation instead of starting a new one, resulting in a cleaner and more predictable routing lifecycle.
