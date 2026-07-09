import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Role {
  role = signal<"admin" | "user" | "error">("user");

  setAdmin(): void {
    this.role.set("admin");
  }

  setUser(): void{
    this.role.set("user");
  }

  setError(): void {
    this.role.set("error");
  }
}
