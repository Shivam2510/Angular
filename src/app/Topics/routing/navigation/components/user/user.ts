import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  private router = inject(Router);

  protected goHome(): void {

    this.router.navigate([
      '/routing-demo/navigation/home'
    ]);

  }
}
