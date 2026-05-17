# Angular Route Params (Complete Guide + Interview Notes)

## What are Route Params?

Route parameters are dynamic values passed in the URL used to load specific data in Angular routes.

Example:

```
/user/1
/user/2
```

Here `1` and `2` are route params.

---

# 1. Route Configuration (Definition)

## Basic Route Setup

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./user-detail/user-detail.component')
        .then(m => m.UserDetailComponent)
  }
];
```

---

## Child Routing Approach (Best Practice)

```ts
{
  path: 'user',
  loadChildren: () =>
    import('./user/user.routes')
      .then(m => m.USER_ROUTES)
}
```

### user.routes.ts

```ts
export const USER_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./user-detail').then(m => m.UserDetail)
  }
];
```

---

# 2. Navigation to Route

## Using Router

```ts
constructor(private router: Router) {}

navigate(id: number) {
  this.router.navigate(['/user', id]);
}
```

---

## Using Template

```html
<a [routerLink]="['/user', user.id]">View</a>
```

---

# 3. Reading Route Params (ALL APPROACHES)

---

## Approach 1: Snapshot (Simple)

```ts
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}
```

### Pros

* Simple

### Cons

* Does NOT update on param change

---

## Approach 2: Observable (Recommended Classic)

```ts
this.route.paramMap.subscribe(params => {
  const id = params.get('id');
});
```

### Pros

* Reacts to route changes

### Cons

* Manual subscription

---

## Approach 3: Modern Angular Signals (BEST)

```ts
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

userId = toSignal(
  this.route.paramMap.pipe(
    map(params => params.get('id'))
  )
);
```

### Template

```html
<p>{{ userId() }}</p>
```

### Pros

* No subscribe/unsubscribe
* Fully reactive
* Modern Angular (17+)

---

# 4. Snapshot vs Observable vs Signal

| Method     | Updates on change | Boilerplate | Recommended   |
| ---------- | ----------------- | ----------- | ------------- |
| Snapshot   | ❌ No              | Low         | Only once use |
| Observable | ✅ Yes             | Medium      | Good          |
| Signal     | ✅ Yes             | Low         | BEST          |

---

# 5. ActivatedRoute Key APIs

```ts
this.route.snapshot.paramMap
this.route.paramMap
this.route.params
```

### Recommended

```text
paramMap (safer)
```

---

# 6. Multiple Params Example

Route:

```
/user/:id/order/:orderId
```

```ts
this.route.paramMap.subscribe(params => {
  const userId = params.get('id');
  const orderId = params.get('orderId');
});
```

---

# 7. Route Params vs Query Params

## Route Params

```
/user/1
```

* Required data
* Identifiers

## Query Params

```
/user?id=1&type=admin
```

* Optional filters
* Sorting, pagination

---

# 8. Query Params Example

```ts
this.router.navigate(['/user'], {
  queryParams: { id: 1 }
});
```

Read:

```ts
this.route.queryParamMap.subscribe(p => p.get('id'));
```

---

# 8.1 RouterLink (Template Navigation)

## Using routerLink with Params

```html
[routerLink]="['/user', user.id]"
```

or incorrect example:

```html
[routerLink]="['params-id']"
```

### Explanation

* `routerLink` builds navigation URL
* Array format is used for dynamic segments
* Each array item becomes a URL segment

### Correct Usage Examples

```html
<!-- Dynamic param -->
[routerLink]="['/user', user.id]"

<!-- Static route -->
[routerLink]="['/home']"
```

### Interview Point

```text
routerLink array syntax helps Angular construct URLs safely with route parameters.
```

---

# 9. Real Implementation Flow

```
User List
  ↓ click
navigate(['/user', id])
  ↓
Route: /user/:id
  ↓
ActivatedRoute reads id
  ↓
Show User Detail
```

---

# 10. Signals Approach (Modern Best Practice)

```ts
userId = toSignal(
  this.route.paramMap.pipe(
    map(p => p.get('id'))
  )
);
```

Template:

```html
User ID: {{ userId() }}
```

---

# 11. Interview Key Points

* Route params are dynamic URL values
* Defined using `:id`
* Read using ActivatedRoute
* Prefer `paramMap` over `params`
* Snapshot is static
* Observable is reactive
* Signals are modern best practice
* Child routing improves scalability

---

# 12. One-Line Definition

Route parameters are dynamic segments in Angular URLs used to pass and retrieve data for specific routes in a scalable way.
