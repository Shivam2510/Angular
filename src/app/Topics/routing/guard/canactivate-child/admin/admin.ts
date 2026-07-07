import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterLink,
    RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  standalone: true
})
export class Admin {}
