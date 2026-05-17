# Angular Lazy Loading (Interview Notes)

## What is Lazy Loading?

Lazy loading is a performance optimization technique in Angular where feature modules/components are loaded **only when required**, instead of loading everything at application startup.

---

## Why Lazy Loading?

* Faster initial load time
* Better performance
* Smaller initial bundle size
* Improves user experience
* Scalable architecture for large apps

---

## Without Lazy Loading (Eager Loading)

* All components load at startup
* Bigger bundle size
* Slower initial render

Example:

```html
<reactive-forms></reactive-forms>
<user-detail-list></user-detail-list>
```

---

## With Lazy Loading

* Load feature only when route is visited
* Code is split into chunks

Example:

```text
/reactive-forms → loads only when accessed
/form-array → loads only when accessed
```

---

## Modern Angular Lazy Loading (Standalone)

Used in Angular standalone architecture:

```ts
loadComponent: () => import('./component').then(m => m.Component)
```

---

## Route Example

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.Home)
  },
  {
    path: 'reactive-forms',
    loadComponent: () => import('./reactive-forms/reactive-forms').then(m => m.ReactiveForms)
  }
];
```

---

## How It Works

1. App starts
2. Only root component loads
3. User navigates to route
4. Angular downloads that feature chunk
5. Component is rendered

---

## Old vs New Approach

### Old (NgModule)

```ts
loadChildren: () => import('./module').then(m => m.Module)
```

### New (Standalone)

```ts
loadComponent: () => import('./component').then(m => m.Component)
```

---

## provideRouter() Role

```ts
providers: [provideRouter(routes)]
```

* Enables routing system
* Registers router services
* Required for lazy loading to work

---

## Key Interview Points

* Lazy loading improves performance
* Uses dynamic imports
* Splits app into chunks
* Only loads required code
* Modern Angular uses `loadComponent`

---

## Real-World Analogy

Netflix:

* Without lazy loading → all movies load at start ❌
* With lazy loading → only selected movie loads ✅

---

## One-Line Definition

Lazy loading is a technique where Angular loads feature modules or components only when they are required, improving performance and reducing initial load time.
