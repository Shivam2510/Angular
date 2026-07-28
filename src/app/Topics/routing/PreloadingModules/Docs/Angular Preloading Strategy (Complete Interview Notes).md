# Angular Preloading Strategy (Complete Interview Notes)

# What is Preloading Strategy?

A **Preloading Strategy** tells Angular **which lazy-loaded routes should be downloaded in the background after the application has started**.

It improves the user experience by making future navigations faster.

---

# Simple Definition

> **Preloading Strategy is an Angular Router feature that loads lazy-loaded modules in the background after the initial application load.**

---

# Why Do We Need Preloading?

Suppose an application contains:

```text
App

├── Dashboard
├── Products
├── Orders
├── Reports
├── Settings
```

Without Lazy Loading, Angular downloads everything during startup.

```text
Application Starts

↓

Download Dashboard

↓

Download Products

↓

Download Orders

↓

Download Reports

↓

Download Settings

↓

Application Ready
```

This increases the application's initial loading time.

---

# Lazy Loading

With Lazy Loading, Angular downloads modules only when they are first visited.

Example

```text
Application Starts

↓

Download Home

↓

Application Ready

↓

User Opens Products

↓

Download Products

↓

Products Page Opens
```

This makes the initial application load much faster.

---

# Problem with Lazy Loading

The first time a user opens a lazy-loaded route, Angular must download it.

Example

```text
Home

↓

User Clicks Products

↓

Download Products Module

↓

Products Page Opens
```

The first navigation may feel slower.

---

# Solution - Preloading

Angular can download lazy-loaded modules **after** the application has finished loading.

Example

```text
Application Starts

↓

Home Loaded

↓

User Reads Home Page

↓

Angular Downloads

Products

Orders

Reports

Settings

↓

Background Process
```

When the user later visits Products,

```text
Products

↓

Already Downloaded

↓

Instant Navigation
```

---

# Angular Built-in Preloading Strategies

Angular provides two built-in strategies.

---

## 1. NoPreloading (Default)

```text
Application Starts

↓

Only Current Route Downloads
```

Lazy modules are downloaded only when first visited.

---

## 2. PreloadAllModules

```text
Application Starts

↓

Home Loads

↓

Angular Downloads

Products

Orders

Reports

Settings

↓

Background
```

All lazy-loaded modules are downloaded automatically after the application becomes stable.

---

# Visual Comparison

## NoPreloading

```text
Application Starts

↓

Home

↓

User Opens Products

↓

Download Products

↓

Products Opens
```

---

## PreloadAllModules

```text
Application Starts

↓

Home

↓

Background Downloads

Products

Orders

Reports

↓

User Opens Products

↓

Instant Navigation
```

---

# Enabling PreloadAllModules

Modern Angular (Standalone)

```ts
import {
  provideRouter,
  withPreloading,
  PreloadAllModules
} from '@angular/router';
```

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    )
  ]
});
```

Angular automatically begins preloading lazy-loaded routes after the initial application load.

---

# Custom Preloading Strategy

Sometimes preloading every module is unnecessary.

Example

```text
Dashboard      5 MB

Products      10 MB

Reports       80 MB

Admin         50 MB
```

Downloading everything may waste bandwidth.

Instead, Angular allows developers to create a **Custom Preloading Strategy** that decides which lazy-loaded modules should be preloaded.

---

# Real-World Example

E-commerce Application

Preload

```text
Products

Cart

Wishlist
```

Do Not Preload

```text
Admin

Reports

Analytics
```

This provides a better balance between performance and network usage.

---

# Lazy Loading vs Preloading

| Lazy Loading                        | Preloading                                                   |
| ----------------------------------- | ------------------------------------------------------------ |
| Downloads module when first visited | Downloads module in the background after application startup |
| Improves initial load time          | Improves future navigation speed                             |
| First visit may be slower           | First visit is usually faster                                |

---

# Built-in Strategies

| Strategy          | Description                                    |
| ----------------- | ---------------------------------------------- |
| NoPreloading      | No background downloads (default)              |
| PreloadAllModules | Preloads all lazy-loaded modules after startup |

---

# When Should You Use PreloadAllModules?

Use it when:

* Most users visit multiple feature modules.
* Lazy-loaded modules are reasonably small.
* Faster subsequent navigation is more important than minimizing background downloads.

Examples

* CRM Applications
* Employee Portals
* E-commerce Websites
* Admin Dashboards

---

# When Should You Avoid PreloadAllModules?

Avoid it when:

* Lazy-loaded modules are very large.
* Users typically visit only a small portion of the application.
* Mobile bandwidth is a concern.
* Administrative modules are rarely used.

In these cases, consider a **Custom Preloading Strategy**.

---

# Benefits

* Faster navigation after the first page load.
* Better user experience.
* Reduces waiting time when opening lazy-loaded modules.
* Works automatically with lazy-loaded routes.

---

# Best Practices

* Use Lazy Loading for feature modules.
* Enable `PreloadAllModules` only when appropriate.
* Consider a Custom Preloading Strategy for large applications.
* Avoid preloading rarely used modules.

---

# Common Interview Questions

## What is a Preloading Strategy?

A Preloading Strategy tells Angular which lazy-loaded routes should be downloaded in the background after the application starts.

---

## What problem does Preloading solve?

It reduces the delay users experience when visiting a lazy-loaded module for the first time.

---

## What are Angular's built-in preloading strategies?

* `NoPreloading`
* `PreloadAllModules`

---

## What is the difference between Lazy Loading and Preloading?

Lazy Loading downloads a module only when it is first visited.

Preloading downloads lazy-loaded modules in the background after the initial application load.

---

## When should you use PreloadAllModules?

When users are likely to visit most lazy-loaded modules and the modules are not excessively large.

---

## Can Angular preload only selected modules?

Yes.

By implementing a **Custom Preloading Strategy**, developers can decide which lazy-loaded modules should be preloaded.

---

# Common Mistakes

❌ Thinking Preloading replaces Lazy Loading.

It does not.

Preloading works **with** Lazy Loading.

---

❌ Preloading every module in a very large application.

Large rarely used modules should often remain lazy-loaded without preloading.

---

❌ Assuming Preloading happens before the application loads.

Preloading starts **after** the initial application has loaded.

---

# Quick Revision

```text
Application Starts

        │

        ▼

Home Loads

        │

        ▼

Background Downloads

Products

Orders

Reports

        │

        ▼

Future Navigation

↓

Instant
```

---

# One-Line Interview Definition

> **A Preloading Strategy is an Angular Router feature that downloads lazy-loaded modules in the background after the application has loaded, improving the speed of future navigations while preserving the benefits of lazy loading.**
