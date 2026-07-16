import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home-child',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home-child.html',
  styleUrl: './home-child.scss',
})
export class HomeChild {}
