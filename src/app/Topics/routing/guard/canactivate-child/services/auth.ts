import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLoggedIn = signal(true);

  login():void {
    this.isLoggedIn.set(true);
  }

  logout():void {
    this.isLoggedIn.set(false);
  }
}
