import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private router = inject(Router);

  protected goToUsers(){
    this.router.navigate(['/routing-demo/navigation/users'])
  }

  protected goToAbout(): void {

    this.router.navigate([
      '/routing-demo/navigation/about'
    ]);

  }

  protected goUsersByUrl(): void {

    this.router.navigateByUrl(

        '/routing-demo/navigation/users'

    );

}
}
