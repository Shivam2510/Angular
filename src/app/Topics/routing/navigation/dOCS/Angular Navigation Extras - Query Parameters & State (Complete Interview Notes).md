# Angular Navigation Extras - Query Parameters & State (Complete Interview Notes)

# What are Navigation Extras?

Navigation Extras are additional configuration options passed to Angular's `Router.navigate()` or `Router.navigateByUrl()` methods to control navigation behavior.

Basic navigation:

```ts
this.router.navigate(['/users']);
```

Navigation with extras:

```ts
this.router.navigate(
  ['/users'],
  {
    queryParams: {
      page: 1
    },
    state: {
      userId: 101
    }
  }
);
```

Navigation Extras allow us to pass additional information along with navigation.

---

# Common Navigation Extras

| Navigation Extra   | Purpose                       |
| ------------------ | ----------------------------- |
| queryParams        | Pass values in URL            |
| state              | Pass hidden temporary data    |
| replaceUrl         | Replace browser history       |
| skipLocationChange | Navigate without changing URL |
| fragment           | Navigate to page fragments    |
| relativeTo         | Relative navigation           |

---

# Query Parameters

## What are Query Parameters?

Query Parameters are key-value pairs appended to the URL.

Example

```text
/users?page=1&sort=name
```

Angular automatically generates the query string.

---

## Navigate with Query Parameters

```ts
this.router.navigate(
  ['/users'],
  {
    queryParams: {
      page: 1,
      sort: 'name'
    }
  }
);
```

Generated URL

```text
/users?page=1&sort=name
```

---

## Reading Query Parameters

Modern Angular

```ts
private route = inject(ActivatedRoute);

private queryParamMap = toSignal(
  this.route.queryParamMap
);

protected page = computed(() =>
  this.queryParamMap()?.get('page')
);

protected sort = computed(() =>
  this.queryParamMap()?.get('sort')
);
```

Older Angular

```ts
this.route.queryParamMap.subscribe(params => {

  console.log(params.get('page'));

  console.log(params.get('sort'));

});
```

---

# Dynamic Query Parameters

```ts
const page = 5;
const sort = 'salary';

this.router.navigate(
  ['/users'],
  {
    queryParams: {
      page,
      sort
    }
  }
);
```

Result

```text
/users?page=5&sort=salary
```

---

# Real-World Uses of Query Parameters

* Pagination
* Sorting
* Filtering
* Search
* Product listing
* Table state

Example

```text
/products?page=2&brand=Apple&price=50000
```

---

# Navigation State

## What is Navigation State?

Navigation State allows passing data between routes **without exposing it in the URL**.

Example

```ts
this.router.navigate(
  ['/users'],
  {
    state: {
      id: 101,
      name: 'Shivam',
      role: 'Admin'
    }
  }
);
```

URL

```text
/users
```

Notice that no data appears in the URL.

---

## Reading Navigation State

Angular stores the data inside the browser History API.

Read it using

```ts
protected user = history.state;
```

Or

```ts
const user = history.state;
```

Example

```html
<p>ID : {{ user.id }}</p>

<p>Name : {{ user.name }}</p>

<p>Role : {{ user.role }}</p>
```

---

# Real-World Uses of Navigation State

* Login Success
* Checkout
* Payment
* Selected Product
* Temporary User Data
* Wizard Navigation

Example

```ts
this.router.navigate(
  ['/dashboard'],
  {
    state: {
      user
    }
  }
);
```

---

# Query Parameters vs Navigation State

| Query Parameters            | Navigation State                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| Visible in URL              | Hidden from URL                                                                          |
| Shareable                   | Not shareable                                                                            |
| Bookmarkable                | Not bookmarkable                                                                         |
| Survives page refresh       | Intended for temporary navigation data; don't rely on it as persistent application state |
| Read using ActivatedRoute   | Read using history.state                                                                 |
| Best for filters and search | Best for temporary objects                                                               |

---

# Visual Comparison

## Query Parameters

```text
Home

      │

navigate()

      │

queryParams

      │

      ▼

/users?page=1&sort=name

      │

      ▼

ActivatedRoute

      │

      ▼

Component
```

---

## Navigation State

```text
Home

      │

navigate()

      │

state

      │

      ▼

history.state

      │

      ▼

Component
```

---

# Which One Should You Use?

Use **Query Parameters** when:

* Data should be visible in the URL.
* Users should be able to bookmark or share the page.
* Representing filters, search terms, sorting, or pagination.

Examples

* Product Filters
* Search
* Pagination
* Reports

---

Use **Navigation State** when:

* Data should remain hidden.
* Passing temporary objects.
* Navigation immediately follows an action.
* The data does not need to be shareable.

Examples

* Login Success
* Checkout
* Payment
* Selected User
* Temporary Wizard Data

---

# Best Practices

## Query Parameters

* Use for filter values.
* Use for pagination.
* Keep URLs meaningful.
* Avoid putting sensitive information in the URL.

---

## Navigation State

* Use only for temporary navigation data.
* Do not use for long-term storage.
* Do not expect it to be available after a browser refresh.
* Do not store authentication tokens or sensitive information.

---

# Common Interview Questions

## What are Navigation Extras?

Additional options passed to Angular Router to customize navigation behavior.

---

## How do you send Query Parameters?

```ts
this.router.navigate(
  ['/users'],
  {
    queryParams: {
      page: 1,
      sort: 'name'
    }
  }
);
```

---

## How do you read Query Parameters?

Modern Angular

```ts
toSignal(this.route.queryParamMap)
```

Traditional Angular

```ts
this.route.queryParamMap.subscribe(...)
```

---

## How do you send Navigation State?

```ts
this.router.navigate(
  ['/users'],
  {
    state: {
      user
    }
  }
);
```

---

## How do you read Navigation State?

```ts
const state = history.state;
```

---

## What is the biggest difference?

Query Parameters are visible in the URL.

Navigation State is hidden and intended for temporary navigation data.

---

## Which one is used more frequently?

Both.

* Query Parameters are common for search, filters, and pagination.
* Navigation State is common for temporary data passed immediately after navigation.

---

# Quick Revision

```text
navigate()

       │

       ├──────────────┐

       │              │

queryParams       state

       │              │

Visible URL     Hidden Data

       │              │

ActivatedRoute   history.state
```

---

# One-Line Interview Definition

> **Navigation Extras are optional settings passed to Angular's Router during navigation. Query Parameters are used for shareable URL-based data such as filters and pagination, while Navigation State is used for temporary data passed between routes without exposing it in the URL.**
