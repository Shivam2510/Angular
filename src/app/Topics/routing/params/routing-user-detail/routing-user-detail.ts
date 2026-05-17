import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-routing-user-detail',
  imports: [],
  templateUrl: './routing-user-detail.html',
  styleUrl: './routing-user-detail.scss',
  standalone: true
})
export class RoutingUserDetail implements OnInit {

  private route = inject(ActivatedRoute);
  protected userId: string | null = null;

  protected userIDSignals = toSignal(
    this.route.paramMap.pipe(
      map(param => param.get('id'))
    )
  )

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    })
  }
}
