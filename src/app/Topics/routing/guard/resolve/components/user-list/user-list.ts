import { Component, inject } from '@angular/core';
import { User } from '../../service/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  standalone: true
})
export class UserList {
}
