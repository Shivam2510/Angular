import { Component, inject } from '@angular/core';
import { user } from './Models/users.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routing-user-list',
  imports: [],
  templateUrl: './routing-user-list.html',
  styleUrl: './routing-user-list.scss',
  standalone: true
})
export class RoutingUserList {

  private router = inject(Router)

  protected users:user[] = [
    {
      id: 1,
      name: 'Shivam'
    },
    {
      id: 2,
      name: 'Rahul'
    },
    {
      id: 3,
      name: 'Amit'
    }
  ];

  protected navigateToUserDetails(id: number){
    this.router.navigate(['/routing-demo/params-id', id])
  }
}
