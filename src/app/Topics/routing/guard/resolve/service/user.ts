import { Injectable } from '@angular/core';
import { user } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class User {
  private user: user[] = [
     {
      id: 1,
      name: 'Shivam',
      email: 'shivam@test.com'
    },

    {
      id: 2,
      name: 'Rahul',
      email: 'rahul@test.com'
    },

    {
      id: 3,
      name: 'Amit',
      email: 'amit@test.com'
    }
  ]

  getUser(id: number): user | undefined {
    return this.user.find(user => user.id === id);
  }
}
