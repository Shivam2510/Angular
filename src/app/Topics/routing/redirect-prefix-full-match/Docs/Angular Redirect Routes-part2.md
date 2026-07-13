# Angular Redirect Routes (Part 2 - pathMatch: 'full' vs 'prefix')

# What is pathMatch?

`pathMatch` tells Angular **how much of the URL should match** before applying a redirect.

Angular supports only two values:

```text
full
prefix
```

---

# pathMatch: 'full'

## Definition

The **entire URL** must match the route before Angular performs the redirect.

---

## Example

```ts
{
  path: '',

  redirectTo: 'home',

  pathMatch: 'full'
}
```

---

## Test Case 1

URL

```text
/redirect
```

Flow

```text
Current URL

''

↓

Complete Match?

↓

YES

↓

Redirect

↓

/redirect/home
```

Result

```text
/redirect/home
```

---

## Test Case 2

URL

```text
/redirect/dashboard
```

Flow

```text
Current URL

dashboard

↓

Complete Match?

↓

NO

↓

No Redirect
```

Result

```text
Dashboard Component Loads
```

---

# Why use full for an empty path?

Every URL starts with an empty string.

Example:

```text
/
```

Starts with:

```text
''
```

Example:

```text
/dashboard
```

Starts with:

```text
''
```

Example:

```text
/users
```

Starts with:

```text
''
```

If Angular used `prefix` here, **every route would match**, causing unwanted redirects or redirect loops.

Therefore, for the root route:

```ts
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
```

is the recommended and most common configuration.

---

# pathMatch: 'prefix'

## Definition

Angular checks only the **beginning (prefix)** of the URL.

If the URL starts with the configured path, Angular applies the redirect.

---

## Example

```ts
{
  path: 'admin',

  redirectTo: 'login',

  pathMatch: 'prefix'
}
```

---

## Test Case 1

URL

```text
/admin
```

Flow

```text
Starts with

admin

↓

YES

↓

Redirect

↓

/login
```

---

## Test Case 2

URL

```text
/admin/dashboard
```

Angular matches:

```text
admin
```

Remaining URL:

```text
dashboard
```

Angular redirects to:

```text
/login/dashboard
```

If your application does **not** have:

```text
/login/dashboard
```

Angular throws:

```text
NG04002:
Cannot match any routes
```

This is the exact behavior you observed during implementation.

---

## Test Case 3

URL

```text
/admin/users
```

Redirect becomes:

```text
/login/users
```

---

## Test Case 4

URL

```text
/admin/settings
```

Redirect becomes:

```text
/login/settings
```

---

# Why Does This Happen?

With `pathMatch: 'prefix'`, Angular preserves the remaining URL segments.

Example:

```text
/admin/dashboard
```

Angular matches:

```text
admin
```

Remaining:

```text
dashboard
```

Redirect target:

```text
/login/dashboard
```

Angular **does not remove** the remaining segments.

---

# Visual Flow

```text
/admin/dashboard

        │

        ▼

Matches Prefix

admin

        │

        ▼

Remaining URL

dashboard

        │

        ▼

Redirect

/login/dashboard
```

---

# When Should You Use prefix?

Good use cases:

* Redirect an entire URL hierarchy.
* Legacy application migration.
* Redirect feature sections.

Example:

```text
/legacy/*
```

↓

```text
/new/*
```

Configuration:

```ts
{
  path: 'legacy',

  redirectTo: 'new',

  pathMatch: 'prefix'
}
```

---

# When Should You Use full?

Use `full` for:

* Default routes
* Root redirects
* Exact URL matching

Example:

```ts
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
```

---

# full vs prefix

| pathMatch: 'full'            | pathMatch: 'prefix'              |
| ---------------------------- | -------------------------------- |
| Entire URL must match        | Only the beginning must match    |
| Exact redirect               | Redirects URL hierarchy          |
| Used for root/default routes | Used for section-based redirects |
| Prevents redirect loops      | Preserves remaining URL segments |

---

# Common Mistake

Incorrect:

```ts
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'prefix'
}
```

Problem:

Every URL starts with `''`.

Result:

* Every route matches.
* Unexpected redirects.
* Possible redirect loops.

Correct:

```ts
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
```

---

# Best Practices

* Use `pathMatch: 'full'` for `path: ''`.
* Use `pathMatch: 'prefix'` only when intentionally redirecting an entire URL hierarchy.
* Ensure the redirect destination can handle any remaining URL segments when using `prefix`.
* Test redirects carefully to avoid broken routes.

---

# Common Interview Questions

## What is pathMatch?

It defines how Angular compares the requested URL with the configured route before applying a redirect.

---

## Difference between full and prefix?

* `full` requires the entire URL to match.
* `prefix` only checks the beginning of the URL.

---

## Why do we use full with path: ''?

Because every URL begins with an empty string. Using `prefix` would match every route and could cause redirect loops.

---

## Why did `/admin/dashboard` become `/login/dashboard`?

Because `pathMatch: 'prefix'` preserves the remaining URL segments after the matched prefix.

---

## Quick Revision

```text
pathMatch: 'full'

/redirect

↓

Exact Match

↓

Redirect


---------------------------

pathMatch: 'prefix'

/admin/dashboard

↓

Matches "admin"

↓

Remaining "dashboard"

↓

Redirect

↓

/login/dashboard
```

---

# One-Line Interview Definition

> **`pathMatch: 'full'` requires the entire URL to match before redirecting, while `pathMatch: 'prefix'` redirects when the URL starts with the configured path and preserves any remaining URL segments.**
