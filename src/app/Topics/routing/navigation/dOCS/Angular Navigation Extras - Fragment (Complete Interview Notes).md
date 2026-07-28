# Angular Navigation Extras - Fragment (Complete Interview Notes)

# What is a Fragment?

A **Fragment** is the part of a URL that appears **after the `#` symbol**.

Example

```text
/profile#security
```

Here

```text
/profile
```

is the route.

and

```text
#security
```

is the fragment.

---

# Simple Definition

> **A Fragment identifies a specific section of a page and allows the browser to navigate or scroll directly to that section.**

---

# URL Structure

```text
/users?page=2#profile
```

Breakdown

```text
/users
```

↓

Route

---

```text
?page=2
```

↓

Query Parameters

---

```text
#profile
```

↓

Fragment

---

# Why Do We Need Fragments?

Imagine a long page.

```text
Profile

↓

Overview

↓

Security

↓

Notifications

↓

Settings
```

Instead of manually scrolling,

Users can jump directly to

```text
#security
```

---

# Real-World Examples

## Angular Documentation

```text
/angular/router#guards
```

---

## GitHub README

```text
README.md#installation
```

---

## MDN

```text
/docs/Web/API#examples
```

---

## Wikipedia

```text
Angular_(web_framework)#History
```

All of these use URL fragments.

---

# Navigate with Fragment

```ts
this.router.navigate(
  ['/profile'],
  {
    fragment: 'security'
  }
);
```

Generated URL

```text
/profile#security
```

---

# Dynamic Fragment

```ts
const section = 'settings';

this.router.navigate(
  ['/profile'],
  {
    fragment: section
  }
);
```

Result

```text
/profile#settings
```

---

# HTML Example

```html
<section id="overview">
    <h2>Overview</h2>
</section>

<section id="security">
    <h2>Security</h2>
</section>

<section id="settings">
    <h2>Settings</h2>
</section>
```

Browser automatically searches for

```html
id="security"
```

and scrolls to that section.

---

# Reading Fragment

Modern Angular

```ts
private route = inject(ActivatedRoute);

private fragment = toSignal(
  this.route.fragment
);
```

Access

```ts
this.fragment()
```

---

Traditional Angular

```ts
this.route.fragment.subscribe(fragment => {

  console.log(fragment);

});
```

---

# Navigation Flow

```text
Button Click

        │

        ▼

navigate()

        │

fragment:'security'

        │

        ▼

URL

/profile#security

        │

        ▼

Browser Searches

id="security"

        │

        ▼

Automatic Scroll
```

---

# Browser Behavior

Angular updates the URL.

The browser then checks whether an element with the matching `id` exists.

Example

```text
#security
```

Browser searches

```html
id="security"
```

If found

↓

Automatically scrolls to that element.

If not found

↓

Nothing happens.

---

# Real-World Use Cases

## Documentation Websites

```text
Installation

Configuration

Routing

Guards

FAQ
```

Click

```text
FAQ
```

↓

```text
#faq
```

---

## Terms & Conditions

```text
#privacy

#refund

#security
```

---

## User Profile

```text
#overview

#security

#notifications
```

---

## Long Forms

Jump directly to

```text
#payment

#shipping

#summary
```

---

# Fragment vs Query Parameters

| Query Parameters                  | Fragment                            |
| --------------------------------- | ----------------------------------- |
| Used for application data         | Used for page sections              |
| Example: `?page=2`                | Example: `#security`                |
| Read using `queryParamMap`        | Read using `fragment`               |
| Common for filters and pagination | Common for scrolling and navigation |

---

# Fragment vs Navigation State

| Fragment           | Navigation State                   |
| ------------------ | ---------------------------------- |
| Visible in URL     | Hidden from URL                    |
| Bookmarkable       | Not bookmarkable                   |
| Used for scrolling | Used for temporary navigation data |
| Shareable          | Not shareable                      |

---

# Best Practices

* Use fragments for long pages.
* Ensure the target element has a matching `id`.
* Use meaningful fragment names.
* Combine fragments with query parameters when necessary.

Example

```text
/products?page=2#reviews
```

---

# Common Interview Questions

## What is a Fragment?

The portion of a URL after the `#` symbol that identifies a specific section of a page.

---

## How do you navigate with a Fragment?

```ts
this.router.navigate(
  ['/profile'],
  {
    fragment: 'security'
  }
);
```

---

## How do you read a Fragment?

Modern Angular

```ts
const fragment = toSignal(
  this.route.fragment
);
```

Traditional Angular

```ts
this.route.fragment.subscribe(...)
```

---

## Does Angular automatically scroll?

Angular updates the URL with the fragment.

The browser performs the scrolling if it finds an element whose `id` matches the fragment value.

---

## Can Fragments be combined with Query Parameters?

Yes.

Example

```ts
this.router.navigate(
  ['/products'],
  {
    queryParams: {
      page: 2
    },
    fragment: 'reviews'
  }
);
```

Generated URL

```text
/products?page=2#reviews
```

---

# Common Mistakes

❌ Using a fragment without creating a matching HTML element.

Example

```text
#security
```

but no

```html
id="security"
```

Browser cannot scroll.

---

❌ Confusing Query Parameters with Fragments.

Query Parameters represent application data.

Fragments represent page sections.

---

# Quick Revision

```text
URL

/products?page=2#reviews

          │

          ├──── Route

          ├──── Query Parameters

          └──── Fragment

Browser

↓

Find

id="reviews"

↓

Scroll
```

---

# One-Line Interview Definition

> **A Fragment is the portion of a URL after the `#` symbol that identifies a specific section of a page. Angular can generate fragment URLs during navigation, while the browser scrolls to the element whose `id` matches the fragment.**
