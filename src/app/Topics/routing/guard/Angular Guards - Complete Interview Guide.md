# Angular Guards (Complete Interview Guide)

# What are Guards?

Guards are Angular functions/classes used to control navigation between routes.

They decide:

* Can user enter route?
* Can user leave route?
* Can child routes load?
* Can data load before component?

---

# Simple Definition

```text
Guards are security checkpoints in Angular routing.
```

---

# Why Guards are Used?

Real-world usage:

* Authentication
* Authorization
* Role-based access
* Unsaved form protection
* Lazy route protection
* Feature access control

---

# Types of Guards

| Guard            | Purpose                     |
| ---------------- | --------------------------- |
| CanActivate      | Controls route entry        |
| CanActivateChild | Controls child route access |
| CanDeactivate    | Controls leaving route      |
| CanMatch         | Controls route matching     |
| Resolve          | Loads data before route     |

---

# Guard Execution Flow

```text
User clicks route
      ↓
CanMatch
      ↓
CanActivate
      ↓
Resolve
      ↓
Component loads
      ↓
CanDeactivate (while leaving)
```

---

# Modern Angular Guard Style

## Old Style

```ts
@Injectable()
export class AuthGuard implements CanActivate {}
```

---

## Modern Style (Recommended)

```ts
export const authGuard: CanActivateFn = () => {}
```

---

# Why Functional Guards?

* Less boilerplate
* Cleaner syntax
* Better tree-shaking
* Uses inject()
* Recommended in Angular 15+

---

# inject() Usage

```ts
const router = inject(Router);
```

Replaces constructor injection inside functional guards.

---

# Route Configuration

```ts
{
  path: 'dashboard',
  canActivate: [authGuard],
  loadComponent: () => import('./dashboard')
}
```

---

# Guard Return Types

| Return              | Meaning             |
| ------------------- | ------------------- |
| true                | Allow navigation    |
| false               | Block navigation    |
| UrlTree             | Redirect navigation |
| Observable<boolean> | Async validation    |
| Promise<boolean>    | Async validation    |

---

# true vs false vs UrlTree

## return true

```ts
return true;
```

Allows route access.

---

## return false

```ts
return false;
```

Blocks navigation silently.

User stays on current page.

---

## return router.createUrlTree()

```ts
return router.createUrlTree(['/login']);
```

Redirects user.

Recommended modern approach.

---

# Why createUrlTree() Instead of navigate()?

## Wrong

```ts
router.navigate(['/login']);
return false;
```

---

## Correct

```ts
return router.createUrlTree(['/login']);
```

---

# Why?

* Angular router handles navigation properly
* Cleaner navigation lifecycle
* Better performance
* Recommended by Angular team

---

# Real Project Examples

## Authentication

```text
/dashboard → only logged-in users
```

---

## Admin Access

```text
/admin → only admin users
```

---

## Unsaved Form

```text
Warn before leaving form page
```

---

## Feature Flag

```text
Temporarily disable feature
```

---

# Signals in Guards

Modern Angular commonly uses:

```ts
isLoggedIn = signal(false);
```

inside services.

Guards can read:

```ts
authService.isLoggedIn()
```

---

# Async Guards Example

```ts
return authService.checkLogin();
```

Can return:

* Observable
* Promise

---

# Important Interview Questions

## Why use guards?

To control routing access and navigation security.

---

## Difference between false and UrlTree?

* false → blocks navigation
* UrlTree → redirects navigation

---

## Why functional guards are preferred?

Less boilerplate and better modern Angular architecture.

---

# Industry Best Practices

* Prefer functional guards
* Prefer createUrlTree()
* Keep auth logic inside services
* Use signals for auth state
* Avoid heavy logic inside guards

---

# One-Line Definition

Angular guards are mechanisms used to allow, block, or redirect route navigation before components load.
