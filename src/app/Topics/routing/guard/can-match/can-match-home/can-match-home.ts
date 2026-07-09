import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Role } from '../service/role';

@Component({
  selector: 'app-can-match-home',
  imports: [RouterLink],
  templateUrl: './can-match-home.html',
  styleUrl: './can-match-home.scss',
  standalone: true
})
export class CanMatchHome {
  protected role = inject(Role);
}
