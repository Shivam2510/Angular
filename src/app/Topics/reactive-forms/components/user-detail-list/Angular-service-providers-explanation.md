# Angular Service Providers Explained

In Angular, a service can be provided in two common ways. The place where you provide the service decides how many instances Angular creates.

## 1. `providedIn: 'root'`

```ts
@Injectable({
  providedIn: 'root'
})
export class UserService {}
```

## What it means

Angular creates **one single service instance** for the whole application.

That same instance is shared across all components.

### Example Structure

```text
App
├── FormComponent
├── UserListComponent
└── ProfileComponent
```

All components use the same service instance:

```text
UserService (single instance)
```

## Data Flow Example

```text
FormComponent → setUserData()
UserListComponent → getUserData()
```

Both components access the same data because the service instance is shared.

## Best Use Cases

* Shared state between components
* API calls
* Authentication
* Global application data

---

## 2. Component-level `providers`

```ts
@Component({
  providers: [UserService]
})
```

## What it means

Angular creates a **new service instance** for that component.

Child components inherit the same instance from the parent.

### Example Structure

```text
ParentComponent
└── ChildComponent
```

Service instance:

```text
ParentComponent → UserService (instance A)
ChildComponent → uses instance A
```

Another parent component:

```text
AnotherParentComponent → UserService (instance B)
```

These are separate instances.

## Data Flow Example

```text
Parent A stores data
Parent B cannot access it
```

Because each parent has its own service instance.

## Best Use Cases

* Component-specific logic
* Local state management
* Reusable isolated widgets

---

## Difference Between Both

### Root Provider

```text
App
├── Component A
└── Component B

Same Service Instance
```

Data is shared.

---

### Component Provider

```text
Parent A → Service Instance A
Parent B → Service Instance B
```

Data is isolated.

---

## Simple Analogy

### Root Provider

One water tank for the whole building.
Everyone uses the same water.

### Component Provider

Each room has its own water tank.
Water is not shared.

---

## Rule of Thumb

If transferring data between components:

Use:

```ts
providedIn: 'root'
```

If service data should remain local to a component:

Use:

```ts
providers: [UserService]
```

## Conclusion

Use `providedIn: 'root'` for shared application state.
Use component `providers` for isolated component-specific state.
