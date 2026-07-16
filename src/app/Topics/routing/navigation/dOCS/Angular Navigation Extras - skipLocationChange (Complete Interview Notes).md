# Angular Navigation Extras - skipLocationChange (Complete Interview Notes)

# What is skipLocationChange?

`skipLocationChange` is a Navigation Extra that tells Angular to **navigate to another route without updating the browser's address bar**.

Basic navigation:

```ts
this.router.navigate(['/users']);
```

Navigation with `skipLocationChange`:

```ts
this.router.navigate(
  ['/users'],
  {
    skipLocationChange: true
  }
);
```

---

# Simple Definition

> **skipLocationChange navigates to another route while keeping the browser's visible URL unchanged.**

---

# Normal Navigation

Suppose the current page is

```text
Home

URL

/home
```

Navigate

```ts
this.router.navigate(['/users']);
```

Result

```text
Users Page

URL

/users
```

Both the page and URL change.

---

# Navigation with skipLocationChange

Current

```text
Home

URL

/home
```

Navigate

```ts
this.router.navigate(
  ['/users'],
  {
    skipLocationChange: true
  }
);
```

Result

```text
Users Page

URL

/home
```

Notice

The Users component loads but the browser still displays `/home`.

---

# Visual Flow

```text
Current Page

Home

URL

/home

       │

       ▼

navigate()

skipLocationChange:true

       │

       ▼

Users Component Loads

       │

       ▼

Browser URL

Still

/home
```

---

# How It Works

Normally Angular updates:

* Active Component
* Browser URL

With `skipLocationChange`

Angular updates:

* Active Component ✅
* Browser URL ❌

The route changes internally, but the address bar remains the same.

---

# Implementation

```ts
protected goToUsersSkipLocation(): void {

  this.router.navigate(
    ['/routing-demo/navigation/users'],
    {
      skipLocationChange: true
    }
  );

}
```

---

# Testing

Current URL

```text
/routing-demo/navigation/home
```

Click

```text
Users (skipLocationChange)
```

Expected

Component

```text
Users Page
```

Browser URL

```text
/routing-demo/navigation/home
```

The page changes but the visible URL does not.

---

# Real-World Use Cases

## Multi-Step Wizard

```text
Step 1

↓

Step 2

↓

Step 3
```

Navigate internally without exposing every intermediate step.

---

## Modal Routing

Open modal content through routing while keeping the current URL visible.

---

## Internal Navigation

Switch between internal application views without changing the displayed URL.

---

## Temporary Screens

Navigate through intermediate pages that users should not bookmark.

---

# Browser History

Unlike `replaceUrl`, `skipLocationChange` is **not about replacing browser history**.

Its primary purpose is to **avoid updating the browser's address bar**.

---

# skipLocationChange vs replaceUrl

| replaceUrl                              | skipLocationChange                                   |
| --------------------------------------- | ---------------------------------------------------- |
| Browser URL changes                     | Browser URL stays the same                           |
| Replaces current history entry          | Does not expose the navigated URL in the address bar |
| Used for login, logout, payment success | Used for internal or temporary navigation            |

---

# Best Practices

* Use for internal navigation flows.
* Use for wizard-style applications.
* Avoid using it when users should be able to bookmark or share the current page.
* Prefer normal navigation unless there is a clear requirement to hide the URL change.

---

# Common Interview Questions

## What does skipLocationChange do?

It navigates to another Angular route without updating the browser's visible URL.

---

## Does the component change?

Yes.

Angular loads the target component normally.

---

## Does the browser URL change?

No.

The address bar continues showing the previous URL.

---

## When should skipLocationChange be used?

* Multi-step forms
* Internal navigation
* Temporary screens
* Modal-style routing

---

## Difference between skipLocationChange and replaceUrl?

`replaceUrl` changes the browser URL and replaces the current history entry.

`skipLocationChange` navigates internally but keeps the browser's visible URL unchanged.

---

# Common Mistakes

❌ Thinking `skipLocationChange` replaces browser history.

It does not.

---

❌ Thinking the target component will not load.

It loads normally.

Only the browser URL remains unchanged.

---

# Quick Revision

```text
Normal Navigation

Home

↓

Users

URL

/users


----------------------------------


skipLocationChange

Home

↓

Users

URL

/home
```

---

# One-Line Interview Definition

> **`skipLocationChange` is a Navigation Extra that allows Angular to navigate to another route while keeping the browser's visible URL unchanged.**
