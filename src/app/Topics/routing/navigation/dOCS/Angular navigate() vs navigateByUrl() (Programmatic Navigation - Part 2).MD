# Angular `navigate()` vs `navigateByUrl()` (Programmatic Navigation - Part 2)

# What is Programmatic Navigation?

Programmatic Navigation allows navigation between routes using Angular's **Router** service instead of HTML links.

Angular provides two navigation methods:

```ts
router.navigate()
```

```ts
router.navigateByUrl()
```

Both perform navigation, but they are used in different scenarios.

---

# Simple Definition

> **`navigate()` builds a URL from route segments, while `navigateByUrl()` navigates using a complete URL string.**

---

# Router.navigate()

## Syntax

```ts
this.router.navigate(['/users']);
```

`navigate()` accepts an **array of route segments**.

---

## Why Array?

Angular combines every array element into a URL.

Example:

```ts
this.router.navigate([
  '/users',
  10
]);
```

Result:

```text
/users/10
```

---

Another Example

```ts
this.router.navigate([
  '/employee',
  100,
  'details'
]);
```

Result

```text
/employee/100/details
```

Angular constructs the URL automatically.

---

# Router.navigateByUrl()

## Syntax

```ts
this.router.navigateByUrl('/users');
```

`navigateByUrl()` accepts a **single URL string**.

---

Example

```ts
this.router.navigateByUrl('/users/10');
```

Angular directly navigates to that URL.

It does **not** build the URL from segments.

---

# Visual Difference

## navigate()

```text
Route Segments

users

10

      │

      ▼

Angular Builds URL

      │

      ▼

/users/10
```

---

## navigateByUrl()

```text
Complete URL

/users/10

      │

      ▼

Angular Navigates
```

---

# Practical Examples

## navigate()

```ts
const userId = 5;

this.router.navigate([
  '/users',
  userId
]);
```

Result:

```text
/users/5
```

---

## navigateByUrl()

```ts
this.router.navigateByUrl('/login');
```

Useful when the destination URL is already known.

---

# Real-World Use Cases

## navigate()

* User Details
* Product Details
* Employee Details
* Edit Page
* Dynamic Routes

Example

```ts
this.router.navigate([
  '/products',
  product.id
]);
```

---

## navigateByUrl()

* Login
* Logout
* Fixed Dashboard
* Redirect to Home
* Static URLs

Example

```ts
this.router.navigateByUrl('/dashboard');
```

---

# Implementation Example

## navigate()

```ts
protected goToUsers(): void {

  this.router.navigate([
    '/routing-demo/navigation/users'
  ]);

}
```

---

## navigateByUrl()

```ts
protected goToUsersByUrl(): void {

  this.router.navigateByUrl(
    '/routing-demo/navigation/users'
  );

}
```

Both navigate to the same page.

---

# Dynamic Route Comparison

## navigate()

```ts
const id = 100;

this.router.navigate([
  '/users',
  id
]);
```

Produces

```text
/users/100
```

---

## navigateByUrl()

```ts
const id = 100;

this.router.navigateByUrl(
  '/users/' + id
);
```

Produces the same URL but requires manual string construction.

---

# Why navigate() is Preferred

Advantages:

* Cleaner code
* Dynamic routes
* No string concatenation
* Supports relative navigation
* Works naturally with route parameters

Example

```ts
this.router.navigate([
  '/orders',
  orderId,
  'details'
]);
```

---

# navigate() vs navigateByUrl()

| navigate()              | navigateByUrl()        |
| ----------------------- | ---------------------- |
| Accepts route segments  | Accepts complete URL   |
| Array                   | String                 |
| Angular constructs URL  | Developer provides URL |
| Best for dynamic routes | Best for fixed routes  |
| Most commonly used      | Used less frequently   |

---

# When Should You Use navigate()?

Use when:

* Route parameters exist.
* URL is dynamic.
* Building routes programmatically.
* Relative navigation is needed.
* Navigation Extras will be used.

Example

```ts
this.router.navigate([
  '/employee',
  employeeId
]);
```

---

# When Should You Use navigateByUrl()?

Use when:

* URL is fixed.
* Redirect after logout.
* Redirect after login.
* Full URL is already available.

Example

```ts
this.router.navigateByUrl('/login');
```

---

# Best Practices

* Prefer `navigate()` for most applications.
* Use `navigateByUrl()` for fixed destinations.
* Avoid manual URL concatenation when `navigate()` can build the route.
* Use `inject(Router)` in modern standalone Angular applications.

---

# Common Interview Questions

## What is the difference between navigate() and navigateByUrl()?

`navigate()` accepts route segments and constructs the URL.

`navigateByUrl()` accepts a complete URL string.

---

## Which one is used more frequently?

`navigate()`.

It supports dynamic routes and is used in most real-world applications.

---

## Can both navigate to the same page?

Yes.

Example:

```ts
this.router.navigate(['/users']);
```

and

```ts
this.router.navigateByUrl('/users');
```

produce the same result.

---

## Why is navigate() preferred?

Because Angular constructs the URL from route segments, making dynamic navigation easier and reducing manual string concatenation.

---

# Quick Revision

```text
navigate()

Segments

↓

Angular Builds URL

↓

Navigate


---------------------------

navigateByUrl()

Complete URL

↓

Navigate
```

---

# One-Line Interview Definition

> **`navigate()` constructs a route from URL segments and is ideal for dynamic navigation, while `navigateByUrl()` navigates directly to a complete URL string and is best suited for fixed routes.**
