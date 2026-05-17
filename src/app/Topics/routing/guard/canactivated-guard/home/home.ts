import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private authService = inject(Auth);
  private router = inject(Router);

  protected login(): void {
    this.authService.login();
    this.router.navigate(['routing-demo/can-activate/dashboard']);
  }

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['routing-demo/can-activate/dashboard']);
  }
}
