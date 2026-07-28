# Angular CanMatch Guard (Complete Interview Notes)

# What is CanMatch?

`CanMatch` is an Angular Route Guard that decides **whether Angular should match a route before it is activated or lazy-loaded**.

Unlike `CanActivate`, `CanMatch` executes **before route matching is finalized**.

---

# Simple Definition

> **CanMatch determines whether a route is eligible to be matched. If not, Angular continues searching for another matching route.**

---

# Why Do We Need CanMatch?

Suppose two users access the same URL.

```text
/dashboard
```

Admin should see:

```text
Admin Dashboard
```

User should see:

```text
User Dashboard
```

`CanMatch` allows Angular to choose the correct route.

---

# CanActivate vs CanMatch

| CanActivate                 | CanMatch                                           |
| --------------------------- | -------------------------------------------------- |
| Runs after route is matched | Runs before route is matched                       |
| Decides if user can enter   | Decides if Angular should use the route            |
| Stops navigation when false | Skips the route and checks the next matching route |

---

# Real-World Use Cases

* Role-based routing
* Feature flags
* Premium features
* A/B testing
* Conditional lazy loading

---

# Folder Structure

```text
can-match/
│
├── admin-dashboard/
├── user-dashboard/
├── guards/
│     ├── admin-match.guard.ts
│     └── user-match.guard.ts
│
├── services/
│     └── role.service.ts
│
└── can-match.routes.ts
```

---

# Role Service

```ts
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  role = signal<'admin' | 'user'>('user');

  setAdmin() {
    this.role.set('admin');
  }

  setUser() {
    this.role.set('user');
  }

}
```

---

# Admin Match Guard

```ts
export const adminMatchGuard: CanMatchFn = () => {

  const roleService = inject(RoleService);

  return roleService.role() === 'admin';

};
```

---

# User Match Guard

```ts
export const userMatchGuard: CanMatchFn = () => {

  const roleService = inject(RoleService);

  return roleService.role() === 'user';

};
```

---

# Route Configuration

```ts
export const canMatchRoutes: Routes = [

  {
    path: 'dashboard',

    canMatch: [adminMatchGuard],

    loadComponent: () =>
      import('./admin-dashboard/admin-dashboard')
        .then(m => m.AdminDashboard)
  },

  {
    path: 'dashboard',

    canMatch: [userMatchGuard],

    loadComponent: () =>
      import('./user-dashboard/user-dashboard')
        .then(m => m.UserDashboard)
  }

];
```

Notice both routes have the **same path**.

This is possible because `CanMatch` decides which route Angular should use.

---

# Internal Flow

## Admin User

```text
/dashboard
      │
      ▼
Admin Guard
      │
     true
      │
      ▼
Admin Dashboard
```

---

## Normal User

```text
/ dashboard
      │
      ▼
Admin Guard
      │
    false
      │
      ▼
Angular checks next route
      │
      ▼
User Guard
      │
     true
      │
      ▼
User Dashboard
```

---

# Why CanActivate Cannot Do This

With `CanActivate`:

```text
/dashboard
      │
      ▼
Route already selected
      │
      ▼
CanActivate
      │
    false
      │
      ▼
Navigation Stops
```

Angular **does not** search another route.

With `CanMatch`:

```text
/dashboard
      │
      ▼
CanMatch
      │
    false
      │
      ▼
Check Next Matching Route
```

---

# Route Matching Order

Angular evaluates routes **from top to bottom**.

```ts
Route 1
↓

false

↓

Route 2

↓

true

↓

Load Component
```

Therefore, the order of routes is important.

---

# Route Parameters

A `CanMatchFn` receives two parameters.

```ts
export const guard: CanMatchFn = (
  route,
  segments
) => {

}
```

---

## route

Type:

```ts
Route
```

Represents the current route configuration.

Example:

```ts
console.log(route.path);
console.log(route.data);
console.log(route.children);
```

Useful for creating reusable guards.

---

## segments

Type:

```ts
UrlSegment[]
```

Represents the URL Angular is trying to match.

Example:

URL

```text
/products/mobile/iphone
```

Segments

```text
products
mobile
iphone
```

Useful when guard logic depends on the requested URL.

---

# Return Types

CanMatch supports:

```ts
boolean
UrlTree
Observable<boolean>
Observable<UrlTree>
Promise<boolean>
Promise<UrlTree>
```

---

# Observable Example

```ts
export const adminMatchGuard: CanMatchFn = () => {

  const roleService = inject(RoleService);

  return of(roleService.role()).pipe(

    delay(2000),

    map(role => role === 'admin')

  );

};
```

Angular automatically waits for the Observable to emit before deciding whether to match the route.

The route configuration does **not** change.

---

# CanMatch vs CanLoad

| CanLoad                    | CanMatch                                 |
| -------------------------- | ---------------------------------------- |
| Older approach             | Modern approach                          |
| Mainly lazy-loaded modules | Standalone and lazy-loaded routes        |
| Less flexible              | More flexible                            |
| Rarely used in new apps    | Recommended for new Angular applications |

---

# Best Practices

* Use `CanMatch` for role-based routing.
* Use `CanMatch` for feature flags.
* Keep guards lightweight.
* Read user state from a service.
* Use `UrlTree` instead of manually calling `navigate()`.
* Keep route order intentional because Angular checks routes from top to bottom.

---

# Common Interview Questions

### What is CanMatch?

A guard that determines whether Angular should match a route before loading it.

---

### When does CanMatch execute?

Before Angular finalizes route matching.

---

### Difference between CanActivate and CanMatch?

`CanActivate` protects an already matched route.

`CanMatch` decides whether a route should be matched in the first place.

---

### Can multiple routes have the same path?

Yes.

When using `CanMatch`, Angular evaluates routes in order. If one guard returns `false`, Angular continues checking the next route with the same path.

---

### Does route configuration change when using Observable?

No.

Only the guard's return type changes. Angular automatically waits for the Observable or Promise to resolve.

---

# Quick Revision

```text
User requests URL
        │
        ▼
Route 1
        │
   CanMatch
        │
 ┌──────┴──────┐
 │             │
true        false
 │             │
 ▼             ▼
Load     Route 2
              │
         CanMatch
              │
         Load Component
```

---

# One-Line Interview Definition

> **CanMatch is an Angular Route Guard that decides whether a route should be matched before Angular loads or activates it, enabling scenarios such as role-based routing, feature flags, and conditional lazy loading.**
