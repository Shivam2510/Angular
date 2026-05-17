# Angular Query Params (Complete Interview Guide)

## What are Query Params?

Query parameters are optional key-value pairs added to the URL after `?`, used to pass extra information without changing the route structure.

Example:

```
/user/1?mode=edit&type=admin
```

Here:

* mode = edit
* type = admin

---

# 1. Why Query Params?

Query params are used for:

* Filters
* Search
* Sorting
* UI state (view/edit mode)
* Pagination
* Optional configuration

---

# 2. Query Params vs Route Params

| Feature       | Route Params      | Query Params    |
| ------------- | ----------------- | --------------- |
| Syntax        | /user/1           | /user?id=1      |
| Required      | Yes               | No              |
| Purpose       | Identify resource | Modify behavior |
| URL structure | Fixed path        | Flexible        |

---

# 3. Setting Query Params (Navigation)

## 3.1 Using Router (Recommended)

```ts
import { Router } from '@angular/router';

constructor(private router: Router) {}

openUser(id: number) {
  this.router.navigate(['/user', id], {
    queryParams: {
      mode: 'edit',
      type: 'admin'
    }
  });
}
```

---

## 3.2 Template Navigation

```html
<a [routerLink]="['/user', user.id]" [queryParams]="{ mode: 'edit' }">
  View User
</a>
```

---

# 4. Reading Query Params

---

## 4.1 Old Approach (RxJS Subscribe)

```ts
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    const mode = params.get('mode');
    const type = params.get('type');
  });
}
```

### Pros

* Works in all cases

### Cons

* Manual subscription
* Needs cleanup in complex cases

---

## 4.2 Snapshot Approach

```ts
const mode = this.route.snapshot.queryParamMap.get('mode');
```

### Pros

* Simple

### Cons

* Does not update on change

---

## 4.3 Modern Approach (Signals)

```ts
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

private route = inject(ActivatedRoute);

mode = toSignal(
  this.route.queryParamMap.pipe(
    map(params => params.get('mode'))
  )
);
```

---

## Template Usage

```html
<p>{{ mode() }}</p>
```

---

# 5. Query ParamMap vs Params

| API           | Use          |
| ------------- | ------------ |
| paramMap      | route params |
| queryParamMap | query params |

---

# 6. Common Use Cases

## 6.1 Filters

```
/products?category=mobile
```

## 6.2 Search

```
/users?search=shivam
```

## 6.3 UI Mode

```
/user/1?mode=edit
```

## 6.4 Pagination

```
/products?page=2&limit=10
```

---

# 7. Multiple Query Params

```ts
this.router.navigate(['/user', 1], {
  queryParams: {
    mode: 'edit',
    type: 'admin',
    tab: 'profile'
  }
});
```

---

# 8. Updating Query Params

## Replace existing params

```ts
this.router.navigate([], {
  queryParams: { mode: 'view' }
});
```

## Preserve existing params

```ts
this.router.navigate([], {
  queryParams: { mode: 'view' },
  queryParamsHandling: 'merge'
});
```

---

# 9. Removing Query Params

```ts
this.router.navigate([], {
  queryParams: { mode: null },
  queryParamsHandling: 'merge'
});
```

---

# 10. Real Flow Example

```
User List
   ↓ click edit
navigate(['/user/1', { mode: 'edit' }])
   ↓
URL updates
   ↓
ActivatedRoute reads query params
   ↓
UI changes to edit mode
```

---

# 11. Snapshot vs Observable vs Signal

| Method     | Updates | Best Use       |
| ---------- | ------- | -------------- |
| Snapshot   | ❌ No    | One-time read  |
| Observable | ✅ Yes   | Classic apps   |
| Signal     | ✅ Yes   | Modern Angular |

---

# 12. Interview Key Points

* Query params are optional URL data
* Used for filters, search, UI state
* Do NOT change route structure
* Use `queryParamMap` for reading
* Prefer Signals in Angular 17+
* Use Router.navigate for setting params

---

# 13. Route Params vs Query Params (IMPORTANT)

```
Route Params → Identity (WHAT)
Query Params → Behavior (HOW)
```

---

# 14. One-Line Definition

Query parameters are optional key-value pairs in Angular URLs used to pass additional state or configuration without affecting route structure.
