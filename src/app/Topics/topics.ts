import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topics',
  imports: [RouterLink],
  templateUrl: './topics.html',
  styleUrl: './topics.scss',
  standalone: true
})
export class Topics {}
