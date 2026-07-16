import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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

  protected goToUsersWithQueryParams(): void {

    this.router.navigate(
      ['/routing-demo/navigation/users'],
      {
        queryParams: {
          page: 1,
          sort: 'name'
        }
      }
    );

  }

  protected goToUsersWithState(): void {

    this.router.navigate(
      ['/routing-demo/navigation/users'],
      {
        state: {
          id: 101,
          name: 'Shivam',
          role: 'Admin'
        }
      }
    );

  }

  protected goToUsersReplaceUrl(): void {

    this.router.navigate(
      ['/routing-demo/navigation/users'],
      {
        replaceUrl: true
      }
    );

  }

  protected goToUsersSkipLocation(): void {

    this.router.navigate(
      ['/routing-demo/navigation/users'],
      {
        skipLocationChange: true
      }
    );

  }

  protected goToUsersRelative(): void {

    this.router.navigate(
      ['../users'],
      {
        relativeTo: this.route
      }
    );

  }
}
