# Angular Resolve Guard (Complete Interview Notes)

# What is Resolve?

A **Resolver** is an Angular routing feature that **fetches required data before a route is activated**.

Instead of loading the component first and then fetching data, Angular waits until the resolver completes.

---

# Simple Definition

> **Resolve loads data before navigation completes, ensuring the component receives the required data immediately after it is created.**

---

# Why Do We Need Resolve?

Without Resolver:

```text
User clicks User Detail
        │
        ▼
Component Created
        │
        ▼
Loading...
        │
        ▼
API Call
        │
        ▼
Data Received
        │
        ▼
Display User
```

The user sees a loading state.

---

With Resolver:

```text
User clicks User Detail
        │
        ▼
Resolver Executes
        │
        ▼
API Call
        │
        ▼
Data Received
        │
        ▼
Component Created
        │
        ▼
Display User Immediately
```

The component already has the required data.

---

# Real-World Examples

## User Profile

```text
/profile/1
```

Load:

* Name
* Email
* Address

before opening the page.

---

## Product Details

```text
/product/100
```

Load:

* Product
* Reviews
* Images

before displaying the page.

---

## Employee Details

```text
/employee/10
```

Load employee information before rendering.

---

## Dashboard

Load:

* Statistics
* Notifications
* Reports

before the dashboard appears.

---

# Folder Structure

```text
resolve/
│
├── services/
│      user.service.ts
│
├── resolver/
│      user.resolver.ts
│
├── user-list/
│
├── user-detail/
│
└── resolve.routes.ts
```

---

# User Service

```ts
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'Shivam',
      email: 'shivam@test.com'
    },
    {
      id: 2,
      name: 'Rahul',
      email: 'rahul@test.com'
    },
    {
      id: 3,
      name: 'Amit',
      email: 'amit@test.com'
    }
  ];

  getUser(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

}
```

---

# Resolver Implementation

```ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User, UserService } from '../services/user.service';

export const userResolver: ResolveFn<User | undefined> = (route) => {

  const userService = inject(UserService);

  const id = Number(route.paramMap.get('id'));

  return userService.getUser(id);

};
```

---

# Understanding ResolveFn<T>

```ts
ResolveFn<User | undefined>
```

`T` represents the type of data returned by the resolver.

Examples:

```ts
ResolveFn<User>
ResolveFn<Product>
ResolveFn<Employee[]>
ResolveFn<Order>
```

---

# Why inject()?

Functional resolvers do not have constructors.

Use:

```ts
const userService = inject(UserService);
```

instead of constructor injection.

---

# Reading Route Parameters

```ts
const id = Number(route.paramMap.get('id'));
```

The resolver receives an **ActivatedRouteSnapshot**.

Example URL:

```text
/user/2
```

Returns:

```text
2
```

---

# Route Configuration

```ts
{
  path: 'user/:id',

  resolve: {
    user: userResolver
  },

  loadComponent: () =>
    import('./user-detail/user-detail')
      .then(m => m.UserDetail)
}
```

---

# What does resolve do?

```ts
resolve: {
  user: userResolver
}
```

Angular executes:

```text
userResolver
```

Stores the returned data under:

```text
user
```

The component accesses it using:

```ts
route.data['user']
```

---

# Component (Snapshot Approach)

```ts
private route = inject(ActivatedRoute);

protected user = this.route.snapshot.data['user'];
```

The component never calls the service.

---

# Component (Modern Signal Approach)

```ts
private route = inject(ActivatedRoute);

protected user = toSignal(

  this.route.data.pipe(

    map(data => data['user'])

  )

);
```

Template:

```html
<p>{{ user()?.name }}</p>
```

---

# Snapshot vs Signals

## Snapshot

```ts
this.route.snapshot.data['user']
```

* Reads once.
* Best for static route data.

---

## Signal

```ts
toSignal(this.route.data)
```

* Reactive.
* Updates automatically if route data changes.
* Recommended for modern Angular applications.

---

# Why Doesn't the Component Call the Service?

Without Resolver:

```text
Component
      │
      ▼
Service
```

With Resolver:

```text
Component

(No Service Call)

      ▲

Resolver

      ▲

Service
```

The component only displays data.

---

# Navigation Flow

```text
User clicks

/user/2

      │

      ▼

Resolver Executes

      │

      ▼

UserService.getUser(2)

      │

      ▼

Returns User

      │

      ▼

Angular Stores

route.data.user

      │

      ▼

Component Created

      │

      ▼

Displays User
```

---

# Return Types

Resolvers support:

```ts
User
Observable<User>
Promise<User>
```

Most real applications use:

```ts
Observable<User>
```

because data is usually fetched through HttpClient.

---

# Resolve vs CanActivate

| Resolve                        | CanActivate                 |
| ------------------------------ | --------------------------- |
| Fetches data                   | Checks authorization        |
| Returns data                   | Returns boolean / UrlTree   |
| Supplies data to the component | Allows or blocks navigation |

---

# Resolve vs ngOnInit()

## ngOnInit()

```text
Component
      │
      ▼
HTTP Call
      │
      ▼
Loading...
```

---

## Resolver

```text
Resolver
      │
      ▼
HTTP Call
      │
      ▼
Component Starts
```

The component starts with ready-to-use data.

---

# Best Practices

* Keep business logic inside the resolver.
* Keep components focused on presentation.
* Use `inject()` inside functional resolvers.
* Prefer `paramMap` over `params`.
* Use Signals in modern Angular components.
* Return Observables for API-based applications.

---

# Common Interview Questions

## What is a Resolver?

A Resolver loads required data before Angular activates a route.

---

## Why use Resolve?

To ensure the component receives required data before rendering.

---

## What is ResolveFn<T>?

A functional resolver where `T` represents the type of data returned.

---

## Why use inject()?

Because functional resolvers do not support constructor injection.

---

## What does route.paramMap.get('id') return?

It reads route parameters from the `ActivatedRouteSnapshot`.

---

## Why use route.data?

Angular stores resolved data inside `ActivatedRoute.data`.

---

## Does the component call the service?

No.

The resolver calls the service.

The component only consumes the resolved data.

---

## Snapshot vs Signal

| Snapshot    | Signal             |
| ----------- | ------------------ |
| Reads once  | Reactive           |
| Simpler     | Modern Angular     |
| Static data | Dynamic route data |

---

# Quick Revision

```text
User Clicks

/user/2

      │

      ▼

Resolver

      │

      ▼

UserService

      │

      ▼

User Object

      │

      ▼

route.data

      │

      ▼

UserDetail Component

(No Service Call)
```

---

# One-Line Interview Definition

> **Resolve is an Angular routing feature that loads required data before route activation, allowing components to receive ready-to-use data without making service calls themselves.**
